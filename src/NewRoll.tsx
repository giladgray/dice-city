import React, { memo, useState } from "react";
import styles from "../styles/roll.module.css";

interface Props {
  onCreate: (roll: string, name?: string) => void;
}

export const NewRoll = memo<Props>(({ onCreate }) => {
  const name = useInput("Name new roll");
  const roll = useInput("1d12+6");

  function handleCreate() {
    onCreate(roll.value.trim(), name.value.trim());
    name.onChange("");
    roll.onChange("");
  }

  return (
    <div className={styles.roll}>
      <input type="text" {...name} />
      <dl className={styles.flexRow}>
        <div className={styles.die + " " + styles.static}>
          <dt>
            Describe rolls in <em>XdY+Z</em> format.
          </dt>
          <input type="text" {...roll} />
        </div>
      </dl>
      <button onClick={handleCreate}>Add roll</button>
    </div>
  );
});
NewRoll.displayName = "NewRoll";

function useInput(placeholder: string) {
  const [value, setValue] = useState("");
  return {
    value,
    placeholder,
    onChange: (e: string | React.ChangeEvent<HTMLInputElement>) =>
      setValue(typeof e === "string" ? e : e.currentTarget.value),
  };
}
