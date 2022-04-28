import { useEffect, useState } from "react";
import { controls } from "../../../constants/controls";
import { useKeyPress } from "../../../hooks/useKeyPress";
import { useArena } from "./useArena";

let winner;

const critOrDodgeChance = (min, max) => {
  const random = Math.random();
  const chance = (random * (max - min) + min).toFixed(2);
  return chance;
}

const getDamage = (attacker, defender) => {
  const damage = Number.parseFloat(getHitPower(attacker) - getBlockPower(defender)).toFixed(2);
  if (damage > 0) {
    defender.receivedDamage = damage;
    defender.health -= damage;
    healthCheck(attacker, defender)
    return damage;
  }
  return 0;
};

const getHitPower = (fighter) => {
  const hitPower = Number.parseFloat(fighter.attack * critOrDodgeChance(1, 2)).toFixed(2);
  return hitPower;
};

const getBlockPower = (fighter) => {
  const blockPower = Number.parseFloat(fighter.defense * critOrDodgeChance(1, 2)).toFixed(2);
  return blockPower;
};

const getCritPower = (attacker, defender) => {
  const crit = attacker.attack * 2;
  defender.receivedDamage = crit;
  defender.health -= crit;
  healthCheck(attacker, defender)
}

const healthCheck = (attacker, defender) => {
  if (defender.health < 0) winner = attacker
}

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
  const { playerOne, playerTwo } = selectedPair;


  useEffect(() => {
    playerOne.initialHealth = playerOne.health;
    playerTwo.initialHealth = playerTwo.health;
  }, [selectedPair])

 
  const [playerOneSpecial, setPlayerOneSpecial] = useState(true);
  const [playerTwoSpecial, setPlayerTwoSpecial] = useState(true);

  const playerOneSpecialTimeout = () => {
    setPlayerOneSpecial(true);
  }

  const playerTwoSpecialTimeout = () => {
    setPlayerTwoSpecial(true);
  }

  

  useEffect(() => {
    if (keysPressed[playerOneAttack] && !keysPressed[playerOneBlock] && !keysPressed[playerTwoBlock]) {
      getDamage(playerOne, playerTwo);
    }
    if (keysPressed[playerTwoAttack] && !keysPressed[playerTwoBlock] && !keysPressed[playerOneBlock]) {
      getDamage(playerTwo, playerOne);
    }
    if (keysPressed[playerOneCriticalHitCombination[0]] &&
      keysPressed[playerOneCriticalHitCombination[1]] &&
      keysPressed[playerOneCriticalHitCombination[2]] &&
      playerOneSpecial) {
      setPlayerOneSpecial(false);
      setTimeout(playerOneSpecialTimeout, 10000);
      getCritPower(playerOne, playerTwo);
    }
    if (keysPressed[playerTwoCriticalHitCombination[0]] &&
      keysPressed[playerTwoCriticalHitCombination[1]] &&
      keysPressed[playerTwoCriticalHitCombination[2]] &&
      playerTwoSpecial) {
      setPlayerTwoSpecial(false);
      setTimeout(playerTwoSpecialTimeout, 10000);
      getCritPower(playerTwo, playerOne);
    }
  }, [keysPressed]);

  return {
    fighterOneDetails: playerOne,
    fighterTwoDetails: playerTwo,
    winner: winner
  };
};