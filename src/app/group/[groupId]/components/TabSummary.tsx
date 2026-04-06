import {
  Avatar,
  Center,
  NavLink,
  NumberFormatter,
  Skeleton,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { useParams } from "next/navigation";
import { useDebts, useTotalSpend } from "@/api";
import { Participant } from "@/types";

const TabSummary = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { data: debts, isPending: debtsPending } = useDebts(groupId);
  const { data: totalSpendData, isPending: groupPending } =
    useTotalSpend(groupId);

  if (debtsPending || groupPending) {
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

  if (!debts || !totalSpendData) return null;

  const participants =
    totalSpendData.expand.groupInfo.expand?.participants ?? [];

  // Compute net balance per participant from simplified debts
  // positive net = this person is owed money
  // negative net = this person owes money
  const balanceMap = new Map<
    string,
    { participant: Participant; net: number }
  >();

  participants.forEach((p) => {
    balanceMap.set(p.id!, { participant: p, net: 0 });
  });

  debts.forEach((debt) => {
    const fromEntry = balanceMap.get(debt.fromPerson.id!);
    if (fromEntry) fromEntry.net -= debt.amount;

    const toEntry = balanceMap.get(debt.toPerson.id!);
    if (toEntry) toEntry.net += debt.amount;
  });

  const sorted = [...balanceMap.values()].sort((a, b) => b.net - a.net);

  const isSettled = sorted.every((e) => Math.abs(e.net) < 0.01);

  return (
    <>
      <Text fw={500}>Balance per Person</Text>
      <Stack mb={100} gap="xs">
        {sorted.length === 0 ? (
          <Center p="lg">
            <Text c="dimmed" size="sm">
              No participants
            </Text>
          </Center>
        ) : isSettled ? (
          <Center p="lg">
            <Text c="dimmed" size="sm">
              All settled up
            </Text>
          </Center>
        ) : (
          sorted.map(({ participant, net }) => {
            const isOwed = net > 0.01;
            const isOwes = net < -0.01;
            const color = isOwed ? "green" : isOwes ? "red" : "dimmed";

            return (
              <NavLink
                key={participant.id}
                label={participant.name}
                leftSection={
                  <Avatar size={rem(40)} radius={rem(40)}>
                    <Title order={3}>{participant.avatar.emoji}</Title>
                  </Avatar>
                }
                rightSection={
                  <Text fw={600} c={color} size="sm">
                    {isOwed || (!isOwed && !isOwes) ? (
                      <NumberFormatter
                        prefix={isOwed ? "+ " : ""}
                        suffix=" €"
                        value={Math.abs(net)}
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={2}
                        fixedDecimalScale
                      />
                    ) : (
                      <NumberFormatter
                        prefix="- "
                        suffix=" €"
                        value={Math.abs(net)}
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={2}
                        fixedDecimalScale
                      />
                    )}
                  </Text>
                }
                styles={{ root: { borderRadius: rem(8) } }}
              />
            );
          })
        )}
      </Stack>
    </>
  );
};

export default TabSummary;
