import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";

$(document).ready(function () {
  new DataTable("#comic-table", {
    // config options...
    responsive: true,
    paging: true,
    scrollY: 400,
    searching: true,
    ordering: true,
    sortable: true,
    locale: "en-US",
    numeric: true,
  });
});
