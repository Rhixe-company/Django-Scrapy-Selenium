const mobileMenuBtn = document.getElementById(
  "mobile-menu-btn",
) as HTMLBodyElement;
const mobileMenu = document.getElementById("mobile-menu") as HTMLBodyElement;
const mobileMenu1 = document.getElementById("mobile-menu1") as HTMLBodyElement;
const mobileMenuBtnClose = document.getElementById(
  "mobile-menu-btn-close",
) as HTMLBodyElement;

if (mobileMenuBtn) {
  const openMenu = (): void => {
    mobileMenu.setAttribute("data-state", "open");
    mobileMenu.classList.remove("hidden");
    mobileMenu1.setAttribute("data-state", "open");
    mobileMenu1.classList.remove("hidden");
    // mobileMenu.classList.add("flex");
  };
  mobileMenuBtn.addEventListener("click", openMenu);
  if (mobileMenuBtnClose) {
    const closeMenu = (): void => {
      mobileMenu.setAttribute("data-state", "closed");
      mobileMenu.classList.add("hidden");
      mobileMenu1.setAttribute("data-state", "closed");
      mobileMenu1.classList.add("hidden");
      // mobileMenu.classList.remove("flex");
      // mobileMenu.classList.add("hidden");
    };
    mobileMenuBtnClose.addEventListener("click", closeMenu);
  }
}
