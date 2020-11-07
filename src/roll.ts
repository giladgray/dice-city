export type ParsedRoll = { count: number; sides: number }[];
export type RolledDice = [number, number][];

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

export function rollDie(die: ParsedRoll[0]): RolledDice {
  if (die.sides === 1) return [[die.count, 1]];
  const rolls: RolledDice = [];
  for (let i = 0; i < die.count; i++) {
    rolls.push([1 + Math.floor(Math.random() * die.sides), die.sides]);
  }
  return rolls;
}

export function performRoll(roll: ParsedRoll) {
  return roll.reduce<RolledDice>((acc, r) => acc.concat(rollDie(r)), []);
}

export function sum(rolls: RolledDice) {
  return rolls.reduce<number>((acc, r) => (acc += r[0]), 0);
}
