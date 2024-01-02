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
import { UseFormReturnType } from "@mantine/form";
import { TransactionFormValues } from "@/types";
import { DateTimePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { IconCalendarEvent } from "@tabler/icons-react";

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
        <Center>
          <DateTimePicker
            // styles={{ input: { textAlign: "center" } }}
            valueFormat="DD MMM YYYY, H:mm"
            radius={0}
            variant="unstyled"
            // defaultValue={new Date()}
            // size="lg"
            dropdownType="modal"
            // placeholder="Now"
            // leftSection={<IconCalendarEvent />}
            // value={dayjs(form.values.expenseDateTime).va}
            {...form.getInputProps("transactionDateTime")}
          ></DateTimePicker>
        </Center>
      </Stack>
    </Container>
  );
};

export default PageSetDetails;
