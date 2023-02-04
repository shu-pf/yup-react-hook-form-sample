import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>React Hook Form Yup Sample</title>
        <meta name="description" content="React Hook Form Yup Sample" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <a href="text-input">text input</a>
        </div>
        <div>
          <a href="number-input">number input</a>
        </div>
        <div>
          <a href="select">select</a>
        </div>
        <div>
          <a href="form">form</a>
        </div>
      </main>
    </>
  );
}
