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
import { TransactionsData } from "@/types";
import { DatesProvider } from "@mantine/dates";
import { DateToCalendar } from "@/utils/date";

type TabTransactionsProps = {
  groupTransactionData: TransactionsData[];
};

const TabTransactions = ({ groupTransactionData }: TabTransactionsProps) => {
  return (
    <>
      <Text fw={500}>Transactions</Text>
      <Stack mb={100} gap="xs">
        {groupTransactionData.map((trans, index) =>
          trans.type === "expense" ? (
            <NavLink
              key={index}
              label={trans.name}
              description={DateToCalendar({ date: trans.date })}
              leftSection={
                <Avatar>
                  <Title order={3}>{trans.avatar}</Title>
                </Avatar>
              }
              rightSection={
                <Title order={5}>
                  <NumberFormatter
                    suffix=" €"
                    value={trans.amount}
                    thousandSeparator="."
                    decimalSeparator=","
                  />
                </Title>
              }
            ></NavLink>
          ) : trans.type === "payback" ? (
            <NavLink
              key={index}
              label={`${trans.from.name} → ${trans.to.name}`}
              description={DateToCalendar({ date: trans.date })}
              leftSection={
                <Avatar>
                  <Title style={{ transform: "translate(2px)" }} order={4}>
                    {trans.from.avatar}
                  </Title>
                  <Title style={{ transform: "translate(-2px)" }} order={4}>
                    {trans.to.avatar}
                  </Title>
                </Avatar>
              }
              rightSection={
                <Title order={5}>
                  <NumberFormatter
                    suffix=" €"
                    value={trans.amount}
                    thousandSeparator="."
                    decimalSeparator=","
                  />
                </Title>
              }
            ></NavLink>
          ) : null
        )}
      </Stack>
    </>
  );
};
export default TabTransactions;
