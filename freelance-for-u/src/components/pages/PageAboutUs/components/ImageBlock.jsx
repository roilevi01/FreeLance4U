import React from "react";

const ImageBlock = ({ src, alt }) => {
  return (
    <div className="image-block">
      <img src={src} alt={alt} className="image" />
    </div>
  );
};

export default ImageBlock;
