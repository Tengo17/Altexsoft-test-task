import { useEffect, useState } from "react";

export const useKeyPress = () => {
  const [keysPressed, setKeysPressed] = useState()

  function onKeyPressed({ key }) {
    setKeysPressed("Key" + key.toUpperCase());
  }

  function onKeyUp({ key }) {
    setKeysPressed("NONE");
  }

  useEffect(() => {
    window.addEventListener("keydown", onKeyPressed);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyPressed);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return {
    keysPressed
  };
};