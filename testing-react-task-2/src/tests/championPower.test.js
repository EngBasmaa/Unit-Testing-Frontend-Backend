import { describe, it, expect } from "vitest";
import evaluateHeroPower from "../utils/championPower";
describe("evaluateHeroPower", () => {
  it('should return "weak" for strength less than 10', () => {
    expect(evaluateHeroPower(5)).toBe("5 (weak)");
    expect(evaluateHeroPower(0)).toBe("0 (weak)");
    expect(evaluateHeroPower(9)).toBe("9 (weak)");
  });
  it('should return "strong" for strength between 10 and 19 (inclusive)', () => {
    expect(evaluateHeroPower(10)).toBe("10 (strong)");
    expect(evaluateHeroPower(15)).toBe("15 (strong)");
    expect(evaluateHeroPower(19)).toBe("19 (strong)");
  });

  it('should return "unbelievable" for strength 20 or greater', () => {
    expect(evaluateHeroPower(20)).toBe("20 (unbelievable)");
    expect(evaluateHeroPower(25)).toBe("25 (unbelievable)");
    expect(evaluateHeroPower(100)).toBe("100 (unbelievable)");
  });
  it("should handle negative strength as weak", () => {
    expect(evaluateHeroPower(-1)).toBe("-1 (weak)");
  });
});
