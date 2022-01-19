import "../styles/globals.css";
import type { AppProps } from 'next/app'
import { FC } from 'react'
import { LiffProvider,useLiff } from '../hooks/useliff'

const Layout: FC = ({ children }) => {
  const { initialized, loggedIn, login } = useLiff();

  if (!initialized) {
    return <p>loading...</p>;
  }

  if (!loggedIn) {
    return <button onClick={login}>log in</button>;
  }

  return <>{children}</>;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LiffProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LiffProvider>
  );
}

export default MyApp;
