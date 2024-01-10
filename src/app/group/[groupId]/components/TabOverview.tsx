import {
  Avatar,
  AvatarGroup,
  Center,
  NavLink,
  NumberFormatter,
  Skeleton,
  Stack,
  Text,
  Title,
rem,
} from "@mantine/core";
import React from "react";
import { GroupData } from "@/types";
import { useDebts } from "@/api";
import { useParams } from "next/navigation";
import { EuroNumberFormatter } from "@/components/NumberFormatter";
import ViewDebtModal from "@/components/ViewDebtModal";

type TabOverviewProps = {
  // groupData: GroupData;
};

const TabOverview = ({}: TabOverviewProps) => {
  const { groupId } = useParams<{ groupId: string }>();
  const { data, isPending, error } = useDebts(groupId);
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
    return (
      <>
        <Text fw={500}>Debts</Text>
        <Stack mb={100} gap="xs">
          {data.length > 0 ? (
            data.map((debt, index) => <ViewDebtModal key={index} debt={debt} />)
          ) : (
            <Center
              p="lg"
              // c="dimmed" style={{ border: "1px dashed" }}
            >
              <Text c="dimmed" size="sm">
                No debts
              </Text>
            </Center>
          )}
        </Stack>
      </>
    );
  }
};
export default TabOverview;
