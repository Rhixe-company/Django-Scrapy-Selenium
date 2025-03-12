const mobileMenuBtn: HTMLBodyElement = document.getElementById(
    "mobile-menu-btn",
) as HTMLBodyElement;
const mobileMenu: HTMLBodyElement = document.getElementById(
    "mobile-menu",
) as HTMLBodyElement;
const mobileMenuBtnClose: HTMLBodyElement = document.getElementById(
    "mobile-menu-btn-close",
) as HTMLBodyElement;

if (mobileMenuBtn) {
    const openMenu = (): void => {
        mobileMenu.classList.remove("hidden");
        mobileMenu.setAttribute("data-state", "open");
    };
    mobileMenuBtn.addEventListener("click", openMenu);
    if (mobileMenuBtnClose) {
        const closeMenu = (): void => {
            mobileMenu.classList.add("hidden");
            mobileMenu.setAttribute("data-state", "closed");
        };
        mobileMenuBtnClose.addEventListener("click", closeMenu);
    }
}
