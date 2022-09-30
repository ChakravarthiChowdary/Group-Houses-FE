import React from "react";
import "./BgImage.css";

export const BgImage = (Component: React.FC) => {
  return (props: any) => (
    <>
      <div className="bgImage__container">
        <div className="bgImage__blackCover">
          <Component {...props} />
        </div>
      </div>
    </>
  );
};
