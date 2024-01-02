import { TextInput, TextInputProps, rem } from "@mantine/core";
import React, { ComponentPropsWithoutRef } from "react";

interface BigTextInputProps extends TextInputProps {
  placeholder: string;
  // params: any;
}

const BigTextInput = ({ placeholder, ...params }: BigTextInputProps) => {
  return (
    <TextInput
      styles={{
        input: {
          textAlign: "center",
          fontSize: rem(30),
          height: rem(40),
        },
        error: { textAlign: "center", fontSize: rem(12) },
      }}
      radius={0}
      variant="unstyled"
      // label="Name"
      placeholder={placeholder}
      // size={rem(30)}
      {...params}
    />
  );
};

export default BigTextInput;
