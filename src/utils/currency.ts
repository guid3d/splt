type CurrencyFormat = {
  symbol: string;
  decimalSeparator: string;
  thousandSeparator: string;
};

const formatMap: Record<string, CurrencyFormat> = {
  EUR: { symbol: "€", decimalSeparator: ",", thousandSeparator: "." },
  USD: { symbol: "$", decimalSeparator: ".", thousandSeparator: "," },
  THB: { symbol: "฿", decimalSeparator: ".", thousandSeparator: "," },
};

export const currencyFormat = (currency: string): CurrencyFormat =>
  formatMap[currency] ?? { symbol: currency, decimalSeparator: ".", thousandSeparator: "," };

export const currencyToSymbol = (currency: string): string =>
  currencyFormat(currency).symbol;
