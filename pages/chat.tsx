import React, { useState } from "react";
import { NewRoll } from "../src/NewRoll";
import { ParsedRoll, Roll, RolledDice } from "../src/roll";
import { Dice } from "../src/Dice";
import styles from "../styles/chat.module.css";

interface State {
  message: string;
  roll: ParsedRoll;
  dice: RolledDice;
}

export default function Chat(): JSX.Element {
  const [state, setState] = useState<State[]>([]);
  function addRoll(roll: State) {
    setState((s) => [roll, ...s]);
  }
  function onCreate(roll: string) {
    const parsed = Roll.parse(roll);
    if (parsed) {
      addRoll({ message: roll, roll: parsed, dice: Roll.roll(parsed) });
    }
  }
  return (
    <>
      <NewRoll onCreate={onCreate} />
      <ul className={styles.chat}>
        {state.map((s, i) => (
          <li
            key={state.length - i}
            className={styles.message}
            title={s.message + " " + JSON.stringify(Roll.bounds(s.roll))}
          >
            <Dice dice={s.dice}>
              <button onClick={() => addRoll({ ...s, dice: Roll.roll(s.roll) })}>Roll again</button>
            </Dice>
          </li>
        ))}
      </ul>
    </>
  );
}
