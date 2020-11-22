import { m as motion } from "framer-motion";
import React, { memo } from "react";
import styles from "../styles/roll.module.css";
import { Roll, RolledDice } from "./roll";

interface DieProps {
  sides: number;
  value: number;
}

export const Die = memo<DieProps>(({ sides, value }) => {
  if (sides === 1) {
    return (
      <div className={styles.die}>
        <dd className={styles.static}>
          <span>{value}</span>
        </dd>
      </div>
    );
  }

  const color = Roll.color(sides, value);
  const duration = 0.5 + Math.random() * 0.5;
  const loops = 2 + Math.floor(Math.random() * 4);
  return (
    <div className={styles.die}>
      <dt>d{sides}</dt>
      <motion.dd
        animate={{ color, [sides === 2 ? "rotateY" : "rotate"]: 360 * loops }}
        transition={{ duration }}
        style={sides === 2 ? { borderRadius: "50%" } : {}}
      >
        <motion.span
          animate={{ filter: ["blur(0)", "blur(4px)", "blur(0)"] }}
          transition={{ duration: duration - 0.1, times: [0, 0.1, 1] }}
        >
          {value}
        </motion.span>
      </motion.dd>
    </div>
  );
});
Die.displayName = "Die";

interface DiceProps {
  dice: RolledDice;
  noSum?: boolean;
}

export const Dice: React.FC<DiceProps> = ({ dice, noSum = false, children }) => (
  <dl className={styles.dice}>
    {dice.map((d, i) => (
      <Die {...d} key={d.key + i} />
    ))}
    {dice.length > 1 && !noSum && <span className={styles.total}>= {Roll.sum(dice)}</span>}
    {children}
  </dl>
);
Dice.displayName = "Dice";
