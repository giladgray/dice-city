import React from "react";
import styles from "../styles/roll.module.css";
import { OneRoll } from "./OneRoll";
import { useLocalStorage } from "./useLocalStorage";

const BASIC_ROLLS = ["d4", "d6", "d10", "d20", "d100"];
const PROMPT_MSG = "Enter new Fast Dice rolls, separated by commas.\nEmpty text will reset to default.";
const STORAGE_KEY = "dice-city-fast-dice";

export const FastDice: React.FC = () => {
  const [fastDice, setFastDice] = useLocalStorage(STORAGE_KEY, BASIC_ROLLS);

  function handleEdit() {
    const response = window.prompt(PROMPT_MSG, fastDice.join(", "));
    // cancel => noop
    if (response == null) return;
    // empty input => reset to default
    if (!response.trim()) return setFastDice(BASIC_ROLLS);
    // otherwise, update state
    const newDice = response
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setFastDice(newDice.map((s) => s.trim()).filter(Boolean));
  }

  return (
    <div className={styles.top}>
      <h4>
        Fast
        <br />
        Dice
        <br />
        <br />
        <button onClick={handleEdit}>Edit</button>
      </h4>
      {fastDice.map((r) => (
        <OneRoll key={r} roll={r} />
      ))}
    </div>
  );
};
