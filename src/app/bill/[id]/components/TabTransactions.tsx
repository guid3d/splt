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
import { BillTransactionData } from "../page";

type TabTransactionsProps = {
  billTransactionData: BillTransactionData[];
};

const TabTransactions = ({ billTransactionData }: TabTransactionsProps) => {
  return (
    <>
      <Text fw={500}>Transactions</Text>
      <Stack mb={100} gap="xs">
        {billTransactionData.map((trans, index) => (
          <NavLink
            key={index}
            label={trans.name}
            description={trans.date}
            leftSection={
              <Avatar>
                <Title order={2}>{trans.avatar}</Title>
              </Avatar>
            }
            rightSection={
              <Title order={5}>
                <NumberFormatter
                  prefix="€ "
                  value={trans.amount}
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
export default TabTransactions;
