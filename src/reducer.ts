export interface RollState {
  id: string;
  name: string;
  roll: string;
}

type State = Map<string, RollState>;

type Action =
  | { type: "add"; roll: string; name?: string }
  | { type: "delete"; id: string }
  | { type: "rename"; id: string; name: string };

export const initialState: State = new Map();
export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case "add": {
      const id = action.roll + "__" + state.size;
      return new Map(state).set(id, { id, roll: action.roll, name: action.name ?? "" });
    }
    case "delete": {
      const next = new Map(state);
      next.delete(action.id);
      return next;
    }
    case "rename": {
      const roll = state.get(action.id);
      return roll ? new Map(state).set(action.id, { ...roll, name: action.name }) : state;
    }
    default:
      return state;
  }
}
