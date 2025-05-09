"""This module contains the ``SeleniumMiddleware`` scrapy middleware"""

from importlib import import_module

from scrapy import signals
from scrapy.exceptions import NotConfigured

# from scrapy.http.response.html import HtmlResponse  # noqa: ERA001
from scrapy_headless.http import SeleniumRequest
from scrapy_headless.http import SeleniumResponse
from selenium.webdriver.support.ui import WebDriverWait


class SeleniumMiddleware:
    """Scrapy middleware handling the requests using selenium"""

    def __init__(  # noqa: C901
        self,
        driver_name,
        driver_executable_path,
        driver_arguments,
        browser_executable_path,
    ):
        """Initialize the selenium webdriver

        Parameters
        ----------
        driver_name: str
            The selenium ``WebDriver`` to use
        driver_executable_path: str
            The path of the executable binary of the driver
        driver_arguments: list
            A list of arguments to initialize the driver
        browser_executable_path: str
            The path of the executable binary of the browser
        """

        webdriver_base_path = f"selenium.webdriver.{driver_name}"
        self.driver_name = driver_name
        driver_klass_module = import_module(f"{webdriver_base_path}.webdriver")
        driver_klass = getattr(driver_klass_module, "WebDriver")  # noqa: B009

        # driver_options_module = import_module(f"{webdriver_base_path}.options")  # noqa: E501, ERA001
        # driver_options_klass = getattr(driver_options_module, "Options")  # noqa: B009, E501, ERA001, RUF100

        # driver_options = driver_options_klass()  # noqa: ERA001

        if driver_name and driver_name.lower() == "brave":
            from selenium.webdriver.chrome.options import Options as BraveOptions
            from selenium.webdriver.chrome.service import Service as BraveService
            from webdriver_manager.chrome import (  # type: ignore  # noqa: PGH003
                ChromeDriverManager,  # type: ignore  # noqa: PGH003
            )
            from webdriver_manager.core.os_manager import (  # type: ignore  # noqa: PGH003
                ChromeType,  # type: ignore  # noqa: PGH003
            )

            driver_options = BraveOptions()
            if browser_executable_path:
                driver_options.binary_location = browser_executable_path
            if "--block-ads" in driver_arguments:
                self._block_ads = True
                driver_arguments.remove("--block-ads")
            for argument in driver_arguments:
                driver_options.add_argument(argument)
            driver_service = BraveService(
                ChromeDriverManager(chrome_type=ChromeType.BRAVE).install(),
                log_output="logs.txt",
                service_args=["--log", "info"],
                # prefs={  # noqa: ERA001, RUF100
                #     "dom.ipc.processCount": 8,
                #     "javascript.options.showInConsole": True,
                # },
            )
        if driver_name and driver_name.lower() == "chrome":
            from selenium.webdriver.chrome.options import Options as ChromeOptions
            from selenium.webdriver.chrome.service import Service as ChromeService
            from webdriver_manager.chrome import (  # type: ignore  # noqa: PGH003
                ChromeDriverManager,  # type: ignore  # noqa: PGH003
            )

            driver_options = ChromeOptions()
            if browser_executable_path:
                driver_options.binary_location = browser_executable_path
            if "--block-ads" in driver_arguments:
                self._block_ads = True
                driver_arguments.remove("--block-ads")
            for argument in driver_arguments:
                driver_options.add_argument(argument)
            driver_service = ChromeService(
                ChromeDriverManager().install(),
                log_output="logs.txt",
                service_args=["--log", "info"],
                # prefs={  # noqa: ERA001, RUF100
                #     "dom.ipc.processCount": 8,
                #     "javascript.options.showInConsole": True,
                # },
            )
        if driver_name and driver_name.lower() == "firefox":
            from selenium.webdriver.firefox.options import Options as FirefoxOptions
            from selenium.webdriver.firefox.service import Service as FirefoxService
            from webdriver_manager.firefox import (  # type: ignore  # noqa: PGH003
                GeckoDriverManager,  # type: ignore  # noqa: PGH003
            )

            driver_options = FirefoxOptions()
            # if browser_executable_path:
            #     driver_options.binary_location = browser_executable_path
            if "--block-ads" in driver_arguments:
                self._block_ads = True
                driver_arguments.remove("--block-ads")
            for argument in driver_arguments:
                driver_options.add_argument(argument)
            driver_service = FirefoxService(
                GeckoDriverManager().install(),
                log_output="logs.txt",
                service_args=["--log", "info"],
                # prefs={  # noqa: ERA001, RUF100
                #     "dom.ipc.processCount": 8,
                #     "javascript.options.showInConsole": True,
                # },
            )

        driver_kwargs = {
            "service": driver_service,
            "options": driver_options,
        }

        self.driver = driver_klass(**driver_kwargs)

    @classmethod
    def from_crawler(cls, crawler):
        """Initialize the middleware with the crawler settings"""

        driver_name = crawler.settings.get("SELENIUM_DRIVER_NAME")
        driver_executable_path = crawler.settings.get("SELENIUM_DRIVER_EXECUTABLE_PATH")
        browser_executable_path = crawler.settings.get(
            "SELENIUM_BROWSER_EXECUTABLE_PATH",
        )
        driver_arguments = crawler.settings.get("SELENIUM_DRIVER_ARGUMENTS")

        if not driver_name or not driver_executable_path:
            msg = "SELENIUM_DRIVER_NAME and SELENIUM_DRIVER_EXECUTABLE_PATH must be set"
            raise NotConfigured(
                msg,
            )

        middleware = cls(
            driver_name=driver_name,
            driver_executable_path=driver_executable_path,
            driver_arguments=driver_arguments,
            browser_executable_path=browser_executable_path,
        )

        crawler.signals.connect(middleware.spider_closed, signals.spider_closed)

        return middleware

    def process_request(self, request, spider):
        """Process a request using the selenium driver if applicable"""

        if not isinstance(request, SeleniumRequest):
            return None

        self.driver.get(request.url)

        for cookie_name, cookie_value in request.cookies.items():  # type: ignore  # noqa: PGH003
            self.driver.add_cookie({"name": cookie_name, "value": cookie_value})

        if request.wait_until:
            WebDriverWait(self.driver, request.wait_time).until(  # type: ignore  # noqa: PGH003
                request.wait_until,
            )

        if request.screenshot:
            request.meta["screenshot"] = self.driver.get_screenshot_as_png()

        if request.script:
            self.driver.execute_script(request.script)

        body = str.encode(self.driver.page_source)

        # Expose the driver via the "meta" attribute
        request.meta.update({"driver": self.driver})

        return SeleniumResponse(
            self.driver.current_url,
            body=body,
            encoding="utf-8",
            request=request,
        )

    def spider_closed(self):
        """Shutdown the driver when spider is closed"""

        self.driver.quit()
