import React, { Fragment } from "react";
import Head from "next/head";
import { Comics } from "@/components/comics/Comics";
import "@/styles/Home.module.css";
// import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Items | Home</title>
        <meta name="keywords" content="items" />
      </Head>

      <Comics />
    </Fragment>
  );
}
