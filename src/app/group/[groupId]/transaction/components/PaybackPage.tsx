import {
  Avatar,
  Center,
  Group, Skeleton,
  Stack,
  Text,
  TextProps,
  Title,
  rem
} from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { useDeletePayback, usePayback } from "@/api";
import dayjs from "dayjs";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { EuroNumberFormatter } from "@/components/NumberFormatter";
import DeleteButton from "./DeleteButton";
import Metadata from "@/components/Metadata";
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
  const deletePaybackMutation = useDeletePayback();
  if (isPending) {
    return (
      <Stack gap={0}>
        <Skeleton height={rem(100)} radius="xl" mb="md" />
        <Skeleton height={rem(30)} radius="xl" mb="lg" />
        <Skeleton height={rem(50)} radius="xl" mb="md" />
        <Skeleton height={rem(20)} radius="xl" mb="sm" />
      </Stack>
    );
  }

  if (data) {
    return (
      <>
        <Metadata
          seoTitle={`${data.expand.fromPerson.name} to ${data.expand.toPerson.name} -- SPLT`}
          seoDescription={`${data.expand.groupInfo.name}`}
        />
        <Stack gap="xs">
          <Group>
            <Stack>
              <Center>
                <Avatar variant="light" size={rem(80)} radius={rem(80)}>
                  <Title order={1} style={{ fontSize: rem(50) }}>
                    {data.expand.fromPerson.avatar.emoji}
                  </Title>
                </Avatar>
              </Center>
              <Center>
                <Title fw={500} order={2} pb="md">
                  {data.expand.fromPerson.name}
                </Title>
              </Center>
            </Stack>
            <IconArrowNarrowRight size="3rem" stroke={1.5} />
            <Stack>
              <Center>
                <Avatar variant="light" size={rem(80)} radius={rem(80)}>
                  <Title order={1} style={{ fontSize: rem(50) }}>
                    {data.expand.toPerson.avatar.emoji}
                  </Title>
                </Avatar>
              </Center>
              <Center>
                <Title fw={500} order={2} pb="md">
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
          <Center>
            <DeleteButton
              id={paybackId}
              deleteMutation={deletePaybackMutation}
            />
          </Center>
        </Stack>
      </>
    );
  }
};

export default PaybackPage;
