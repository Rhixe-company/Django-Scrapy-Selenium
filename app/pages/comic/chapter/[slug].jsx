import styles from "@/styles/Chapter.module.css";
import Head from "next/head";
export default function Chapter() {
  return (
    <>
      <Head>
        <title>Comics | Chapter</title>
        <meta name="keywords" content="comics" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Chapter</h1>
      </div>
    </>
  );
}
