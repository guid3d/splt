import {
  Avatar,
  AvatarGroup,
  Center,
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
        {data.transactions.length === 0 ? (
          <Center
            p="lg"
            // c="dimmed" style={{ border: "1px dashed" }}
          >
            <Text c="dimmed" size="sm">
              Press + to add transaction
            </Text>
          </Center>
        ) : (
          <Stack mb={100} gap="xs">
            {data.transactions.map((trans, index) =>
              trans.collectionName === "expenses" ? (
                <NavLink
                  key={index}
                  label={trans.name}
                  description={DateToCalendar({
                    date: trans.transactionDateTime,
                  })}
                  leftSection={
                    <Avatar>
                      <Title order={3}>{trans.avatar.emoji}</Title>
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
              ) : trans.collectionName === "paybacks" ? (
                <NavLink
                  key={index}
                  label={`${trans.expand.fromPerson.name} → ${trans.expand.toPerson.name}`}
                  description={DateToCalendar({
                    date: trans.transactionDateTime,
                  })}
                  leftSection={
                    <Avatar>
                      <Title style={{ transform: "translate(2px)" }} order={4}>
                        {trans.expand.fromPerson.avatar.emoji}
                      </Title>
                      <Title style={{ transform: "translate(-2px)" }} order={4}>
                        {trans.expand.toPerson.avatar.emoji}
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
        )}
      </>
    );
  }
};
export default TabTransactions;
