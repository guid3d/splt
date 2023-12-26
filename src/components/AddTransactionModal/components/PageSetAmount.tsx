import EmojiActionButtion from "@/components/EmojiActionButtion";
import { Center, Container, NumberInput, Text, rem } from "@mantine/core";
import React from "react";
import { TransactionFormValues } from "..";
import { UseFormReturnType } from "@mantine/form";

type PageSetAmountProps = {
  form: UseFormReturnType<TransactionFormValues>;
};

const PageSetAmount = ({ form }: PageSetAmountProps) => {
  return (
    <Container>
      <Center>
        <Text fw={500} mb="xl">Amount</Text>
      </Center>
      <Center>
        <NumberInput
          styles={{ input: { textAlign: "center" } }}
          radius={0}
          variant="unstyled"
          placeholder="0,00"
          min={0}
          max={9999999}
          clampBehavior="strict"
          suffix="€"
          defaultValue={0}
          decimalScale={2}
          decimalSeparator=","
          thousandSeparator="."
          allowNegative={false}
          size={rem(50)}
          // mb="md"
          hideControls
        />
      </Center>
    </Container>
  );
};

export default PageSetAmount;
