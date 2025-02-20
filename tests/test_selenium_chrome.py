from shutil import which

from selenium import webdriver
from selenium.common import ElementNotInteractableException
from selenium.common import NoSuchElementException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.support.wait import WebDriverWait


def main():
    driver = startcon()

    title = driver.title

    driver.implicitly_wait(1)

    errors = [NoSuchElementException, ElementNotInteractableException]
    wait = WebDriverWait(
        driver,
        timeout=2,
        poll_frequency=0.2,
        ignored_exceptions=errors,
    )
    wait.until(
        ec.presence_of_element_located(
            (
                By.XPATH,
                "//div[contains(@class, 'w-full mx-auto center')]/img[contains(@class, 'object-cover mx-auto')]",  # noqa: E501
            ),
        ),
    )
    images = []
    imgs = driver.find_elements(
        By.XPATH,
        "//div[contains(@class, 'w-full mx-auto center')]/img[contains(@class, 'object-cover mx-auto')]",  # noqa: E501
    )
    for im in imgs:
        images.append(im.get_attribute("src"))  # noqa: PERF401
    chapter = {
        "image_urls": images,
        "name": title,
    }

    print(chapter)  # noqa: T201

    closecon(driver)


def get_default_chrome_options(arguments, binary):
    options = Options()
    for argument in arguments:
        options.add_argument(argument)
    options.binary_location = binary  # type: ignore  # noqa: PGH003
    return options


def get_default_chrome_service(executable):

    return webdriver.ChromeService(
        executable_path=executable,
        log_output="logs.txt",
        service_args=["--log", "info"],
        prefs={
            "dom.ipc.processCount": 8,
            "javascript.options.showInConsole": False,
        },
    )  # type: ignore  # noqa: PGH003


def startcon():
    EXECUTABLE_PATH = which("chromedriver")  # noqa: N806
    service = get_default_chrome_service(executable=EXECUTABLE_PATH)  # type: ignore  # noqa: PGH003
    ARGUMENTS = [  # noqa: N806
        "--headless",
        "--no-sandbox",
        "--disable-gpu",
        "--enable-javascript",
        "--disable-extensions",
    ]
    EXECUTABLE_PATH = which("chrome")  # noqa: N806
    options = get_default_chrome_options(
        arguments=ARGUMENTS,
        binary=EXECUTABLE_PATH,
    )
    driver = webdriver.Chrome(service=service, options=options)
    driver.get("https://asuracomic.net/series/nano-machine-923317b4/chapter/239")
    return driver


def closecon(driver):
    driver.quit()


if __name__ == "__main__":
    main()
