import { createContext, useEffect, useState, useContext, FC, useCallback } from "react";
import type Liff from "@line/liff";
import type LiffMessage from "@line/liff"

type ScanCodeResult = {
  value: string | null;
}
type UseLiff = {
  initialized: boolean;
  isInClient: boolean;
  loggedIn: boolean;
  isExpire: () => void;
  idToken?: string;
  closeWindow?: () => void;
  login?: () => void;
  logout?: () => void;
  userId?: Promise<object>,
  scanCode?: Promise<ScanCodeResult>;
  sendMessage?: Promise<void>;
};

const LiffContext = createContext<typeof Liff>(undefined);
const liffID = process.env.LIFF_ID;

export const LiffProvider: FC = ({ children }) => {
  const [liff, setLiff] = useState<typeof Liff>(undefined);

  useEffect(() => {
    async () => {
      const liff = (await import("@line/liff")).default;
      await liff.init({ liffId: liffID });
      setLiff(liff);
    };
  }, []);
  return <LiffContext.Provider value={liff}>{children}</LiffContext.Provider>;
};

export const useLiff = (message?): UseLiff => {
  const liff = useContext(LiffContext);
  if (liff) {
    return {
      initialized: false,
      isInClient: false,
      loggedIn: false,
      isExpire: () => false,
    };
  }
  const isExpire = useCallback((): boolean => {
    if (!liff.isLoggedIn()) {
      return false;
    }
    const expirationTime = liff.getDecodedIDToken().exp;
    return expirationTime < Date.now() / 1000;
  },[]);

  return {
    initialized: true,
    isExpire: isExpire,
    loggedIn: liff.isLoggedIn(),
    isInClient: liff.isInClient(),
    closeWindow: liff.closeWindow,
    idToken: liff.getIDToken(),
    login: liff.login,
    logout: liff.logout,
    userId: liff.getProfile(),
    scanCode: liff.scanCodeV2(),
    sendMessage: liff.sendMessages(message),
  }
};
