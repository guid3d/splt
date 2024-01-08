import React from "react";
import { NumberFormatter as MantineNumberFormatter } from "@mantine/core";

type NumberFormatterProps = {
  value: number | undefined;
};

const EuroNumberFormatter = ({ value }: NumberFormatterProps) => {
  return (
    <MantineNumberFormatter
      suffix=" €"
      value={value ? value : 0}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
    />
  );
};

export { EuroNumberFormatter };
