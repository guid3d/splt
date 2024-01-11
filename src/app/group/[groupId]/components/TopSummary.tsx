import {
  ActionIcon,
  Avatar,
  AvatarGroup,
  Center,
  NumberFormatter,
  Skeleton,
  Stack,
  Text,
  Title,
  UnstyledButton,
  rem,
} from "@mantine/core";
import React from "react";
import { GroupData, TotalSpendData } from "@/types";
import { IconPlus } from "@tabler/icons-react";
import { IconPencil } from "@tabler/icons-react";
import { TabType } from "./Tab";
import { useParams } from "next/navigation";
// import { useGroup, useTotalSpend } from "@/api";
import { UseQueryResult } from "@tanstack/react-query";
import ListParticipantsModal from "@/components/ListParticipantsModal";
import { EuroNumberFormatter } from "@/components/NumberFormatter";
import EditGroupModal from "./EditGroupModal";

type TopSummaryProps = {
  groupData: UseQueryResult<TotalSpendData, Error>;
  selectedTab: string;
};

const TopSummary = ({ selectedTab, groupData }: TopSummaryProps) => {
  const { data, isPending, error } = groupData;
  if (isPending) {
    return (
      <Stack gap={0}>
        {/* <Center> */}
        <Skeleton height={rem(100)} circle mb="sm" />
        {/* </Center> */}
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
            <Center>
              <Text>Total Spending</Text>
            </Center>
            <Center>
              <Title order={2}>
                <EuroNumberFormatter
                  value={data.sumExpenses ? data.sumExpenses : 0}
                />
              </Title>
            </Center>
          </Stack>
        )}
      </Stack>
    );
  }
};

export default TopSummary;
