import {
  ActionIcon,
  Avatar,
  AvatarGroup,
  Center,
  Modal,
  NavLink,
  ScrollArea,
  Skeleton,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { useParams } from "next/navigation";
import { useTransactions } from "@/api";
import { EuroNumberFormatter } from "@/components/NumberFormatter";
import { ExpenseTransactionData, Participant, TotalSpendData } from "@/types";
import { UseQueryResult } from "@tanstack/react-query";
import { useDisclosure, useMediaQuery, useViewportSize } from "@mantine/hooks";
import UserAvatar from "@/components/UserAvatar";
import { useState } from "react";
import { IconChevronLeft } from "@tabler/icons-react";
import { DateToCalendar } from "@/utils/date";

type TabTotalSpendingProps = {
  groupData: UseQueryResult<TotalSpendData, Error>;
  localUserId?: string | null;
};

type SelectedPerson = {
  participant: Participant;
  expenses: ExpenseTransactionData[];
  total: number;
};

const MAX_AVATARS = 5;

const TabTotalSpending = ({ groupData, localUserId }: TabTotalSpendingProps) => {
  const { groupId } = useParams<{ groupId: string }>();
  const { data, isPending } = useTransactions(groupId);
  const [opened, { open, close }] = useDisclosure(false);
  const [selected, setSelected] = useState<SelectedPerson | null>(null);
  const isMobile = useMediaQuery("(max-width: 50em)") || false;
  const { height } = useViewportSize();
  const modalHeight = isMobile ? rem(height - 100) : rem(500);

  const handleOpen = (person: SelectedPerson) => {
    setSelected(person);
    open();
  };

  if (isPending || groupData.isPending) {
    return (
      <Stack>
        <Skeleton height={rem(50)} radius="md" my={rem(10)} />
        <Skeleton height={rem(30)} radius="md" />
        <Skeleton height={rem(30)} radius="md" />
        <Skeleton height={rem(30)} radius="md" />
      </Stack>
    );
  }

  if (data && groupData.data) {
    const participants = groupData.data.expand.groupInfo.expand.participants;

    const expensesByPayer: Record<string, ExpenseTransactionData[]> = {};
    const totals: Record<string, number> = {};

    data.transactions
      .filter((t) => t.collectionName === "expenses")
      .forEach((t) => {
        const expense = t as ExpenseTransactionData;
        const id = expense.expand.paidBy.id!;
        totals[id] = (totals[id] ?? 0) + expense.amount;
        expensesByPayer[id] = [...(expensesByPayer[id] ?? []), expense];
      });

    const rows = participants
      .map((p: Participant) => ({
        participant: p,
        total: totals[p.id!] ?? 0,
        expenses: expensesByPayer[p.id!] ?? [],
      }))
      .sort((a, b) => {
        if (a.participant.id === localUserId) return -1;
        if (b.participant.id === localUserId) return 1;
        return b.total - a.total;
      });

    return (
      <>
        <Modal.Root
          opened={opened}
          onClose={close}
          fullScreen={isMobile}
          transitionProps={{ transition: "pop", duration: 200 }}
          centered
        >
          <Modal.Overlay />
          <Modal.Content radius={isMobile ? 0 : "lg"}>
            <Modal.Header>
              <ActionIcon variant="transparent" color="gray" onClick={close}>
                <IconChevronLeft style={{ width: "70%", height: "70%" }} stroke={1.5} />
              </ActionIcon>
            </Modal.Header>
            <Modal.Body>
              {selected && (
                <ScrollArea h={modalHeight}>
                <Stack>
                  <Center>
                    <Stack gap={rem(4)} align="center">
                      <UserAvatar size="lg">
                        <Title order={2}>{selected.participant.avatar.emoji}</Title>
                      </UserAvatar>
                      <Text fw={600}>{selected.participant.name}</Text>
                      <Text size="sm" c="dimmed">
                        <EuroNumberFormatter value={selected.total} /> paid
                      </Text>
                    </Stack>
                  </Center>
                  <Stack gap="xs" mt="sm">
                    {selected.expenses.length === 0 ? (
                      <Center p="lg">
                        <Text c="dimmed" size="sm">No transaction</Text>
                      </Center>
                    ) : (
                      selected.expenses
                        .sort((a, b) => Date.parse(b.transactionDateTime) - Date.parse(a.transactionDateTime))
                        .map((e) => (
                          <NavLink
                            key={e.id}
                            label={e.name}
                            description={DateToCalendar({ date: e.transactionDateTime })}
                            leftSection={
                              <Avatar size="sm" radius="xl">
                                {e.avatar.emoji}
                              </Avatar>
                            }
                            rightSection={
                              <Text fw={500} size="sm">
                                <EuroNumberFormatter value={e.amount} />
                              </Text>
                            }
                            style={{ pointerEvents: "none" }}
                          />
                        ))
                    )}
                  </Stack>
                </Stack>
                </ScrollArea>
              )}
            </Modal.Body>
          </Modal.Content>
        </Modal.Root>

        <Text fw={500}>Spending</Text>
        <Stack mb={100} gap="xs">
          {rows.map(({ participant, total, expenses }) => (
            <NavLink
              key={participant.id}
              label={participant.name}
              description={<EuroNumberFormatter value={total} />}
              leftSection={
                <UserAvatar size="md">
                  <Title order={3}>{participant.avatar.emoji}</Title>
                </UserAvatar>
              }
              rightSection={
                expenses.length > 0 ? (
                  <AvatarGroup spacing="xs">
                    {expenses.slice(0, MAX_AVATARS).map((e) => (
                      <Avatar key={e.id} size="sm" radius="xl">
                        {e.avatar.emoji}
                      </Avatar>
                    ))}
                    {expenses.length > MAX_AVATARS && (
                      <Avatar size="sm" radius="xl">
                        +{expenses.length - MAX_AVATARS}
                      </Avatar>
                    )}
                  </AvatarGroup>
                ) : null
              }
              fw={participant.id === localUserId ? 700 : 400}
              onClick={() => handleOpen({ participant, total, expenses })}
            />
          ))}
          {rows.length === 0 && (
            <Center p="lg">
              <Text c="dimmed" size="sm">
                No spending yet
              </Text>
            </Center>
          )}
        </Stack>
      </>
    );
  }
};

export default TabTotalSpending;
