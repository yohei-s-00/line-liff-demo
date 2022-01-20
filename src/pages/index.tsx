import Head from "next/head";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { useLiff, LiffContext } from "../hooks/useLiff";
import type Liff from "@line/liff";

const Home = () => {
  const [value, setValue] = useState("");
  const { loggedIn, userId } = useLiff();
  const handleClick = () => {
    const liff = useContext(LiffContext);
    liff
      .scanCodeV2()
      .then((result) => {
        setValue(result.value);
      })
      .catch(console.error);
  };

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
      </main>
    </div>
  );
};
export default Home;
