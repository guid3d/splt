import React from "react";
import { NumberFormatter as MantineNumberFormatter } from "@mantine/core";
import { currencyFormat } from "@/utils/currency";

type NumberFormatterProps = {
  value: number | undefined;
  currency?: string;
};

const CurrencyFormatter = ({ value, currency = "EUR" }: NumberFormatterProps) => {
  const { symbol, decimalSeparator, thousandSeparator } = currencyFormat(currency);
  return (
    <MantineNumberFormatter
      suffix={` ${symbol}`}
      value={value ? value : 0}
      thousandSeparator={thousandSeparator}
      decimalSeparator={decimalSeparator}
      decimalScale={2}
      fixedDecimalScale
    />
  );
};

export { CurrencyFormatter };
