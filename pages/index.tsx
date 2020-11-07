import { memo, ReactChild, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { initialState, reducer, RollProps } from '../src/reducer';
import { stringifyRoll, sum } from '../src/roll';
import styles from '../styles/roll.module.css';
import Head from 'next/head';

const STORAGE_KEY = 'dice-city-state';

export default function Roll() {
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

  const [roll, setRoll] = useState('');
  const handleSubmit = useCallback(() => {
    dispatch({ type: 'parse', roll });
    setRoll('');
  }, [roll]);
  const handleRollAll = useCallback(() => dispatch({ type: 'roll-all' }), []);
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
        <p>
          <input type="text" placeholder="2d6+5" value={roll} onChange={(e) => setRoll(e.currentTarget.value)} />
          <button onClick={handleSubmit}>Add</button>
          <br />
          <small>Describe rolls in <code>XdY</code> format: <code>3d6</code>, <code>1d12+5</code>, <code>2d4+2d8</code></small>
        </p>
        <button onClick={handleRollAll}>Roll all</button>
      </header>
      <ul>
        {Array.from(state.values()).map((h) => (
          <SingleRoll key={h.id} {...h} dispatch={dispatch} />
        ))}
      </ul>
    </div>
  );
}

const SingleRoll = memo<RollProps>(({ id, roll, dice, name, dispatch }) => {
  const els = dice.map(([val, sides], i) => {
    const classes = [styles.die, val === sides && styles.crit, val === 1 && styles.fail, sides === 1 && styles.static]
      .filter(Boolean)
      .join(' ');
    return (
      <div className={classes} key={[val, sides, i].join(' ')}>
        <dd>{val}</dd>
        {sides > 1 && <dt>d{sides}</dt>}
      </div>
    );
  });
  return (
    <li className={styles.roll}>
      <input
        type="text"
        defaultValue={name}
        placeholder="Name this roll"
        onBlur={(e) => dispatch({ type: 'name', id, name: e.currentTarget.value })}
      />
      <br />
      <h4>{stringifyRoll(roll)}</h4>
      <dl className={styles.flexRow}>
        {els}
        <span className={styles.total}>= {sum(dice)}</span>
      </dl>
      <button onClick={() => dispatch({ id, type: 'roll' })}>Roll</button>&nbsp;&nbsp;
      <button onClick={() => window.confirm('Are you sure?') && dispatch({ id, type: 'delete' })}>&times;</button>
    </li>
  );
});
