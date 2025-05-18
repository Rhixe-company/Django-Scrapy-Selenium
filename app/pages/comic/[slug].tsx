import React, { Fragment } from "react";
import Head from "next/head";

import "@/styles/Comic.module.css";
// import styles from "@/styles/Comic.module.css";

import { ComicItem } from "@/components/comics/ComicItem";
export default function Comic() {
  return (
    <Fragment>
      <Head>
        <title>Comics | Comic</title>
        <meta name="keywords" content="comics" />
      </Head>
      <div className="w-full max-w-full rounded-lg border border-gray-200 bg-white p-2 shadow-sm sm:p-4 dark:border-gray-700 dark:bg-gray-800">
        <ComicItem />
      </div>
    </Fragment>
  );
}
