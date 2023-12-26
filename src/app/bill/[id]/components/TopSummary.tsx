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
import { BillData } from "@/types";
import { IconPlus } from "@tabler/icons-react";
import { IconPencil } from "@tabler/icons-react";
import { TabType } from "./Tab";

type TopSummaryProps = {
  billData: BillData;
  selectedTab: string;
};

const TopSummary = ({ billData, selectedTab }: TopSummaryProps) => {
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
            {billData.avatar}
          </Title>
        </ActionIcon>
      </Center>
      {selectedTab === TabType.Transactions && (
        <Stack gap="xs" h={rem(120)}>
          <Center>
            <Title order={3}>{billData.name}</Title>
          </Center>
          <Center>
            <Text>{billData.description}</Text>
          </Center>
          <Center>
            <AvatarGroup>
              {billData.participant.map((participant, index) => (
                <Avatar key={index}>
                  <Title order={2}>{participant.avatar.emoji}</Title>
                </Avatar>
              ))}
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
                value={billData.totalAmount}
                thousandSeparator="."
                decimalSeparator=","
              />
            </Title>
          </Center>
        </Stack>
      )}
    </Stack>
  );
};

export default TopSummary;
