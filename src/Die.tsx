import { m as motion } from "framer-motion";
import React, { memo } from "react";
import styles from "../styles/roll.module.css";

interface DieProps {
  sides: number;
  value: number;
}

export const Die = memo<DieProps>(({ sides, value }) => {
  if (sides === 1) {
    return (
      <div className={styles.die}>
        <dd style={{ boxShadow: "none" }}>
          <span>{value}</span>
        </dd>
      </div>
    );
  }

  const color = getColor(sides, value);
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

function getColor(sides: number, value: number) {
  if (value === sides) return "#daa520";
  else if (value === 1) return "#b22222";
  return "#dcdcdc";
}
