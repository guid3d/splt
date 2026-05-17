import { Input } from "@mantine/core";
import React from "react";

type IbanInputProps = {
  value: string;
  onChange: (value: string) => void;
  error?: React.ReactNode;
};

const formatIban = (raw: string) =>
  raw
    .replace(/\s/g, "")
    .toUpperCase()
    .replace(/(.{4})/g, "$1 ")
    .trim();

const IbanInput = ({ value, onChange, error }: IbanInputProps) => (
  <Input.Wrapper label="IBAN" error={error}>
    <Input
      radius={0}
      variant="unstyled"
      size="md"
      placeholder="DE00 0000 0000 0000 0000 00"
      value={formatIban(value)}
      onChange={(e) =>
        onChange(e.currentTarget.value.replace(/\s/g, "").toUpperCase().slice(0, 34))
      }
      onKeyDown={(e) => {
        if (e.key === " ") e.preventDefault();
      }}
    />
  </Input.Wrapper>
);

export default IbanInput;
