import React, { useCallback, useEffect, useReducer, useState } from "react";
import { initialState, reducer } from "../src/reducer";
import { OneRoll } from "../src/OneRoll";
import styles from "../styles/roll.module.css";
import Head from "next/head";

const DELETE_MSG = "Are you sure you want to delete this roll?";
const STORAGE_KEY = "dice-city-state";
const BASIC_ROLLS = ["d4", "d6", "d10", "d20", "d100"];

export default function Roll(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    // initialize from local storage
    try {
      const data = localStorage?.getItem(STORAGE_KEY);
      return new Map(data && JSON.parse(data)) as typeof initialState;
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    // save locally when updated
    localStorage?.setItem(STORAGE_KEY, JSON.stringify(Array.from(state)));
  }, [state]);

  // TODO: using this instead of the reducer state. bring back the reducer? or add more state for names & save it all.
  const [rolls, setRolls] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const handleSubmit = useCallback(() => {
    const roll = value.trim();
    dispatch({ type: "parse", roll });
    roll && setRolls((r) => r.concat(roll));
    setValue("");
  }, [value]);
  return (
    <div>
      <Head>
        <title>Dice City</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.title}>
          <h1>Dice City&nbsp;</h1>
          <h5>where the dice are dicey and the rolls are spicy</h5>
        </div>
        <div className={styles.top}>
          <p>
            <input type="text" placeholder="2d6+5" value={value} onChange={(e) => setValue(e.currentTarget.value)} />{" "}
            <button onClick={handleSubmit}>Add</button>
            <br />
            <small>
              Describe rolls in <code>XdY</code> format: <code>3d6</code>, <code>1d12+5</code>, <code>2d4+2d8</code>
            </small>
          </p>
          {BASIC_ROLLS.map((r) => (
            <OneRoll key={r} roll={r} />
          ))}
        </div>
      </header>
      <ul className={styles.canvas}>
        {rolls.map((r, i) => (
          <OneRoll
            key={i}
            roll={r}
            onDelete={() => window.confirm(DELETE_MSG) && dispatch({ id: r, type: "delete" })}
            onRename={(name) => dispatch({ type: "name", id: r, name })}
          />
        ))}
      </ul>
    </div>
  );
}
