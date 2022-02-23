import "../styles/globals.scss";

import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>

        <html lang="en" />

        <title>Arda Fevzi Armutcu</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Arda Fevzi Armutcu's Portfolio" />
        <link rel="preload" as="font" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
