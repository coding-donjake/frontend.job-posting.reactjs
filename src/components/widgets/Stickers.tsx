import React, { ReactNode } from "react";

interface StickerProps {
  icon?: ReactNode;
  text?: string;
}

export const PrimarySticker = ({ icon, text }: StickerProps) => {
  return (
    <div className="sticker-primary">
      {icon ? <div className="sticker-icon">{icon}</div> : null}
      {text ? <div className="sticker-text">{text}</div> : null}
    </div>
  );
};

export const DangerSticker = ({ icon, text }: StickerProps) => {
  return (
    <div className="sticker-danger">
      {icon ? <div className="sticker-icon">{icon}</div> : null}
      {text ? <div className="sticker-text">{text}</div> : null}
    </div>
  );
};
