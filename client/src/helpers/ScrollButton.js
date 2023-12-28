import React, { useState } from "react";

function ScrollButton() {
  const [isShown, setIsShown] = useState(false);

  const toggleVisible = () => {
    const pixelScrolled = document.documentElement.scrollTop;
    if (pixelScrolled > 400) {
      setIsShown(true);
    } else if (pixelScrolled <= 400) {
      setIsShown(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div
      className="scroll-button"
      onClick={scrollToTop}
      style={{ display: isShown ? "inline" : "none" }}
    ></div>
  );
};

export default ScrollButton;
