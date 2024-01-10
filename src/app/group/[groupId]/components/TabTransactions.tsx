import {
  Avatar,
  AvatarGroup,
  Button,
  Center,
  Group,
  NavLink,
  NumberFormatter,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { GroupData, TotalSpendData, TransactionsData } from "@/types";
import { DatesProvider } from "@mantine/dates";
import { DateToCalendar } from "@/utils/date";
import { useTransactions } from "@/api";
import { useParams, useRouter } from "next/navigation";
import { EuroNumberFormatter } from "@/components/NumberFormatter";
import AddTransactionModal from "@/components/AddTransactionModal";
import { UseQueryResult } from "@tanstack/react-query";

type TabTransactionsProps = {
  groupData: UseQueryResult<TotalSpendData, Error>;
  // groupTransactionData: TransactionsData[];
};

const TabTransactions = ({ groupData }: TabTransactionsProps) => {
  const router = useRouter();
  const { groupId } = useParams<{ groupId: string }>();
  const { data, isPending, error } = useTransactions(groupId);
  if (data) {
    data.transactions.sort((a, b) => {
      return (
        Date.parse(b.transactionDateTime) - Date.parse(a.transactionDateTime)
      );
    });
    return (
      <>
        <Group justify="space-between">
          <Text fw={500}>Transactions</Text>
          {groupData.data && (
            <AddTransactionModal groupData={groupData.data.expand.groupInfo} />
          )}
        </Group>
        {data.transactions?.length === 0 ? (
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
            {data.transactions?.map((trans, index) =>
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
                      <EuroNumberFormatter value={trans.amount} />
                    </Title>
                  }
                  onClick={() =>
                    router.push(
                      `./${trans.groupInfo}/transaction?e=${trans.id}`
                    )
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
                      <EuroNumberFormatter value={trans.amount} />
                    </Title>
                  }
                  onClick={() =>
                    router.push(
                      `./${trans.groupInfo}/transaction?p=${trans.id}`
                    )
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
