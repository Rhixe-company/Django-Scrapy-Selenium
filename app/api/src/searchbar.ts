const mainMenu: HTMLBodyElement = document.getElementById(
    "main-menu",
) as HTMLBodyElement;
const mobileSearchBtn: HTMLBodyElement = document.getElementById(
    "mobile-search-btn",
) as HTMLBodyElement;
const mobileSearchMenu: HTMLBodyElement = document.getElementById(
    "mobile-search-menu",
) as HTMLBodyElement;
const mobileSearchBtnClose: HTMLBodyElement = document.getElementById(
    "mobile-search-btn-close",
) as HTMLBodyElement;

if (mainMenu) {
    if (mobileSearchBtn) {
        const openSearch = (): void => {
            mainMenu.classList.add("hidden");
            mobileSearchMenu.classList.remove("hidden");
            mobileSearchMenu.classList.add("flex");
        };

        mobileSearchBtn.addEventListener("click", openSearch);
        if (mobileSearchBtnClose) {
            const closeSearch = (): void => {
                mainMenu.classList.remove("hidden");
                mobileSearchMenu.classList.remove("flex");
                mobileSearchMenu.classList.add("hidden");
            };
            mobileSearchBtnClose.addEventListener("click", closeSearch);
        }
    }
}
