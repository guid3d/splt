import EmojiActionButtion from "@/components/EmojiActionButtion";
import {
  Center,
  Container,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  Textarea,
  rem,
} from "@mantine/core";
import React from "react";
import { TransactionFormValues } from "..";
import { UseFormReturnType } from "@mantine/form";

type PageSetDetailsProps = {
  form: UseFormReturnType<TransactionFormValues>;
};

const PageSetDetails = ({ form }: PageSetDetailsProps) => {
  return (
    <Container>
      <Stack gap="s">
        <Center>
          <Text fw={500} mb="sm">
            Transaction Detail
          </Text>
        </Center>
        <Center>
          <EmojiActionButtion form={form} />
        </Center>
        <TextInput
          styles={{ input: { textAlign: "center", height: rem(40) } }}
          radius={0}
          variant="unstyled"
          // label="Name"
          placeholder="Dinner at LeDu"
          size={rem(30)}
          {...form.getInputProps("name")}
        />
        <Textarea
          styles={{ input: { textAlign: "center" } }}
          radius={0}
          variant="unstyled"
          autosize
          minRows={2}
          maxRows={4}
          // label="Name"
          // size={rem(30)}
          placeholder="Description (optional)"
          // placeholder="Last weekend of March 2023"
          {...form.getInputProps("description")}
        />
      </Stack>
    </Container>
  );
};

export default PageSetDetails;
