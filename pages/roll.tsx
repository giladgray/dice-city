import { memo, ReactChild, useCallback, useMemo, useReducer, useState } from "react"
import { reducer, RollProps } from "../src/reducer";
import { stringifyRoll, sum } from "../src/roll";
import styles from '../styles/roll.module.css';


export default function Roll() {
  const [state, dispatch] = useReducer(reducer, new Map());
  const [roll, setRoll] = useState('');
  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    dispatch({ type: 'parse', roll })
    setRoll('');
  }, [roll])
  const rolls = useMemo(() => (
    <ul key={Math.random()}>
    {Array.from(state.values()).map((h) => <SingleRoll key={h.id} {...h} dispatch={dispatch} />)}
  </ul>
  ), [state])
  return <div>
    <br />
    <div>
      <input type="text" value={roll} onChange={e => setRoll(e.currentTarget.value)} />
      <button onClick={handleSubmit}>Add</button>
    </div>
    <br />
    <button onClick={() => dispatch({ type: 'roll-all' })}>Roll all</button>
    {rolls}
  </div>
}

const SingleRoll = memo<RollProps>(({ id, roll, dice, name, dispatch }) => {
  const els = dice.map(([val, sides], i) => {
    const classes = [styles.die, val === sides && styles.crit, val === 1 && styles.fail, sides ===1 && styles.static].filter(Boolean).join(" ")
    return <div className={classes} key={[val,sides,i].join(' ')}><dd>{val}</dd>{sides > 1 && <dt>d{sides}</dt>}</div>
  })
  return <li className={styles.roll}>
    <input type="text" defaultValue={name} placeholder="Name this roll" onBlur={e => dispatch({ type: 'name', id, name: e.currentTarget.value})} /><br/>
    <h4>{stringifyRoll(roll)}</h4>
    <dl>{els}<span className={styles.total}>= {sum(dice)}</span></dl>
    <button onClick={() => dispatch({ id, type: 'roll' })}>Roll</button>
  </li>
})
