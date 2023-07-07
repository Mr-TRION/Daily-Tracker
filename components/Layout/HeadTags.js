import Head from "next/head";

const HeadTags = () => (
  <>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta charSet="UTF-8" />
      <link rel="icon" href="/favicon.png" sizes="16*16" type="image/png" />

      <link rel="stylesheet" type="text/css" href="/listMessages.css" />

      <link rel="stylesheet" href="/styles.css" />
      <link rel="stylesheet" type="text/css" href="/nprogress.css" />

      <link
        href="https://fonts.googleapis.com/css2?family=MuseoModerno:ital,wght@0,600;1,600&family=Pacifico&family=Roboto:wght@300;500&display=swap"
        rel="stylesheet"
      />

      <title>Eubrics Assignment</title>
    </Head>
  </>
);
export default HeadTags;
