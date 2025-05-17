import styles from "@/styles/Bookmarks.module.css";
import Head from "next/head";
export default function Bookmarks() {
  return (
    <>
      <Head>
        <title>Comics | Bookmarks</title>
        <meta name="keywords" content="comics" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Bookmarks</h1>
      </div>
    </>
  );
}
