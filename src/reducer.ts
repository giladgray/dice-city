import { Dispatch, useReducer } from 'react';
import { ParsedRoll, parseRoll, performRoll, stringifyRoll } from './roll';

interface RollState {
  id: string;
  name: string;
  roll: ParsedRoll;
  dice: [number, number][];
}

export interface RollProps extends RollState {
  id: string;
  dispatch: Dispatch<Action>;
}

export type State = Map<string, RollState>;

export type Action =
  | { type: 'roll-all'}
  | {
      type: 'roll';
      id: string;
    }
  | {
      type: 'parse';
      roll: string;
    } | { type: 'name', id: string, name: string };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'roll-all': {
      const next = new Map(state);
      next.forEach(r => next.set(r.id, { ...r, dice: performRoll(r.roll) }))
      return next;
    }
    case 'roll': {
      const roll = state.get(action.id);
      return roll ? new Map(state).set(action.id, { ...roll, dice: performRoll(roll.roll) }) : state;
    }
    case 'name': {
      const roll = state.get(action.id);
      return roll ? new Map(state).set(action.id, { ...roll, name: action.name }) : state;
    }
    case 'parse': {
      const parsed = parseRoll(action.roll);
      if (parsed) {
        const id = stringifyRoll(parsed);
        return new Map(state).set(id, { id, roll: parsed, dice: performRoll(parsed), name: '' })
      }
      return state;
    }
    default:
      return state;
  }
}
