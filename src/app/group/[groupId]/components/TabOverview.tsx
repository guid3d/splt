import { Center, Skeleton, Stack, Text, rem } from "@mantine/core";
import React from "react";
import { useDebts } from "@/api";
import { useParams } from "next/navigation";
import ViewDebtModal from "@/components/ViewDebtModal";

type TabOverviewProps = {
  localUserId?: string | null;
};

const TabOverview = ({ localUserId }: TabOverviewProps) => {
  const { groupId } = useParams<{ groupId: string }>();
  const { data, isPending } = useDebts(groupId);

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
    const myDebts = localUserId
      ? data.filter((d) => d.fromPerson.id === localUserId)
      : [];
    const owedToMe = localUserId
      ? data.filter((d) => d.toPerson.id === localUserId)
      : [];
    const otherDebts = localUserId
      ? data.filter(
          (d) =>
            d.fromPerson.id !== localUserId && d.toPerson.id !== localUserId
        )
      : data;

    return (
      <>
        <Text fw={500}>Debts</Text>
        <Stack mb={100} gap="xs">
          {data.length === 0 ? (
            <Center p="lg">
              <Text c="dimmed" size="sm">
                No debts
              </Text>
            </Center>
          ) : (
            <>
              {myDebts.map((debt, i) => (
                <ViewDebtModal key={`my-${i}`} debt={debt} />
              ))}
              {owedToMe.map((debt, i) => (
                <ViewDebtModal key={`owed-${i}`} debt={debt} />
              ))}
              {otherDebts.map((debt, i) => (
                <ViewDebtModal key={`other-${i}`} debt={debt} />
              ))}
            </>
          )}
        </Stack>
      </>
    );
  }
};

export default TabOverview;
