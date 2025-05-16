import styles from "@/styles/Comic.module.css";
import Head from "next/head";
export default function Comic() {
  return (
    <>
      <Head>
        <title>Comics | Comic</title>
        <meta name="keywords" content="comics" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Comic</h1>
      </div>
    </>
  );
}
