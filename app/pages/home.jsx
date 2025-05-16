import styles from "@/styles/Home.module.css";
import Head from "next/head";
export default function Home() {
  return (
    <>
      <Head>
        <title>Comics | Home</title>
        <meta name="keywords" content="comics" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Home</h1>
      </div>
    </>
  );
}
