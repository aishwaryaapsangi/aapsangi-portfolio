import "./Loader.css";
import React, { useEffect } from "react";

export default function Loader({ onComplete }) {
    useEffect(() => {
        const timer = setTimeout(() => {onComplete();}, 3000);
        return () => clearTimeout(timer);
    }, [onComplete]);

  return (
  <div className="dino-loader">
    <div className="dino-scene">
      <div className="dino-runner"></div>
      <div className="dino-obstacle"></div>
      <div className="dino-ground"></div>
      <div className="loading-text">Loading...</div>
    </div>
  </div>
);
}