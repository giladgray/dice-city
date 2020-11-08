import React, { useState } from "react";
import styles from "../styles/roll.module.css";
import { OneRoll } from "./OneRoll";

const BASIC_ROLLS = ["d4", "d6", "d10", "d20", "d100"];

export const FastDice: React.FC = () => {
  const [fastDice, setFastDice] = useState(BASIC_ROLLS);
  function handleEdit() {
    const newDice = window.prompt("Enter new Fast Dice, separated by commas:", fastDice.join(", "));
    if (newDice) {
      setFastDice(
        newDice
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      );
    }
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
