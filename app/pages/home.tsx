import React, { Fragment } from "react";
import Head from "next/head";
import { ComicList } from "@/components/comics/ComicList";
import "@/styles/Home.module.css";
// import styles from "@/styles/Home.module.css";
import Link from "next/link";
export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Items | Home</title>
        <meta name="keywords" content="items" />
      </Head>
      <div className="w-full max-w-full rounded-lg border border-gray-200 bg-[var(--foreground)] p-2 shadow-sm sm:p-4 dark:border-gray-700 dark:bg-[var(--background)]">
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-xl leading-none font-bold text-gray-900 dark:text-white">
            Latest Comics
          </h5>
          <Link
            href="#"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            View all
          </Link>
        </div>
        <ComicList />
      </div>
    </Fragment>
  );
}
