import React, { memo, useState } from "react";
import styles from "../styles/roll.module.css";

interface Props {
  onCreate: (roll: string, name?: string) => void;
}

export const NewRoll = memo<Props>(({ onCreate }) => {
  const name = useInput("Name new roll");
  const roll = useInput("1d12+6");

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (roll.value) {
      onCreate(roll.value.trim(), name.value.trim());
      name.onChange("");
      roll.onChange("");
    }
  }

  return (
    <form className={styles.roll} onSubmit={handleCreate}>
      <input type="text" {...name} />
      <dl className={styles.flexRow}>
        <div className={styles.die + " " + styles.static}>
          <dt>
            Describe rolls in <em>XdY+Z</em> format.
          </dt>
          <input type="text" pattern="[d+-\\d\\s]*" {...roll} />
        </div>
      </dl>
      <button type="submit">Add roll</button>
    </form>
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
