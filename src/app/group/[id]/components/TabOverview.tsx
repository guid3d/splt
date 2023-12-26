import {
  Avatar,
  AvatarGroup,
  NavLink,
  NumberFormatter,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { GroupData } from "@/types";

type TabOverviewProps = {
  groupData: GroupData;
};

const TabOverview = ({ groupData }: TabOverviewProps) => {
  return (
    <>
      <Text fw={500}>Debts</Text>
      <Stack mb={100} gap="xs">
        {groupData.debts.map((group, index) => (
          <NavLink
            key={index}
            // href="#required-for-focus"
            label={`${group.from.name} → ${group.to.name}`}
            leftSection={
              <AvatarGroup>
                <Avatar>
                  <Title order={2}>{group.from.avatar.emoji}</Title>
                </Avatar>
                <Avatar>
                  <Title order={2}>{group.to.avatar.emoji}</Title>
                </Avatar>
              </AvatarGroup>
            }
            rightSection={
              <Title order={5}>
                <NumberFormatter
                  suffix=" €"
                  value={group.amount}
                  thousandSeparator="."
                  decimalSeparator=","
                />
              </Title>
            }
          ></NavLink>
        ))}
      </Stack>
    </>
  );
};
export default TabOverview;
