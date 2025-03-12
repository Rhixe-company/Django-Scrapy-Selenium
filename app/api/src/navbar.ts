const mobileMenuBtn: HTMLElement = document.getElementById(
    "mobile-menu-btn",
) as HTMLElement;
const mobileMenu: HTMLElement = document.getElementById(
    "mobile-menu",
) as HTMLElement;
const mobileMenuBtnClose: HTMLElement = document.getElementById(
    "mobile-menu-btn-close",
) as HTMLElement;

if (mobileMenuBtn) {
    const openMenu = (): void => {
        mobileMenu.classList.remove("hidden");
        mobileMenu.classList.add("block");
    };
    mobileMenuBtn.addEventListener("click", openMenu);
    if (mobileMenuBtnClose) {
        const closeMenu = (): void => {
            mobileMenu.classList.remove("block");
            mobileMenu.classList.add("hidden");
        };
        mobileMenuBtnClose.addEventListener("click", closeMenu);
    }
}
