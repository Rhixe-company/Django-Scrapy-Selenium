import styles from "@/styles/Register.module.css";
import Head from "next/head";
export default function Register() {
  return (
    <>
      <Head>
        <title>Comics | Register</title>
        <meta name="keywords" content="comics" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Register</h1>
      </div>
    </>
  );
}
