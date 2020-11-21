import React, { useEffect, useReducer } from "react";
import { initialState, reducer, RollState } from "../src/reducer";
import { OneRoll } from "../src/OneRoll";
import styles from "../styles/index.module.css";
import { NewRoll } from "../src/NewRoll";
import { useLocalStorage } from "../src/useLocalStorage";

const DELETE_MSG = "Are you sure you want to delete this roll?";
const STORAGE_KEY = "dice-city-state-2";

export default function Index(): JSX.Element {
  const [savedState, persistState] = useLocalStorage<[string, RollState][]>(STORAGE_KEY, []);
  const [state, dispatch] = useReducer(reducer, initialState, () => new Map(savedState));

  useEffect(() => persistState(Array.from(state)), [state]);

  return (
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
  );
}
