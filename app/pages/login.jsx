import styles from "@/styles/Login.module.css";
import Head from "next/head";
export default function Login() {
  return (
    <>
      <Head>
        <title>Comics | Login</title>
        <meta name="keywords" content="comics" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Login</h1>
      </div>
    </>
  );
}
