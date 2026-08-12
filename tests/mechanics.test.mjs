import assert from "node:assert/strict";
import test from "node:test";

import { attackDamage, fieldGrade } from "../app/game/mechanics.ts";

test("bound embers create a controlled blade-power curve", () => {
  assert.equal(attackDamage("slash", 0), 20);
  assert.equal(attackDamage("slash", 6), 26);
  assert.equal(attackDamage("heavy", 0), 38);
  assert.equal(attackDamage("heavy", 6), 50);
  assert.equal(attackDamage("heavy", 99), 50, "damage clamps to the six available embers");
});

test("field grades reward exploration and pace", () => {
  assert.equal(fieldGrade(90, 6), "S");
  assert.equal(fieldGrade(130, 4), "A");
  assert.equal(fieldGrade(200, 2), "B");
  assert.equal(fieldGrade(80, 1), "C", "speed alone cannot replace route exploration");
});
