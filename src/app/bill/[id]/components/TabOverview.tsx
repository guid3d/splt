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
import { BillData } from "../page";

type TabOverviewProps = {
  billData: BillData;
};

const TabOverview = ({ billData }: TabOverviewProps) => {
  return (
    <>
      <Text fw={500}>Overview</Text>
      <Stack mb={100} gap="xs">
        {billData.debts.map((bill, index) => (
          <NavLink
            key={index}
            href="#required-for-focus"
            label={`${bill.from.name} → ${bill.to.name}`}
            leftSection={
              <AvatarGroup>
                <Avatar>
                  <Title order={2}>{bill.from.avatar}</Title>
                </Avatar>
                <Avatar>
                  <Title order={2}>{bill.to.avatar}</Title>
                </Avatar>
              </AvatarGroup>
            }
            rightSection={
              <Title order={5}>
                <NumberFormatter
                  prefix="€ "
                  value={bill.amount}
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
