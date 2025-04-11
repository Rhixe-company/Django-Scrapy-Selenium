const mobileSearchBtn = document.getElementById(
  "mobile-search-btn",
) as HTMLBodyElement;
const defaultSearchMenu = document.getElementById(
  "default-search-menu",
) as HTMLBodyElement;
const mobileSearchMenu = document.getElementById(
  "mobile-search-menu",
) as HTMLBodyElement;

const mobileSearchBtnClose = document.getElementById(
  "mobile-search-btn-close",
) as HTMLBodyElement;

if (mobileSearchBtn) {
  const openMenu = (): void => {
    defaultSearchMenu.classList.add("hidden");
    mobileSearchMenu.classList.remove("hidden");
    mobileSearchMenu.classList.add("flex");
  };
  mobileSearchBtn.addEventListener("click", openMenu);
  if (mobileSearchBtnClose) {
    const closeMenu = (): void => {
      defaultSearchMenu.classList.remove("hidden");
      mobileSearchMenu.classList.add("hidden");
      mobileSearchMenu.classList.remove("flex");
    };
    mobileSearchBtnClose.addEventListener("click", closeMenu);
  }
}
