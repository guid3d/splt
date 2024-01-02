import React from "react";
import {
  ActionIcon,
  Center,
  Group,
  NumberFormatter,
  Stack,
  Text,
  TextProps,
  Title,
  rem,
} from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { useExpense } from "@/api";
import dayjs from "dayjs";
import { IconMessage } from "@tabler/icons-react";
import { IconCash } from "@tabler/icons-react";
import { IconUser } from "@tabler/icons-react";
import { IconShare } from "@tabler/icons-react";
const textTypeStyle: TextProps = {
  // w: rem(80),
  // fw: 500,
  c: "dimmed",
  size: "sm",
};

const textStyle: TextProps = {
  fw: 500,
};

const iconProps = {
  style: { width: rem(30), height: rem(30), margin: rem(5) },
  stroke: 1.25,
};

const ExpensePage = () => {
  const searchParams = useSearchParams();
  const expenseId = searchParams.get("e")!;
  const { data, isPending, error } = useExpense(expenseId);
  if (data) {
    return (
      <Stack gap="xs">
        {/* <Center> */}
        <ActionIcon
          disabled
          variant="default"
          size={rem(100)}
          radius={rem(100)}
        >
          <Title order={1} style={{ fontSize: rem(60) }}>
            {data.avatar.emoji}
          </Title>
        </ActionIcon>
        <Title order={2} pb="md">
          {data.name}
        </Title>
        <Title order={1} style={{ fontSize: rem(40) }}>
          <NumberFormatter
            suffix=" €"
            value={data.amount}
            thousandSeparator="."
            decimalSeparator=","
          />
        </Title>
        <Text c="dimmed" pb="xl">
          {dayjs(data.transactionDateTime).format("dddd, MMMM D, YYYY HH:mm")}
        </Text>
        <Text fw={500}>Details</Text>
        <Stack>
          <Group>
            <IconMessage {...iconProps} />
            <Stack gap={0}>
              <Text {...textTypeStyle}>Description</Text>
              <Text {...textStyle}>{data.description}</Text>
            </Stack>
          </Group>
          <Group>
            <IconCash {...iconProps} />
            <Stack gap={0}>
              <Text {...textTypeStyle}>Type</Text>
              <Text {...textStyle}>Expense</Text>
            </Stack>
          </Group>
          {/* <Group>
            <IconCash {...iconProps} />
            <Stack gap={0}>
              <Text {...textTypeStyle}>Everyone is Participant</Text>
              <Text {...textStyle}>
                {data.everyoneIsParticipant ? "True" : "False"}
              </Text>
            </Stack>
          </Group> */}
          <Group>
            <IconUser {...iconProps} />
            <Stack gap={0}>
              <Text {...textTypeStyle}>Paid By</Text>
              <Group gap="xs">
                <ActionIcon disabled variant="default">
                  <Text>{data.expand.paidBy.avatar.emoji}</Text>
                </ActionIcon>
                <Text {...textStyle}>{data.expand.paidBy.name}</Text>
              </Group>
            </Stack>
          </Group>
          <Group>
            <IconShare {...iconProps} />
            <Stack gap={0}>
              <Text {...textTypeStyle}>Participants</Text>
              {data.expand.participants.map((participant, index) => (
                <Group gap="xs" key={participant.id}>
                  <ActionIcon disabled variant="default">
                    <Text>{participant.avatar.emoji}</Text>
                  </ActionIcon>
                  <Text {...textStyle}>{participant.name}</Text>
                </Group>
              ))}
            </Stack>
          </Group>
        </Stack>
        {/* </Center> */}
      </Stack>
    );
  }
};

export default ExpensePage;
