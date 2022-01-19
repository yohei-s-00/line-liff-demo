import "../styles/globals.css";
import type { AppProps } from 'next/app'
import { FC } from 'react'
import { useAuth, AuthProvider } from "../hooks/useAuth";
import { LiffProvider } from "../hooks/useLiff";


const Layout: FC = ({ children }) => {
  const { initialized, loggedIn, login } = useAuth();

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
    <AuthProvider>
      <LiffProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LiffProvider>
    </AuthProvider>
  );
}

export default MyApp;
