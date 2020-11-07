import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { parseRoll, performRoll, RolledDice, sum } from "./roll";
import styles from "../styles/roll.module.css";

interface Props {
  roll: string;

  id?: string;
  onDelete?: () => void;
  onRename?: (name: string) => void;
}

export const OneRoll = memo<Props>(({ roll, onDelete, onRename }) => {
  const parsed = useMemo(() => parseRoll(roll), [roll]);
  const [dice, setDice] = useState<RolledDice>([]);
  const rolldice = useCallback(() => (parsed ? setDice(performRoll(parsed)) : undefined), [parsed, setDice]);
  useEffect(rolldice, []);
  const els = dice.map(([value, sides], i) => <Die key={[value, sides, i].join(" ")} sides={sides} value={value} />);
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
      <dl className={styles.flexRow}>
        {els}
        {dice.length > 1 && <span className={styles.total}>= {sum(dice)}</span>}
      </dl>
      <button onClick={rolldice}>
        Roll <strong>{roll}</strong>
      </button>
      {/* <button disabled>&#9998;</button> */}
      {onDelete && <button onClick={onDelete}>&times;</button>}
    </div>
  );
});
OneRoll.displayName = "OneRoll";

const Die: React.FC<{ sides: number; value: number }> = ({ sides, value }) => {
  const classes = [
    styles.die,
    value === sides && sides > 1 && styles.crit,
    value === 1 && sides > 1 && styles.fail,
    sides === 1 && styles.static,
    sides > 100 && styles.wide,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={classes}>
      {sides > 1 && <dt>d{sides}</dt>}
      <dd>{value}</dd>
    </div>
  );
};
Die.displayName = "Die";
