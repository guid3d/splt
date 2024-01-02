import EmojiActionButtion from "@/components/EmojiActionButtion";
import {
  Center,
  Container,
  Input,
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
import BigTextInput from "@/components/BigTextInput";
import { useMediaQuery } from "@mantine/hooks";

type PageSetDetailsProps = {
  form: UseFormReturnType<TransactionFormValues>;
};

const PageSetDetails = ({ form }: PageSetDetailsProps) => {
  const isMobile = useMediaQuery("(max-width: 50em)") || false;

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
        <BigTextInput
          placeholder="Dinner at LeDu"
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
          {/* TODO: Implement select from mobile date ui when run on mobile */}
          {/* {isMobile ? ( */}
          <DateTimePicker
            // styles={{ input: { textAlign: "center" } }}
            valueFormat="DD MMM YYYY, H:mm"
            radius={0}
            variant="unstyled"
            maxDate={new Date()}
            // defaultValue={new Date()}
            // size="lg"
            dropdownType={isMobile ? "modal" : "popover"}
            // placeholder="Now"
            // leftSection={<IconCalendarEvent />}
            // value={dayjs(form.values.expenseDateTime).va}
            {...form.getInputProps("transactionDateTime")}
          ></DateTimePicker>
          {/* ) : (
            <Input
              type="datetime-local"
              radius={0}
              variant="unstyled"
              value={dayjs(form.values.transactionDateTime).format(
                "YYYY-MM-DDTHH:mm"
              )}
              // {...form.getInputProps("transactionDateTime")}
            ></Input>
          )} */}
        </Center>
      </Stack>
    </Container>
  );
};

export default PageSetDetails;
