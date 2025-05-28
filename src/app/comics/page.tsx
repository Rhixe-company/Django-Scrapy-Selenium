export const revalidate = 0;

export default async function Page() {
  const response = await fetch("http://localhost:3000/api/comics", {
    cache: "no-cache",
  });
  const comics = await response.json();

  if (comics) {
    return (
      <>
        <div className="lg:my-0 relative max-[786px]:p-0 max-[882px]:p-4 min[925px]:p-0 ">
          <div className="w-[100%] float-left min-[882px]:w-[68.5%] min-[1030px]:w-[70%] max-[600px]:w-[100%] relative z-0">
            <div className="w-full min-[768px]:w-[100%] bg-[#222222] min-[880px]:w-[98%] min-[912px]:w-[98%] lg:w-[100%] mb-2">
              <div className="relative flex justify-between align-baseline font-500 bg-[#222222] border-b-[1px] border-[#312f40] px-[15px] py-[8px] p-2 mt-5 sm:mt-0">
                <h3 className="text-[15px] text-white font-semibold leading-5 m-0">
                  Comics list
                </h3>
              </div>
              <div>
                <pre>{JSON.stringify(comics, null, 2)}</pre>
              </div>
            </div>
          </div>
          <div className="w-[100%] min-[882px]:w-[30%] max-[600px]:w-[100%] float-right">
            <div className="lg:ml-[15px] min-[855px]:mr-3 lg:mr-0 bg-[#222] rounded-[3px] mb-[18px]">
              <div className="relative flex justify-between align-baseline font-500 bg-[#222222] border-b-[1px] border-[#312f40] px-[15px] py-[8px]">
                <h3 className="text-[15px] text-white font-semibold leading-5 m-0">
                  Comic Functions
                </h3>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
