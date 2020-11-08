import { Dispatch } from "react";
import { ParsedRoll, parseRoll, performRoll, RolledDice, stringifyRoll } from "./roll";

interface RollState {
  id: string;
  name: string;
  roll: ParsedRoll;
  dice: RolledDice;
}

export interface RollProps extends RollState {
  id: string;
  dispatch: Dispatch<Action>;
}

export type State = Map<string, RollState>;

export type Action =
  | { type: "delete"; id: string }
  | { type: "name"; id: string; name: string }
  | { type: "parse"; roll: string; name?: string }
  | { type: "roll"; id: string }
  | { type: "roll-all" };

export const initialState: State = new Map();
export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "delete": {
      const next = new Map(state);
      next.delete(action.id);
      return next;
    }
    case "roll-all": {
      const next = new Map(state);
      next.forEach((r) => next.set(r.id, { ...r, dice: performRoll(r.roll) }));
      return next;
    }
    case "roll": {
      const roll = state.get(action.id);
      return roll ? new Map(state).set(action.id, { ...roll, dice: performRoll(roll.roll) }) : state;
    }
    case "name": {
      const roll = state.get(action.id);
      return roll ? new Map(state).set(action.id, { ...roll, name: action.name }) : state;
    }
    case "parse": {
      const parsed = parseRoll(action.roll);
      if (parsed) {
        const id = stringifyRoll(parsed);
        return new Map(state).set(id, { id, roll: parsed, dice: performRoll(parsed), name: action.name ?? "" });
      }
      return state;
    }
    default:
      return state;
  }
}
