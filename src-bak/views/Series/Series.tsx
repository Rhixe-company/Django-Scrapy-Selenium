import { NextPage } from "next";
import Head from "next/head";
import RightContent from "../../components/series/RightContent";
import LeftContent from "../../components/series/LeftContent";
import { Fragment } from "react";

const Series: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Series</title>
      </Head>

      <div className="min[925px]:p-0 relative max-[882px]:p-4 max-[786px]:p-0 lg:my-0">
        <LeftContent />
        <RightContent />
      </div>
    </Fragment>
  );
};

export default Series;
