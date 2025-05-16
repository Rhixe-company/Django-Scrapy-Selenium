import styles from "@/styles/About.module.css";
import Head from "next/head";
export default function About() {
  return (
    <>
      <Head>
        <title>Comics | About</title>
        <meta name="keywords" content="comics" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>About</h1>
      </div>
    </>
  );
}
