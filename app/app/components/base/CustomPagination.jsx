import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
const CustomPagination = ({
  numpages,
  links,
  count,
  setpagenumber,
  pagenumber,
}) => {
  function range(start, end) {
    if (start === end) return [start];
    return [start, ...range(start + 1, end)];
  }
  const numbers = range(1, numpages);

  const nextstr = links.next?.split("=").pop();
  const previousstr = links.previous?.split("=").pop();

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        {previousstr && (
          <button
            onClick={() => {
              setpagenumber(Number(previousstr));
            }}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
        )}

        {nextstr && (
          <button
            onClick={() => {
              setpagenumber(Number(nextstr));
            }}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        )}
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{pagenumber}</span> to
            <span className="font-medium"> {numpages}</span> of
            <span className="font-medium"> {count}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-xs"
          >
            {previousstr && (
              <button
                onClick={() => {
                  setpagenumber(Number(previousstr));
                }}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon aria-hidden="true" className="size-5" />
              </button>
            )}

            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {numbers.map((num, index) => (
              <button
                key={index}
                onClick={() => {
                  setpagenumber(Number(num));
                }}
                aria-current={num === pagenumber && "page"}
                className={
                  num === pagenumber
                    ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                }
              >
                {num}
              </button>
            ))}
            {nextstr && (
              <button
                onClick={() => {
                  setpagenumber(Number(nextstr));
                }}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon aria-hidden="true" className="size-5" />
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CustomPagination;
