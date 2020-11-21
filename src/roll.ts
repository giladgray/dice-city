export type ParsedRoll = { count: number; sides: number }[];
export type RolledDice = { sides: number; value: number; key: string }[];

const diePattern = /^(\d*)(?:[dD](\d+))?$/;
const rollValidator = /^[dD\d\s+]+$/;
const rollSplitter = /\s*\+\s*/;

export const Roll = {
  parse(roll: string): ParsedRoll | null {
    if (!rollValidator.test(roll)) return null;
    return roll.split(rollSplitter).map((die) => {
      const [, count, sides] = diePattern.exec(die) ?? [];
      return { count: +count || 1, sides: +sides || 1 };
    });
  },

  stringify(roll: ParsedRoll) {
    return roll.map((r) => (r.sides === 1 ? r.count : `${r.count}d${r.sides}`)).join(" + ");
  },

  rollDie({ count, sides }: ParsedRoll[0]): RolledDice {
    if (sides === 1) return [{ sides, value: count, key: [sides, count, Math.random().toFixed(3)].join(":") }];
    const rolls: RolledDice = [];
    for (let i = 0; i < count; i++) {
      const value = 1 + Math.floor(Math.random() * sides);
      rolls.push({ sides, value, key: [sides, value, Math.random().toFixed(3)].join(":") });
    }
    return rolls;
  },

  roll(roll: ParsedRoll) {
    return roll.reduce<RolledDice>((acc, r) => acc.concat(Roll.rollDie(r)), []);
  },

  sum(rolls: RolledDice) {
    return rolls.reduce<number>((acc, r) => (acc += r.value), 0);
  },

  color(sides: number, value: number) {
    if (value === sides) return "#daa520";
    else if (value === 1) return "#b22222";
    return "#dcdcdc";
  },
};
