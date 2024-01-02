import {
  ActionIcon,
  Avatar,
  AvatarGroup,
  Center,
  NumberFormatter,
  Stack,
  Text,
  Title,
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

type TopSummaryProps = {
  groupData: UseQueryResult<TotalSpendData, Error>;
  selectedTab: string;
};

const TopSummary = ({ selectedTab, groupData }: TopSummaryProps) => {
  const { data, isLoading, error } = groupData;
  if (data) {
    return (
      <Stack gap="xs">
        <Center>
          <ActionIcon
            disabled
            variant="default"
            size={rem(100)}
            radius={rem(100)}
          >
            <Title order={1} style={{ fontSize: rem(60) }}>
              {data.expand.groupInfo.avatar.emoji}
            </Title>
          </ActionIcon>
        </Center>
        {selectedTab === TabType.Transactions && (
          <Stack gap="xs" h={rem(120)}>
            <Center>
              <Title order={3}>{data.expand.groupInfo.name}</Title>
            </Center>
            <Center>
              <Text>{data.expand.groupInfo.description}</Text>
            </Center>
            <Center>
              <AvatarGroup>
                {data.expand.groupInfo.expand.participants.map(
                  (participant, index) => (
                    <Avatar key={index}>
                      <Title order={2}>{participant.avatar.emoji}</Title>
                    </Avatar>
                  )
                )}
                <Avatar>
                  <IconPencil
                    style={{ width: "70%", height: "70%" }}
                    stroke={1.5}
                  />
                </Avatar>
              </AvatarGroup>
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
                <NumberFormatter
                  suffix=" €"
                  value={data.sumExpenses ? data.sumExpenses : 0}
                  thousandSeparator="."
                  decimalSeparator=","
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
