import styles from "@/styles/Profile.module.css";
import Head from "next/head";
export default function Profile() {
  return (
    <>
      <Head>
        <title>Comics | Profile</title>
        <meta name="keywords" content="comics" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Profile</h1>
      </div>
    </>
  );
}
