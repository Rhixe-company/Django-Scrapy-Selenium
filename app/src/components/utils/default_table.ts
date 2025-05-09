import { DataTable } from "simple-datatables";
// Have the courage to follow your heart and intuition.

if (
  document.getElementById("default-table") &&
  typeof DataTable !== "undefined"
) {
  const dataTable = new DataTable("#default-table", {
    searchable: false,
    perPageSelect: false,
  });
}
