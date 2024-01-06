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
import { useDebts } from "@/api";
import { useParams } from "next/navigation";

type TabOverviewProps = {
  // groupData: GroupData;
};

const TabOverview = ({}: TabOverviewProps) => {
  const { groupId } = useParams<{ groupId: string }>();
  const { data, isPending, error } = useDebts(groupId);
  if (data) {
    return (
      <>
        <Text fw={500}>Debts</Text>
        <Stack mb={100} gap="xs">
          {data.map((debt, index) => (
            <NavLink
              key={index}
              // href="#required-for-focus"
              label={`${debt.fromPerson.name} → ${debt.toPerson.name}`}
              leftSection={
                <AvatarGroup>
                  <Avatar>
                    <Title order={2}>{debt.fromPerson.avatar.emoji}</Title>
                  </Avatar>
                  <Avatar>
                    <Title order={2}>{debt.toPerson.avatar.emoji}</Title>
                  </Avatar>
                </AvatarGroup>
              }
              rightSection={
                <Title order={5}>
                  <NumberFormatter
                    suffix=" €"
                    value={debt.amount}
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
  }
};
export default TabOverview;
