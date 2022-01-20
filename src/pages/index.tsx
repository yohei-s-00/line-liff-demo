import Head from "next/head";
import Link from 'next/link'
import { useEffect, useState } from "react";
import { useLiff } from "../hooks/useLiff";


const Home = () => {
  const [value,setValue] = useState('');
  const { loggedIn, userId, } = useLiff();
  

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
          <button>二次元コードリーダーを表示する</button>
        </p>
      </main>
    </div>
  );
}
export default Home;