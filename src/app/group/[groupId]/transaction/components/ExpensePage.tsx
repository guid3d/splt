import React from "react";
import {
  ActionIcon,
  Center,
  Group,
  NumberFormatter,
  Skeleton,
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
import ParticipantAvatar from "@/components/ParticipantAvatar";
import { EuroNumberFormatter } from "@/components/NumberFormatter";
const textTypeStyle: TextProps = {
  // w: rem(80),
  // fw: 500,
  c: "dimmed",
  size: "sm",
};

const dataStyle = {
  // fw: 500,
  maw: rem(330),
};

const iconProps = {
  style: {
    width: rem(30),
    height: rem(30),
    marginTop: rem(5),
    marginBottom: rem(10),
    marginLeft: rem(10),
    marginRight: rem(10),
  },
  stroke: 1.25,
};

const ExpensePage = () => {
  const searchParams = useSearchParams();
  const expenseId = searchParams.get("e")!;
  const { data, isPending, error } = useExpense(expenseId);
  // console.log(data);
  if (isPending) {
    return (
      <Stack gap={0}>
        <Skeleton height={rem(100)} circle mb="md" />
        <Skeleton height={rem(30)} radius="xl" mb="xl" />
        <Skeleton height={rem(50)} radius="xl" mb="md" />
        <Skeleton height={rem(20)} radius="xl" mb="sm" />
      </Stack>
    );
  }
  if (data) {
    return (
      <Stack gap="xs">
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
          <EuroNumberFormatter value={data.amount} />
        </Title>
        <Text c="dimmed" pb="xl">
          {dayjs(data.transactionDateTime).format("dddd, MMMM D, YYYY HH:mm")}
        </Text>
        <Text fw={500}>Details</Text>
        <Stack>
          <Group align="start">
            <IconMessage {...iconProps} />
            <Stack gap={0}>
              <Text {...textTypeStyle}>Description</Text>
              <Text {...dataStyle}>
                {data.description ? data.description : "-"}
              </Text>
            </Stack>
          </Group>
          <Group align="start">
            <IconCash {...iconProps} />
            <Stack gap={0}>
              <Text {...textTypeStyle}>Type</Text>
              <Text {...dataStyle}>Expense</Text>
            </Stack>
          </Group>
          <Group align="start">
            <IconUser {...iconProps} />
            <Stack gap={0}>
              <Text {...textTypeStyle}>Paid By</Text>
              <ParticipantAvatar
                avatar={data.expand.paidBy.avatar}
                name={data.expand.paidBy.name}
              />
            </Stack>
          </Group>
          <Group align="start">
            <IconShare {...iconProps} />
            <Stack gap={0}>
              <Text {...textTypeStyle}>Participants</Text>
              <Group gap="xs" {...dataStyle}>
                {!data.everyoneIsParticipant
                  ? data.expand.participants.map((participant, index) => (
                      <ParticipantAvatar
                        key={participant.id}
                        avatar={participant.avatar}
                        name={participant.name}
                        description={
                          <EuroNumberFormatter value={data.amountPerPerson} />
                        }
                      />
                    ))
                  : data.expand.groupInfo.expand.participants.map(
                      (participant, index) => (
                        <ParticipantAvatar
                          key={participant.id}
                          avatar={participant.avatar}
                          name={participant.name}
                          description={
                            <EuroNumberFormatter value={data.amountPerPerson} />
                          }
                        />
                      )
                    )}
              </Group>
            </Stack>
          </Group>
        </Stack>
      </Stack>
    );
  }
};

export default ExpensePage;
