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
import { useTransactions } from "@/api";
import { useParams } from "next/navigation";

type TabTransactionsProps = {
  // groupTransactionData: TransactionsData[];
};

const TabTransactions = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isPending, error } = useTransactions(id);
  // console.log(data);
  if (data) {
    return (
      <>
        <Text fw={500}>Transactions</Text>
        <Stack mb={100} gap="xs">
          {data.items.map((trans, index) =>
            trans.type === "expense" ? (
              <NavLink
                key={index}
                label={trans.expand.expenseTransaction?.name}
                description={DateToCalendar({
                  date: trans.transactionDateTime,
                })}
                leftSection={
                  <Avatar>
                    <Title order={3}>
                      {trans.expand.expenseTransaction?.avatar.emoji}
                    </Title>
                  </Avatar>
                }
                rightSection={
                  <Title order={5}>
                    <NumberFormatter
                      suffix=" €"
                      value={trans.expand.expenseTransaction?.amount}
                      thousandSeparator="."
                      decimalSeparator=","
                    />
                  </Title>
                }
              ></NavLink>
            ) : trans.type === "payback" ? (
              <NavLink
                key={index}
                label={`${trans.expand.paybackTransaction?.expand.fromPerson.name} → ${trans.expand.paybackTransaction?.expand.toPerson.name}`}
                description={DateToCalendar({
                  date: trans.transactionDateTime,
                })}
                leftSection={
                  <Avatar>
                    <Title style={{ transform: "translate(2px)" }} order={4}>
                      {
                        trans.expand.paybackTransaction?.expand.fromPerson
                          .avatar.emoji
                      }
                    </Title>
                    <Title style={{ transform: "translate(-2px)" }} order={4}>
                      {
                        trans.expand.paybackTransaction?.expand.toPerson.avatar
                          .emoji
                      }
                    </Title>
                  </Avatar>
                }
                rightSection={
                  <Title order={5}>
                    <NumberFormatter
                      suffix=" €"
                      value={trans.expand.paybackTransaction?.amount}
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
  }
};
export default TabTransactions;
