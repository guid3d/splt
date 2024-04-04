"use client";
import { Center, Container, Stack } from "@mantine/core";
import { useState } from "react";
import Tab, { TabType } from "./components/Tab";
import TopSummary from "./components/TopSummary";
import TabOverview from "./components/TabOverview";
import TabTransactions from "./components/TabTransactions";
import { SPLTIconSmall } from "@/components/SPLTIcon";
import { useParams } from "next/navigation";
import { useTotalSpend } from "@/api";
import MadeWithLove from "@/components/MadeWithLove";

const GroupPage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const groupData = useTotalSpend(groupId);
  const [selectedTab, setSelectedTab] = useState(TabType.Transactions);

  return (
    <>
      <Container size="xs" mt="md">
        <SPLTIconSmall />
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
