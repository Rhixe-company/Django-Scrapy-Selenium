from shutil import which

from selenium import webdriver
from selenium.common import ElementNotInteractableException
from selenium.common import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.firefox_profile import FirefoxProfile
from selenium.webdriver.firefox.options import Options
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


def get_default_firefox_options():
    options = Options()
    firefox_profile = FirefoxProfile()
    firefox_profile.set_preference("javascript.enabled", True)  # noqa: FBT003
    options.profile = firefox_profile
    options.add_argument("-headless")
    options.add_argument(
        "--no-sandbox",  # type: ignore  # noqa: PGH003
    )
    options.add_argument(
        "--disable-gpu",
    )
    options.binary_location = which("firefox")  # type: ignore  # noqa: PGH003
    return options


def get_default_firefox_service():

    return webdriver.FirefoxService(executable_path=which("geckodriver"), service_args=["--log", "info"])  # type: ignore  # noqa: PGH003


def startcon():
    service = get_default_firefox_service()  # type: ignore  # noqa: PGH003
    options = get_default_firefox_options()
    driver = webdriver.Firefox(service=service, options=options)
    driver.get("https://asuracomic.net/series/nano-machine-923317b4/chapter/239")
    return driver


def closecon(driver):
    driver.quit()


if __name__ == "__main__":
    main()
