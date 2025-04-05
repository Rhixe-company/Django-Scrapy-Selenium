import { Fragment } from "react";
import type { NextPage } from "next";

import RightContent from "@/components/series/RightContent";
import LeftContent from "@/components/series/LeftContent";
import Head from "next/head";

const series: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Series</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min[925px]:p-0 relative max-[882px]:p-4 max-[786px]:p-0 lg:my-0">
        <LeftContent />
        <RightContent />
      </div>
    </Fragment>
  );
};

export default series;
