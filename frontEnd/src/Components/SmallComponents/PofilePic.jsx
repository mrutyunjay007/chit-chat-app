import React, { useState } from "react";
import { VscAccount } from "react-icons/vsc";

function PofilePic({ w, h, url }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      {url.length === 0 ? (
        <VscAccount className={`dark:text-color  w-${w} h-${h}`} />
      ) : (
        <div className={`rounded-full w-${w} h-${h}`}>
          <div
            className={`w-full h-full  aspect-square ${
              !imageLoaded && "bg-slate-200 animate-pulse"
            } rounded-full`}
          >
            <img
              className={`w-full h-full object-cover overflow-hidden rounded-full`}
              loading="lazy"
              src={url}
              alt=""
              //checking image loading completion
              onLoad={() => {
                setImageLoaded(true);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default PofilePic;
