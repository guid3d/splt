const symbolMap: Record<string, string> = {
  EUR: "€",
  USD: "$",
  THB: "฿",
};

export const currencyToSymbol = (currency: string): string =>
  symbolMap[currency] ?? currency;
