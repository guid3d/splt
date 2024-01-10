import { useGroup } from "@/api";
import { GroupData } from "@/types";
import { NavLink, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

type GroupHistoryListProps = {
  group: GroupData;
};

const GroupHistoryList = ({ group }: GroupHistoryListProps) => {
  const router = useRouter();
  // const { data, isLoading, error } = useGroup(groupId);
  // if (data) {
  return (
    <NavLink
      // href="#required-for-focus"
      label={group.name}
      description={group.description}
      leftSection={<Text>{group.avatar.emoji}</Text>}
      rightSection={
        <IconChevronRight
          size="0.8rem"
          stroke={1.5}
          className="mantine-rotate-rtl"
        />
      }
      onClick={() => {
        router.push(`/group/${group.id}`);
      }}
    ></NavLink>
  );
};

export default GroupHistoryList;
