import { useState, useEffect } from "react";

export const useScroll = () => {
  // Set a single object `{ x: ..., y: ..., direction: ... }` once on init
  const [scroll, setScroll] = useState({
    x: document.body.getBoundingClientRect().left,
    y: document.body.getBoundingClientRect().top,
    direction: "",
  });

  const listener = (e) => {
    // `prev` provides us the previous state
    setScroll((prev) => ({
      x: document.body.getBoundingClientRect().left,
      y: -document.body.getBoundingClientRect().top,
      // Here we’re comparing the previous state to the current state to get the scroll direction
      direction:
        prev.y > -document.body.getBoundingClientRect().top ? "up" : "down",
    }));
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    // cleanup function occurs on unmount
    return () => window.removeEventListener("scroll", listener);
    // Run `useEffect` only once on mount, so add `, []` after the closing curly brace }
  }, []);

  return scroll;
};
