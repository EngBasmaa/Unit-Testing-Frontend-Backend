/**
 * Formats a number as a price string with currency symbol.
 * @example currencyFormatter(1234.5) ==> "$1,234.50"
 * @param {number} amount - The numeric price amount
 * @param {string} currency - Currency symbol, default "$"
 * @param {number} decimals - Number of decimals, default 2
 * @returns {string} Formatted price string
 */
export function currencyFormatter(amount, currency = "$", decimals = 2) {
  if (typeof amount !== "number" || isNaN(amount)) return "";
  const fixedAmount = amount.toFixed(decimals);
  const parts = fixedAmount.split(".");
  const integerPart = parts[0];
  const fractionalPart = parts.length > 1 ? "." + parts[1] : "";
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  return currency + formattedIntegerPart + fractionalPart;
}
