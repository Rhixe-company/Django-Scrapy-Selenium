import Head from "next/head";

import Link from "next/link";
import styles from "@/styles/Index.module.css";
export default function Index() {
  return (
    <>
      <Head>
        <title>Comics | Index</title>
        <meta name="keywords" content="comics" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Index</h1>
        <p className={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisi cing elit. Laudantium
          ut enim eligendi itaque accusantium modi quod magni cupiditate ipsa,
          voluptatum quia aperiam aliquid ea minima id neque! Unde, placeat
          fugiat!
        </p>
        <Link className={styles.btn} href="/home">
          View More
        </Link>
      </div>
    </>
  );
}
