import {
  Avatar,
  Center,
  Skeleton,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import React from "react";
import { TotalSpendData } from "@/types";
import { TabType } from "./Tab";
import { useParams } from "next/navigation";
import { UseQueryResult } from "@tanstack/react-query";
import ListParticipantsModal from "@/components/ListParticipantsModal";
import { EuroNumberFormatter } from "@/components/NumberFormatter";
import EditGroupModal from "./EditGroupModal";
import { useDebts } from "@/api";

type TopSummaryProps = {
  groupData: UseQueryResult<TotalSpendData, Error>;
  selectedTab: string;
  localUserId?: string | null;
};

const TopSummary = ({ selectedTab, groupData, localUserId }: TopSummaryProps) => {
  const { groupId } = useParams<{ groupId: string }>();
  const { data: debts } = useDebts(groupId);
  const { data, isPending } = groupData;

  const netBalance = (() => {
    if (!debts || !localUserId) return null;
    const owed = debts
      .filter((d) => d.fromPerson.id === localUserId)
      .reduce((s, d) => s + d.amount, 0);
    const owedToMe = debts
      .filter((d) => d.toPerson.id === localUserId)
      .reduce((s, d) => s + d.amount, 0);
    return owedToMe - owed;
  })();

  if (isPending) {
    return (
      <Stack gap={0}>
        <Skeleton height={rem(100)} circle mb="sm" />
        <Skeleton height={rem(40)} radius="xl" mb="sm" />
        <Skeleton height={rem(20)} radius="xl" mb="sm" />
        <Skeleton height={rem(20)} radius="xl" mb="sm" />
      </Stack>
    );
  }

  if (data) {
    return (
      <Stack gap="xs">
        <Center>
          <Avatar variant="light" size={rem(100)} radius={rem(100)}>
            <Title order={1} style={{ fontSize: rem(60) }}>
              {data.expand.groupInfo.avatar.emoji}
            </Title>
          </Avatar>
        </Center>

        {selectedTab === TabType.Transactions && (
          <Stack h={rem(120)}>
            <EditGroupModal
              groupInfo={data.expand.groupInfo}
              button={
                <Stack gap={rem(3)}>
                  <Center>
                    <Title order={3}>{data.expand.groupInfo.name}</Title>
                  </Center>
                  <Center>
                    <Text>{data.expand.groupInfo.description}</Text>
                  </Center>
                </Stack>
              }
            />
            <Center>
              <ListParticipantsModal groupInfo={data.expand.groupInfo} />
            </Center>
          </Stack>
        )}

        {selectedTab === TabType.Overview && (
          <Stack gap="xs" h={rem(120)} justify="center">
            {netBalance !== null ? (
              <>
                <Center>
                  <Text c="dimmed">Your balance</Text>
                </Center>
                <Center>
                  <Title
                    order={2}
                    c={netBalance > 0 ? "green" : netBalance < 0 ? "red" : "dimmed"}
                  >
                    <EuroNumberFormatter value={Math.abs(netBalance)} />
                  </Title>
                </Center>
                <Center>
                  <Text size="sm" c="dimmed">
                    {netBalance > 0
                      ? "you are owed"
                      : netBalance < 0
                      ? "you owe"
                      : "all settled"}
                  </Text>
                </Center>
              </>
            ) : (
              <>
                <Center>
                  <Text c="dimmed">Debts</Text>
                </Center>
              </>
            )}
          </Stack>
        )}

        {selectedTab === TabType.TotalSpending && (
          <Stack gap="xs" h={rem(120)} justify="center">
            <Center>
              <Text c="dimmed">Total Spending</Text>
            </Center>
            <Center>
              <Title order={2}>
                <EuroNumberFormatter value={data.sumExpenses ?? 0} />
              </Title>
            </Center>
          </Stack>
        )}
      </Stack>
    );
  }
};

export default TopSummary;
