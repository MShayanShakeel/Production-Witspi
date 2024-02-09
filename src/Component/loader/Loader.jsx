import React from "react";
import "./Loader.css";
const SvgLoader = ({ top, left, width, height }) => {
  return ( 
    <div
      id="loader"
      className="svgLoader"
      style={{ top: `${top}%`, left: `${left}%`, width: width, height: height }}>

      </div>
  );
};

export default SvgLoader;