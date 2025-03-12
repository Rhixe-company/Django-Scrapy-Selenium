const accordianTriggerWeekly: HTMLBodyElement = document.getElementById(
    "accordian-trigger-weekly",
) as HTMLBodyElement;
const accordianTriggerMonthly: HTMLBodyElement = document.getElementById(
    "accordian-trigger-monthly",
) as HTMLBodyElement;
const accordianTriggerAll: HTMLBodyElement = document.getElementById(
    "accordian-trigger-all",
) as HTMLBodyElement;
const accordianContentWeekly: HTMLBodyElement = document.getElementById(
    "accordian-content-weekly",
) as HTMLBodyElement;
const accordianContentMonthly: HTMLBodyElement = document.getElementById(
    "accordian-content-monthly",
) as HTMLBodyElement;
const accordianContentAll: HTMLBodyElement = document.getElementById(
    "accordian-content-all",
) as HTMLBodyElement;

if (accordianContentWeekly) {
    const WeeklyAccordian = (): void => {
        accordianTriggerMonthly.setAttribute("data-state", "inactive");
        accordianTriggerMonthly.setAttribute("aria-selected", "false");
        accordianTriggerAll.setAttribute("data-state", "inactive");
        accordianTriggerAll.setAttribute("aria-selected", "false");
        accordianContentMonthly.setAttribute("data-state", "inactive");
        accordianContentMonthly.setAttribute("hidden", "");
        accordianContentAll.setAttribute("data-state", "inactive");
        accordianContentAll.setAttribute("hidden", "");
        accordianTriggerWeekly.setAttribute("data-state", "active");
        accordianTriggerWeekly.setAttribute("aria-selected", "true");
        accordianContentWeekly.setAttribute("data-state", "active");
        accordianContentWeekly.removeAttribute("hidden");
    };
    accordianTriggerWeekly.addEventListener("click", WeeklyAccordian);
}
if (accordianContentMonthly) {
    const MonthlyAccordian = (): void => {
        accordianTriggerWeekly.setAttribute("data-state", "inactive");
        accordianTriggerWeekly.setAttribute("aria-selected", "false");
        accordianTriggerAll.setAttribute("data-state", "inactive");
        accordianTriggerAll.setAttribute("aria-selected", "false");
        accordianContentWeekly.setAttribute("data-state", "inactive");
        accordianContentWeekly.setAttribute("hidden", "");
        accordianContentAll.setAttribute("data-state", "inactive");
        accordianContentAll.setAttribute("hidden", "");
        accordianTriggerMonthly.setAttribute("data-state", "active");
        accordianTriggerMonthly.setAttribute("aria-selected", "true");
        accordianContentMonthly.setAttribute("data-state", "active");
        accordianContentMonthly.removeAttribute("hidden");
    };
    accordianTriggerMonthly.addEventListener("click", MonthlyAccordian);
}
if (accordianContentAll) {
    const AllAccordian = (): void => {
        accordianTriggerMonthly.setAttribute("data-state", "inactive");
        accordianTriggerMonthly.setAttribute("aria-selected", "false");
        accordianTriggerWeekly.setAttribute("data-state", "inactive");
        accordianTriggerWeekly.setAttribute("aria-selected", "false");
        accordianContentMonthly.setAttribute("data-state", "inactive");
        accordianContentMonthly.setAttribute("hidden", "");
        accordianContentWeekly.setAttribute("data-state", "inactive");
        accordianContentWeekly.setAttribute("hidden", "");
        accordianTriggerAll.setAttribute("data-state", "active");
        accordianTriggerAll.setAttribute("aria-selected", "true");
        accordianContentAll.setAttribute("data-state", "active");
        accordianContentAll.removeAttribute("hidden");
    };
    accordianTriggerAll.addEventListener("click", AllAccordian);
}
