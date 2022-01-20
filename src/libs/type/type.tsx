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

export type Profile = {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
};
export type URIActionWithLabel = URIAction & {
  label: string;
};
export type CTemplateButtons = Omit<TemplateButtons, "actions"> & {
  actions: URIActionWithLabel[];
};
export type CFlexBubble = Omit<FlexBubble, "action"> & {
  action?: URIActionWithLabel;
};
export type CTemplateConfirm = Omit<TemplateConfirm, "actions"> & {
  actions: URIActionWithLabel[];
};
export type CFlexCarousel = Omit<FlexCarousel, "contents"> & {
  contents: CFlexBubble[];
};
export type CTemplateColumn = Omit<TemplateColumn, "defaultAction" | "actions"> & {
  defaultAction?: URIActionWithLabel;
  actions: URIActionWithLabel[];
};
export type CTemplateImageColumn = Omit<TemplateImageColumn, "action"> & {
  action: URIActionWithLabel;
};
export type CTemplateCarousel = Omit<TemplateCarousel, "columns"> & {
  columns: CTemplateColumn[];
};
export type CTemplateImageCarousel = Omit<TemplateImageCarousel, "columns"> & {
  columns: CTemplateImageColumn[];
};
export type CTemplateContent =
  | CTemplateButtons
  | CTemplateConfirm
  | CTemplateCarousel
  | CTemplateImageCarousel;
export type CTemplateMessage = Omit<TemplateMessage, "template"> & {
  template: CTemplateContent;
};
export type CFlexContainer = CFlexBubble | CFlexCarousel;
export type CFlexMessage = Omit<FlexMessage, "contents"> & {
  contents: CFlexContainer;
};
export type LiffMessage =
  | TextMessage
  | ImageMessage
  | VideoMessage
  | AudioMessage
  | LocationMessage
  | StickerMessage
  | CTemplateMessage
  | CFlexMessage;
export type ScanCodeResult = {
  value: string | null;
};