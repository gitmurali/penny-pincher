import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Header from "../components/Header";
import Head from "next/head";
import Auth from "../components/Auth";
import "../styles/video.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <Head>
        <title>Penny pincher</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Auth>
        <Header />
        <Component {...pageProps} />
      </Auth>
    </SessionProvider>
  );
}

export default MyApp;
