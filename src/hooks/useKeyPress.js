import { useEffect, useState } from "react";

export const useKeyPress = () => {

  const [keysPressed, setKeysPressed] = useState({
    keyA: false,
    keyD: false,
    keyJ: false,
    keyL: false,
    keyQ: false,
    keyW: false,
    keyE: false,
    keyU: false,
    keyI: false,
    keyO: false,
  });

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'a' || e.key === 'd' || e.key === 'j' || e.key === 'l' || e.key === 'q'
        || e.key === 'w' || e.key === 'e' || e.key === 'u' || e.key === 'i' || e.key === 'o') {
        setKeysPressed(prev => {
          return {
            ...prev,
            [e.code]: true
          }
        });
      }
    })
  }, []);

  useEffect(() => {
    document.addEventListener('keyup', (e) => {
      if (e.key === 'a' || e.key === 'd' || e.key === 'j' || e.key === 'l' || e.key === 'q'
        || e.key === 'w' || e.key === 'e' || e.key === 'u' || e.key === 'i' || e.key === 'o') {
        setKeysPressed(prev => {
          return {
            ...prev,
            [e.code]: false
          }
        });
      }
    })
  }, []);


  return { keysPressed };
};