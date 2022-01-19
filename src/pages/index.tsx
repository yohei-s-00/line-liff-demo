import Head from "next/head";
import Link from 'next/link'
import { useEffect, useState } from "react";
import { useLiff } from "../hooks/useliff";

export default function Home() {
  const [value,setValue] = useState('');
  const { loggedIn, userId, scanCode} = useLiff();
  const handleClick = () => {
    scanCode
    .then((result) => {
      setValue(result.value);
    })
    .catch((err) => {
        console.log(err);
    });
  }

  return (
    <div>
      <Head>
        <title>Nextjs with LIFF</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>index page</h1>
        {loggedIn && <p>{userId}</p>}
        <p>
          <button>{loggedIn ? "Log out" : "Log in"}</button>
        </p>
        <p>
          <Link href="/sub">sub page</Link>
        </p>
        <p>
          <button onClick={handleClick}>二次元コードリーダーを表示する</button>
        </p>
        <p>
          {value}
        </p>
      </main>
    </div>
  );
}
