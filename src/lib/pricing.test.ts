import assert from "node:assert/strict";
import test from "node:test";
import { minimumMonthlyPrice } from "./pricing";

test("calculates the published minimum without inventing discounts", () => {
  assert.equal(minimumMonthlyPrice(1), 490);
  assert.equal(minimumMonthlyPrice(5), 2450);
});

test("rejects invalid location counts", () => {
  assert.throws(() => minimumMonthlyPrice(0), RangeError);
});
