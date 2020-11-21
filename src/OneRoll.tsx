import React, { useCallback, useEffect, useMemo, useState } from "react";
import { parseRoll, performRoll, RolledDice } from "./roll";
import styles from "../styles/roll.module.css";
import { Dice } from "./Dice";

interface Props {
  roll: string;
  name?: string;
  onDelete?: () => void;
  onRename?: (name: string) => void;
}

export const OneRoll: React.FC<Props> = ({ name, roll, onDelete, onRename }) => {
  const parsed = useMemo(() => parseRoll(roll), [roll]);
  const [dice, setDice] = useState<RolledDice>([]);
  const rolldice = useCallback(() => (parsed ? setDice(performRoll(parsed)) : undefined), [parsed, setDice]);
  useEffect(rolldice, []);
  return (
    <div className={styles.roll}>
      {onRename && (
        <input
          type="text"
          defaultValue={name}
          placeholder="Name this roll"
          onBlur={(e) => onRename(e.currentTarget.value)}
        />
      )}
      <Dice dice={dice} />
      <button onClick={rolldice}>
        Roll <strong>{roll}</strong>
      </button>
      {/* <button disabled>&#9998;</button> */}
      {onDelete && <button onClick={onDelete}>&times;</button>}
    </div>
  );
};
OneRoll.displayName = "OneRoll";
