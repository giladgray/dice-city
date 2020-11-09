export type ParsedRoll = { count: number; sides: number }[];
export type RolledDice = { sides: number; value: number; key: string }[];

const diePattern = /^(\d*)(?:[dD](\d+))?$/;
export function parseDie(roll: string) {
  const [, count, sides] = diePattern.exec(roll) ?? [];
  return { count: +count || 1, sides: +sides || 1 };
}

const rollValidator = /^[dD\d\s+]+$/;
const rollSplitter = /\s*\+\s*/;
export function parseRoll(roll: string): ParsedRoll | null {
  if (!rollValidator.test(roll)) return null;
  return roll.split(rollSplitter).map(parseDie);
}

export function stringifyRoll(roll: ParsedRoll) {
  return roll.map((r) => (r.sides === 1 ? r.count : `${r.count}d${r.sides}`)).join(" + ");
}

export function performSingleRoll({ count, sides }: ParsedRoll[0]): RolledDice {
  if (sides === 1) return [{ sides, value: count, key: [sides, count, Math.random().toFixed(3)].join(":") }];
  const rolls: RolledDice = [];
  for (let i = 0; i < count; i++) {
    const value = 1 + Math.floor(Math.random() * sides);
    rolls.push({ sides, value, key: [sides, value, Math.random().toFixed(3)].join(":") });
  }
  return rolls;
}

export function performRoll(roll: ParsedRoll) {
  return roll.reduce<RolledDice>((acc, r) => acc.concat(performSingleRoll(r)), []);
}

export function sum(rolls: RolledDice) {
  return rolls.reduce<number>((acc, r) => (acc += r.value), 0);
}
