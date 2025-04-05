import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:title" content="Rhixe Scans" />
          <meta property="og:description" content="Read Comics" />
          <meta property="og:site_name" content="Rhixe Scans" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Rhixe Scans" />
          <meta name="twitter:description" content="Read Comics" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
