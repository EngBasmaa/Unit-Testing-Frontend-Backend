import { currencyFormatter } from "../components/formatPrice/formatPrice";

describe("currencyFormatter function", () => {
  // Test case 1: formats number with default currency and 2 decimals
  it("formats number with default currency and 2 decimals", () => {
    expect(currencyFormatter(1234.5)).toBe("$1,234.50");
    expect(currencyFormatter(100)).toBe("$100.00");
    expect(currencyFormatter(0)).toBe("$0.00");
    expect(currencyFormatter(99.999)).toBe("$100.00");
    expect(currencyFormatter(0.1)).toBe("$0.10");
    expect(currencyFormatter(1234567.89)).toBe("$1,234,567.89");
    expect(currencyFormatter(1)).toBe("$1.00");
  });

  it("formats number with custom currency symbol and decimals", () => {
    expect(currencyFormatter(500, "€")).toBe("€500.00");
    expect(currencyFormatter(25.75, "£")).toBe("£25.75");
    expect(currencyFormatter(123.456, "$", 0)).toBe("$123");
    expect(currencyFormatter(123.456, "$", 1)).toBe("$123.5");
    expect(currencyFormatter(123.456, "$", 3)).toBe("$123.456");
    expect(currencyFormatter(10, "JPY", 0)).toBe("JPY10");
    expect(currencyFormatter(9876.54321, "CAD", 4)).toBe("CAD9,876.5432");
  });

  // Test case 3: returns empty string for invalid input
  it("returns empty string for invalid input", () => {
    expect(currencyFormatter(null)).toBe("");
    expect(currencyFormatter(undefined)).toBe("");
    expect(currencyFormatter("abc")).toBe("");
    expect(currencyFormatter(NaN)).toBe("");
    expect(currencyFormatter(null, "€", 3)).toBe("");
    expect(currencyFormatter("test", "$", 0)).toBe("");
  });
});
