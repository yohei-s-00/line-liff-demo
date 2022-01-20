import {
  createContext,
  useEffect,
  useState,
  useContext,
  FC,
  useCallback,
} from "react";
import type Liff from "@line/liff";
import type { Profile, ScanCodeResult } from "../libs/type/type";

type UseLiff = {
  initialized: boolean;
  isInClient: boolean;
  loggedIn: boolean;
  isExpire: () => void;
  idToken?: string;
  closeWindow?: () => void;
  login?: () => void;
  logout?: () => void;
  AccessToken?: string;
  userId?: Promise<Profile>;
  scanCode?: Promise<ScanCodeResult>;
  sendMessages?: Promise<void>;
};

export const LiffContext = createContext<typeof Liff>(undefined);

export const LiffProvider: FC = ({ children }) => {
  const [liff, setLiff] = useState<typeof Liff>(undefined);

  useEffect(() => {
    let unmounted = false;
    const func = async () => {
      const liff = (await import("@line/liff")).default;
      await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID });
      if (!unmounted) {
        setLiff(liff);
      }
    };
    func();
    const cleanup = () => {
      unmounted = true;
    };
    return cleanup;
  }, []);
  return <LiffContext.Provider value={liff}>{children}</LiffContext.Provider>;
};

export const useLiff = (): UseLiff => {
  const liff = useContext(LiffContext);
  if (!liff) {
    return {
      initialized: false,
      isInClient: false,
      loggedIn: false,
      isExpire: () => false,
    };
  }
  const isExpire = (): boolean => {
    if (!liff.isLoggedIn()) {
      return false;
    }
    const expirationTime = liff.getDecodedIDToken().exp;
    return expirationTime < Date.now() / 1000;
  };
  return {
    initialized: true,
    isExpire: isExpire,
    loggedIn: liff.isLoggedIn(),
    isInClient: liff.isInClient(),
    closeWindow: liff.closeWindow,
    idToken: liff.getIDToken(),
    login: liff.login,
    logout: liff.logout,
    AccessToken: liff.getAccessToken(),
  };
  // return {
  //   initialized: true,
  //   isExpire: isExpire,
  //   loggedIn: liff.isLoggedIn(),
  //   isInClient: liff.isInClient(),
  //   closeWindow: liff.closeWindow,
  //   idToken: liff.getIDToken(),
  //   login: liff.login,
  //   logout: liff.logout,
  //   AccessToken: liff.getAccessToken(),
  //   userId: liff.getProfile(),
  //   scanCode: liff.scanCodeV2(),
  //   sendMessages: liff.sendMessages(message),
  // };
};
