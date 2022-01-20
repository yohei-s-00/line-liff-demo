import Head from "next/head";
import Link from "next/link";
import Image from 'next/image'
import { useEffect, useState, useContext } from "react";
import { useLiff, LiffContext } from "../hooks/useLiff";
import type { Profile, ScanCodeResult } from '../libs/type/type'
import noImage from '../../public/no_image.png'

const Home = () => {
  const initialUser = {
    userId: '',
    displayName: '',
    pictureUrl: '',
    statusMessage: '',
  }
  const { loggedIn, closeWindow, isInClient } = useLiff();
  const [value, setValue] = useState<string>(null);
  const [userProfile, setUserProfile] = useState<Profile>(initialUser);
  const liff = useContext(LiffContext);
  const handleClick = () => {
    liff
      .scanCodeV2()
      .then((result) => {
        setValue(result.value);
      })
      .catch(console.error);
  };
  const getUserProfile = async () => {
    const profile = await liff.getProfile();
    setUserProfile(profile);
  };
  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div>
      <Head>
        <title>Nextjs with LIFF</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>index page</h1>
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
          <button onClick={closeWindow}>閉じる</button>
        </p>
        <p>{isInClient && "クライアント"}</p>
        <p>{userProfile.userId}</p>
        <p>{userProfile.displayName}</p>
        <p>{userProfile.statusMessage}</p>
        <Image 
          src={noImage}
          width={100}
          height={100}
          objectFit="contain"
        />
      </main>
    </div>
  );
};
export default Home;
