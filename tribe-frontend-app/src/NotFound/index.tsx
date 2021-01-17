import React from "react";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="NotFound">
      <div className="swing-in-bottom-bck">
        <h1 className="NotFound-title">Uh-oh! This is the 404 wilderness!</h1>
        <p className="NotFound-description">Can't find what you're looking for? Let us know at <span className="NotFound-contact">support@tribeapp.fam</span></p>
      </div>
    </div>
  );
};

export default NotFound;