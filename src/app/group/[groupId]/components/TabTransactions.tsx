import {
  Avatar,
  Center,
  Group,
  Indicator,
  NavLink,
  Skeleton,
  Stack,
  Text,
  Title,
  rem,
  useMantineColorScheme,
} from "@mantine/core";
import { TotalSpendData } from "@/types";
import { DateToCalendar } from "@/utils/date";
import { useTransactions } from "@/api";
import { useParams, useRouter } from "next/navigation";
import { EuroNumberFormatter } from "@/components/NumberFormatter";
import AddEditTransactionModal from "@/components/AddEditTransactionModal";
import { UseQueryResult } from "@tanstack/react-query";

type TabTransactionsProps = {
  groupData: UseQueryResult<TotalSpendData, Error>;
  // groupTransactionData: TransactionsData[];
};

const TabTransactions = ({ groupData }: TabTransactionsProps) => {
  const { colorScheme } = useMantineColorScheme();
  const router = useRouter();
  const { groupId } = useParams<{ groupId: string }>();
  const { data, isPending, error } = useTransactions(groupId);
  if (isPending) {
    return (
      <Stack>
        <Skeleton height={rem(50)} radius="md" my={rem(10)} />
        <Skeleton height={rem(30)} radius="md" />
        <Skeleton height={rem(30)} radius="md" />
        <Skeleton height={rem(30)} radius="md" />
        <Skeleton height={rem(30)} radius="md" />
      </Stack>
    );
  }
  if (data) {
    console.log(data);
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
            <AddEditTransactionModal
              groupData={groupData.data.expand.groupInfo}
              button={
                <Text fw={600} c="blue">
                  Add
                </Text>
              }
            />
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
                    <Indicator
                      color={colorScheme === "dark" ? "dark.8" : "gray.4"}
                      offset={3}
                      position="bottom-end"
                      size={22}
                      // withBorder
                      label={
                        <Text size="xs">
                          {trans.expand.paidBy.avatar.emoji}
                        </Text>
                      }
                    >
                      <Avatar>
                        <Title order={2}>{trans.avatar.emoji}</Title>
                      </Avatar>
                    </Indicator>
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
