import styles from "@/styles/Home.module.css";
import Head from "next/head";

export const getStaticProps = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/comics/");
  const data = await res.json();

  return {
    props: {
      comics: data,
    },
  };
};

export default function Home({ comics }) {
  return (
    <>
      <Head>
        <title>Comics | Home</title>
        <meta name="keywords" content="comics" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Home</h1>
        <div>
          {comics.map((comic) => (
            <div key={comic.slug}>
              <a>
                <h3>{comic.title}</h3>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
