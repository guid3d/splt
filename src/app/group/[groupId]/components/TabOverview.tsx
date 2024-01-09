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
  if (data) {
    return (
      <>
        <Text fw={500}>Debts</Text>
        <Stack mb={100} gap="xs">
          {data.map((debt, index) => (
            <ViewDebtModal key={index} debt={debt} />
          ))}
        </Stack>
      </>
    );
  }
};
export default TabOverview;
