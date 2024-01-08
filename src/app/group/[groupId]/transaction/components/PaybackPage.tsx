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
import { useExpense, usePayback } from "@/api";
import dayjs from "dayjs";
import { IconMessage } from "@tabler/icons-react";
import { IconCash } from "@tabler/icons-react";
import { IconUser } from "@tabler/icons-react";
import { IconShare } from "@tabler/icons-react";
import ParticipantAvatar from "@/components/ParticipantAvatar";
import { IconArrowRight } from "@tabler/icons-react";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { EuroNumberFormatter } from "@/components/NumberFormatter";
const textTypeStyle: TextProps = {
  // w: rem(80),
  // fw: 500,
  c: "dimmed",
  size: "sm",
};

const textStyle: TextProps = {
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

const PaybackPage = () => {
  const searchParams = useSearchParams();
  const paybackId = searchParams.get("p")!;
  const { data, isPending, error } = usePayback(paybackId);
  console.log(data);
  if (data) {
    return (
      <Stack gap="xs">
        <Group>
          <Stack>
            <Center>
              <ActionIcon
                disabled
                variant="default"
                size={rem(100)}
                radius={rem(100)}
              >
                <Title order={1} style={{ fontSize: rem(60) }}>
                  {data.expand.fromPerson.avatar.emoji}
                </Title>
              </ActionIcon>
            </Center>
            <Center>
              <Title order={2} pb="md">
                {data.expand.fromPerson.name}
              </Title>
            </Center>
          </Stack>
          <IconArrowNarrowRight size="3rem" stroke={2} />
          <Stack>
            <Center>
              <ActionIcon
                disabled
                variant="default"
                size={rem(100)}
                radius={rem(100)}
              >
                <Title order={1} style={{ fontSize: rem(60) }}>
                  {data.expand.toPerson.avatar.emoji}
                </Title>
              </ActionIcon>
            </Center>
            <Center>
              <Title order={2} pb="md">
                {data.expand.toPerson.name}
              </Title>
            </Center>
          </Stack>
        </Group>
        <Title order={1} style={{ fontSize: rem(40) }}>
          <EuroNumberFormatter value={data.amount} />
        </Title>
        <Text c="dimmed" pb="xl">
          {dayjs(data.transactionDateTime).format("dddd, MMMM D, YYYY HH:mm")}
        </Text>
      </Stack>
    );
  }
};

export default PaybackPage;
