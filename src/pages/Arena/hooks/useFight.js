import { controls } from "../../../constants/controls";
import { useKeyPress } from "../../../hooks/useKeyPress";
import { useArena } from "./useArena";
import { useEffect, useState } from "react";

const getDamage = (attacker, defender) => {
  let result = getHitPower(attacker) - getBlockPower(defender)

  if(result > 0) {
    return result
  }

  return 0 
};

const getHitPower = (fighter) => {
  return fighter.attack * Math.random() + 1
};

const getBlockPower = (fighter) => {
  return fighter.defense * Math.random() + 1
};

export const useFight = () => {
  const { selectedPair } = useArena();
  const { keysPressed } = useKeyPress();
  const {
    playerOneAttack,
    playerOneBlock,
    playerTwoAttack,
    playerTwoBlock,
    playerOneCriticalHitCombination,
    playerTwoCriticalHitCombination,
  } = controls;

  const { playerOne, playerTwo } = selectedPair

  const [ winner, setWinner ] = useState("")


  useEffect(() => {
    let playerOneInitialHealth = playerOne.health
    let playerTwoInitialHealth = playerTwo.health
  
    playerOne.initialHealth = playerOneInitialHealth
    playerTwo.initialHealth = playerTwoInitialHealth
  }, [playerOne]);

  useEffect(() => {
    switch (keysPressed) {
      case playerOneAttack:
        playerTwo.health -= getDamage(playerOne, playerTwo)
        if(playerTwo.health <= 0) {
          setWinner(playerOne)
        }
        break;
      case playerOneBlock:
        console.log(keysPressed);
        break;
      case playerTwoAttack:
        playerOne.health -= getDamage(playerTwo, playerOne)
        if(playerOne.health <= 0) {
          setWinner(playerTwo)
        }
        break;
      case playerTwoBlock:
        console.log(keysPressed);
        break;
      case playerOneCriticalHitCombination:
        console.log(keysPressed);
        break;
      case playerTwoCriticalHitCombination:
        console.log(keysPressed);
        break;
      default:
        console.log("This key doesn't do anything");
    }
  }, [keysPressed]);

  return {
    fighterOneDetails: playerOne,
    fighterTwoDetails: playerTwo,
    winner: winner,
  };
};