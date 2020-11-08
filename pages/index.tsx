import React, { useEffect, useReducer } from "react";
import { initialState, reducer } from "../src/reducer";
import { OneRoll } from "../src/OneRoll";
import styles from "../styles/roll.module.css";
import Head from "next/head";
import { NewRoll } from "../src/NewRoll";
import { FastDice } from "../src/FastDice";

const DELETE_MSG = "Are you sure you want to delete this roll?";
const STORAGE_KEY = "dice-city-state";

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
        <FastDice />
      </header>
      <ul className={styles.canvas}>
        {Array.from(state.values()).map(({ id, name }) => (
          <OneRoll
            key={id}
            name={name}
            roll={id}
            onDelete={() => window.confirm(DELETE_MSG) && dispatch({ id, type: "delete" })}
            onRename={(name) => dispatch({ type: "name", id, name })}
          />
        ))}
        <NewRoll onCreate={(roll, name) => dispatch({ type: "parse", roll, name })} />
      </ul>
    </div>
  );
}
