import { Fragment } from "react";
import RightContent from "@/components/index/RightContent";
import GridUtil from "@/components/index/utils/GridUtil";
import Head from "next/head";

export default function index({ comics }) {
  // console.log(comics);
  return (
    <Fragment>
      <Head>
        <title>Index</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min[925px]:p-0 relative max-[882px]:p-4 max-[786px]:p-0 lg:my-0">
        <div className="float-left w-[100%] max-[600px]:w-[100%] min-[882px]:w-[70%]">
          <div className="flex h-full min-h-72 justify-center">
            <div className="w-[100%] min-[768px]:w-[100%] min-[880px]:w-[95%] min-[912px]:w-[96%] lg:w-[100%]">
              <GridUtil comics={comics} />
            </div>
          </div>
        </div>
        <RightContent />
      </div>
    </Fragment>
  );
}

export const getStaticProps = async () => {
  const comicres = await fetch(`http://localhost:8000/api/comics/?page=1`);
  const comics = await comicres.json();
  return {
    props: {
      comics,
    },
  };
};
