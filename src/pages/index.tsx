import Head from 'next/head'
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Penny pincher</title>
        <meta name="description" content="Track expenses" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>Hey penny pincher</main>
    </div>
  );
}
