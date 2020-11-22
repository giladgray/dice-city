import assert from "assert";
import { Roll } from "./roll";

describe("roll parsing", () => {
  function test(roll: string, expected: string | null = roll) {
    it(roll, () => {
      const parsed = Roll.parse(roll);
      assert.strictEqual(parsed?.map((r) => `${r.count}d${r.sides}`).join(" + ") ?? null, expected);
    });
  }

  test("3", "3d1");
  test("d6", "1d6");
  test("3d6");
  test("3D6", "3d6");
  test("3d6 + 2d8");
  test("2d20 + 5", "2d20 + 5d1");
  test("1 + 2 + d20", "1d1 + 2d1 + 1d20");

  test("3xy", null);
  test("invalid", null);
});
