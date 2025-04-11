const accordianTriggerWeekly = document.getElementById(
  "accordian-trigger-weekly",
) as HTMLBodyElement;
const accordianContentWeekly = document.getElementById(
  "accordian-content-weekly",
) as HTMLBodyElement;
const accordianTriggerMonthly = document.getElementById(
  "accordian-trigger-monthly",
) as HTMLBodyElement;
const accordianContentMonthly = document.getElementById(
  "accordian-content-monthly",
) as HTMLBodyElement;
const accordianTriggerAll = document.getElementById(
  "accordian-trigger-all",
) as HTMLBodyElement;
const accordianContentAll = document.getElementById(
  "accordian-content-all",
) as HTMLBodyElement;

if (accordianTriggerWeekly) {
  const openAccordian = (): void => {
    const state = accordianContentWeekly.getAttribute("data-state");
    // Check if the attribute is present
    if (state != "active") {
      accordianTriggerWeekly.setAttribute("data-state", "active");
      accordianContentWeekly.setAttribute("data-state", "active");
      accordianContentWeekly.removeAttribute("hidden");
      accordianTriggerAll.setAttribute("data-state", "inactive");
      accordianContentAll.setAttribute("data-state", "inactive");
      accordianContentAll.setAttribute("hidden", "");
      accordianTriggerMonthly.setAttribute("data-state", "inactive");
      accordianContentMonthly.setAttribute("data-state", "inactive");
      accordianContentMonthly.setAttribute("hidden", "");
      console.log("Weekly Data-state is now present");
      console.log(accordianContentWeekly.getAttribute("data-state"));
    }
  };
  accordianTriggerWeekly.addEventListener("click", openAccordian);
}

if (accordianTriggerMonthly) {
  const openAccordian = (): void => {
    const state = accordianContentMonthly.getAttribute("data-state");
    // Check if the attribute is present
    if (state != "active") {
      accordianTriggerMonthly.setAttribute("data-state", "active");
      accordianContentMonthly.setAttribute("data-state", "active");
      accordianContentMonthly.removeAttribute("hidden");
      accordianTriggerAll.setAttribute("data-state", "inactive");
      accordianContentAll.setAttribute("data-state", "inactive");
      accordianContentAll.setAttribute("hidden", "");
      accordianTriggerWeekly.setAttribute("data-state", "inactive");
      accordianContentWeekly.setAttribute("data-state", "inactive");
      accordianContentWeekly.setAttribute("hidden", "");

      console.log("Monthly Data-state is now present");
      console.log(accordianContentMonthly.getAttribute("data-state"));
    }
  };
  accordianTriggerMonthly.addEventListener("click", openAccordian);
}
if (accordianTriggerAll) {
  const openAccordian = (): void => {
    const state = accordianContentAll.getAttribute("data-state");
    // Check if the attribute is present
    if (state != "active") {
      accordianTriggerAll.setAttribute("data-state", "active");
      accordianContentAll.setAttribute("data-state", "active");
      accordianContentAll.removeAttribute("hidden");
      accordianTriggerMonthly.setAttribute("data-state", "inactive");
      accordianContentMonthly.setAttribute("data-state", "inactive");
      accordianContentMonthly.setAttribute("hidden", "");
      accordianTriggerWeekly.setAttribute("data-state", "inactive");
      accordianContentWeekly.setAttribute("data-state", "inactive");
      accordianContentWeekly.setAttribute("hidden", "");
      console.log("All Data-state is now present");
      console.log(accordianContentAll.getAttribute("data-state"));
    }
  };
  accordianTriggerAll.addEventListener("click", openAccordian);
}
