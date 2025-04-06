import { DataTable } from "simple-datatables"

const myTable = document.querySelector("#default-table");
const options = {

    paging: true, // enable or disable pagination
    perPage: 10, // set the number of rows per page
    perPageSelect: [5, 10, 20, 50], // set the number of rows per page options
    firstLast: true, // enable or disable the first and last buttons
    nextPrev: true, // enable or disable the next and previous buttons
    searchable: true, // enable or disable searching
    sensitivity: "base", // set the search sensitivity (base, accent, case, variant)
    searchQuerySeparator: " ", // set the search query separator
    sortable: true, // enable or disable sorting
    locale: "en-US", // set the locale for sorting
    numeric: true, // enable or disable numeric sorting
    caseFirst: "false", // set the case first for sorting (upper, lower)
    ignorePunctuation: true // enable or disable punctuation sorting
}
const dataTable = new DataTable(myTable,options);
