import EmojiActionButtion from "@/components/EmojiActionButtion";
import {
  Center,
  ComboboxData,
  Container,
  NativeSelect,
  NumberInput,
  Text,
  rem,
} from "@mantine/core";
import React from "react";
import { UseFormReturnType } from "@mantine/form";
import { GroupData, TransactionFormValues } from "@/types";

type PageSetAmountProps = {
  groupData: GroupData;
  form: UseFormReturnType<TransactionFormValues>;
};

const PageSetAmount = ({ form, groupData }: PageSetAmountProps) => {
  return (
    <Container>
      <Center>
        <Text fw={500} mb="lg">
          Amount
        </Text>
      </Center>
      <Center mb="xl">
        <NumberInput
          styles={{
            input: {
              textAlign: "center",
              fontSize: rem(50),
              height: rem(80),
            },
            error: { textAlign: "center", fontSize: rem(12) },
          }}
          radius={0}
          variant="unstyled"
          placeholder="0,00"
          min={0}
          max={9999999}
          clampBehavior="strict"
          suffix="€"
          // defaultValue={0}
          decimalScale={2}
          decimalSeparator=","
          thousandSeparator="."
          allowNegative={false}
          // size={rem(50)}
          // mb="md"
          hideControls
          {...form.getInputProps("amount")}
        />
      </Center>
      {/* <Center>
        <Text fw={500}>Paid By</Text>
      </Center> */}
      <Center>
        <Text fw={500} ml="lg" mr="sm">
          Paid By
        </Text>
        <NativeSelect
          size="lg"
          styles={{ input: { textAlign: "end" } }}
          variant="unstyled"
          // label="Paid By"
          // defaultValue={{
          //   label: `${participant.avatar.emoji} ${participant.name}`,
          //   value: participant.id,
          // }}
          data={
            groupData.expand.participants.map((participant) => ({
              label: `${participant.avatar.emoji} ${participant.name}`,
              value: participant.id,
            })) as ComboboxData
          }
          {...form.getInputProps("paidBy")}
        />
      </Center>
    </Container>
  );
};

export default PageSetAmount;
