import { useGroup } from "@/api";
import { NavLink, Text } from "@mantine/core";
import {
  IconReportMoney,
  IconChevronRight,
  IconArrowUp,
  IconPlus,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

type GroupHistoryListProps = {
  groupId: string;
};

const GroupHistoryList = ({ groupId }: GroupHistoryListProps) => {
  const router = useRouter();
  const { data, isLoading, error } = useGroup(groupId);
  if (data) {
    return (
      <NavLink
        // href="#required-for-focus"
        label={data.name}
        description={data.description}
        leftSection={<Text>{data.avatar.emoji}</Text>}
        rightSection={
          <IconChevronRight
            size="0.8rem"
            stroke={1.5}
            className="mantine-rotate-rtl"
          />
        }
        onClick={() => {
          router.push(`/group/${groupId}`);
        }}
      ></NavLink>
    );
  }
};

export default GroupHistoryList;
