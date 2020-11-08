import React, { useEffect, useReducer } from "react";
import { initialState, reducer, RollState } from "../src/reducer";
import { OneRoll } from "../src/OneRoll";
import styles from "../styles/roll.module.css";
import Head from "next/head";
import { NewRoll } from "../src/NewRoll";
import { FastDice } from "../src/FastDice";
import { useLocalStorage } from "../src/useLocalStorage";

const DELETE_MSG = "Are you sure you want to delete this roll?";
const STORAGE_KEY = "dice-city-state-2";

export default function Index(): JSX.Element {
  const [savedState, persistState] = useLocalStorage<[string, RollState][]>(STORAGE_KEY, []);
  const [state, dispatch] = useReducer(reducer, initialState, () => new Map(savedState));

  useEffect(() => persistState(Array.from(state)), [state]);

  return (
    <div>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <title>Dice City</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.title}>
          <h1>Dice City&nbsp;</h1>
          <h5>where the dice are dicey and the rolls are spicy</h5>
        </div>
        <FastDice />
      </header>

      <ul className={styles.canvas}>
        {Array.from(state.values()).map(({ id, name, roll }) => (
          <OneRoll
            key={id}
            name={name}
            roll={roll}
            onDelete={() => window.confirm(DELETE_MSG) && dispatch({ id, type: "delete" })}
            onRename={(name) => dispatch({ type: "rename", id, name })}
          />
        ))}
        <NewRoll onCreate={(roll, name) => dispatch({ type: "add", roll, name })} />
      </ul>

      <address className={styles.attrib}>
        Made with &lt;/&gt; by{" "}
        <a href="https://twitter.com/giladgray" target="_blank" rel="noopener noreferrer">
          @giladgray
        </a>
        {" – "}
        <a href="https://github.com/giladgray/dice-city" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        {" – "}
        <a href="https://www.flaticon.com/free-icon/dice_459493" target="_blank" rel="noopener noreferrer">
          Favicon source
        </a>
      </address>
    </div>
  );
}
