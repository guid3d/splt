"use client";
import { Center, Container, Group, Stack } from "@mantine/core";
import { useMemo, useState } from "react";
import Tab, { TabType } from "./components/Tab";
import TopSummary from "./components/TopSummary";
import TabOverview from "./components/TabOverview";
import TabTransactions from "./components/TabTransactions";
import { SPLTIconSmall } from "@/components/SPLTIcon";
import { useParams } from "next/navigation";
import { useTotalSpend } from "@/api";
import MadeWithLove from "@/components/MadeWithLove";
import Metadata from "@/components/Metadata";
import { useLocalStorage } from "@mantine/hooks";
import UserSelectionModal from "@/components/UserSelectionModal";
import UserDropdown from "@/components/UserDropdown";

const GroupPage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const groupData = useTotalSpend(groupId);
  const [selectedTab, setSelectedTab] = useState(TabType.Transactions);

  const [localUserId, setLocalUserId] = useLocalStorage<string | null>({
    key: `splt-local-user-${groupId}`,
    defaultValue: null,
  });

  const participants = groupData.data?.expand.groupInfo.expand.participants ?? [];

  const currentUser = useMemo(
    () => participants.find((p) => p.id === localUserId) ?? null,
    [participants, localUserId]
  );

  const selectionModalOpen = !groupData.isPending && participants.length > 0 && !localUserId;

  return (
    <>
      {groupData.data && (
        <Metadata
          seoTitle={`${groupData.data?.expand.groupInfo.name} -- SPLT`}
          seoDescription={`${groupData.data?.expand.groupInfo.avatar.emoji} ${groupData.data?.expand.groupInfo.description}`}
        />
      )}
      <UserSelectionModal
        opened={!!selectionModalOpen}
        participants={participants}
        onSelect={setLocalUserId}
      />
      <Container size="xs" mt="md">
        <Group justify="space-between">
          <SPLTIconSmall />
          <UserDropdown
            currentUser={currentUser}
            participants={participants}
            onSelectUser={setLocalUserId}
          />
        </Group>
        <Stack mb={100}>
          <Center>
            <TopSummary selectedTab={selectedTab} groupData={groupData} />
          </Center>
          <Center>
            <Tab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          </Center>
          {selectedTab === TabType.Overview && <TabOverview />}
          {selectedTab === TabType.Transactions && (
            <TabTransactions groupData={groupData} />
          )}
        </Stack>
        <MadeWithLove />
      </Container>
    </>
  );
};

export default GroupPage;
