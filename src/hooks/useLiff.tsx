import {
  createContext,
  useEffect,
  useState,
  useContext,
  FC,
  useCallback,
} from "react";
import type Liff from "@line/liff";
import {
  TemplateButtons,
  URIAction,
  TemplateConfirm,
  TemplateColumn,
  TemplateCarousel,
  TemplateImageColumn,
  TemplateImageCarousel,
  TemplateMessage,
  FlexBubble,
  FlexCarousel,
  FlexMessage,
  TextMessage,
  ImageMessage,
  VideoMessage,
  AudioMessage,
  LocationMessage,
  StickerMessage,
} from "@line/bot-sdk/lib/types";

type URIActionWithLabel = URIAction & {
  label: string;
};
type CTemplateButtons = Omit<TemplateButtons, "actions"> & {
  actions: URIActionWithLabel[];
};
type CFlexBubble = Omit<FlexBubble, "action"> & {
  action?: URIActionWithLabel;
};
type CTemplateConfirm = Omit<TemplateConfirm, "actions"> & {
  actions: URIActionWithLabel[];
};
type CFlexCarousel = Omit<FlexCarousel, "contents"> & {
  contents: CFlexBubble[];
};
type CTemplateColumn = Omit<TemplateColumn, "defaultAction" | "actions"> & {
  defaultAction?: URIActionWithLabel;
  actions: URIActionWithLabel[];
};
declare type CTemplateImageColumn = Omit<TemplateImageColumn, "action"> & {
  action: URIActionWithLabel;
};
type CTemplateCarousel = Omit<TemplateCarousel, "columns"> & {
  columns: CTemplateColumn[];
};
declare type CTemplateImageCarousel = Omit<TemplateImageCarousel, "columns"> & {
  columns: CTemplateImageColumn[];
};
type CTemplateContent =
  | CTemplateButtons
  | CTemplateConfirm
  | CTemplateCarousel
  | CTemplateImageCarousel;
type CTemplateMessage = Omit<TemplateMessage, "template"> & {
  template: CTemplateContent;
};
type CFlexContainer = CFlexBubble | CFlexCarousel;
type CFlexMessage = Omit<FlexMessage, "contents"> & {
  contents: CFlexContainer;
};
type LiffMessage =
  | TextMessage
  | ImageMessage
  | VideoMessage
  | AudioMessage
  | LocationMessage
  | StickerMessage
  | CTemplateMessage
  | CFlexMessage;
type ScanCodeResult = {
  value: string | null;
};
type Profile = {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
};
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

const LiffContext = createContext<typeof Liff>(undefined);

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
