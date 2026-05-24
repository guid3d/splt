import React from "react";
import { NumberFormatter as MantineNumberFormatter } from "@mantine/core";
import { currencyToSymbol } from "@/utils/currency";

type NumberFormatterProps = {
  value: number | undefined;
  currency?: string;
};

const CurrencyFormatter = ({ value, currency = "EUR" }: NumberFormatterProps) => {
  return (
    <MantineNumberFormatter
      suffix={` ${currencyToSymbol(currency)}`}
      value={value ? value : 0}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale
    />
  );
};

export { CurrencyFormatter };
