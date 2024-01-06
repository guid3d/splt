"use client";

import { Center, Container, Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import Tab, { TabType } from "./components/Tab";
import { IconChevronRight } from "@tabler/icons-react";
import TopSummary from "./components/TopSummary";
import TabOverview from "./components/TabOverview";
import TabTransactions from "./components/TabTransactions";
import { SPLTIconSmall } from "@/components/SPLTIcon";
import { GroupData, PaymentMethodType, TransactionsData } from "@/types";
import AddTransactionModal from "@/components/AddTransactionModal";
import { useParams } from "next/navigation";
import { useTotalSpend } from "@/api";
import { useLocalStorage } from "@mantine/hooks";

const GroupPage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const groupData = useTotalSpend(groupId);
  const [selectedTab, setSelectedTab] = useState(TabType.Transactions);
  const [value, setValue] = useLocalStorage({
    key: "splt-group-history",
    defaultValue: [] as GroupData[],
  });
  console.log(groupData.data)

  return (
    <>
      <Container size="xs" mt="md">
        <SPLTIconSmall />
        <Stack>
          <Center>
            <TopSummary selectedTab={selectedTab} groupData={groupData} />
          </Center>
          <Center>
            <Tab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          </Center>
          {selectedTab === "overview" && <TabOverview />}
          {selectedTab === "transactions" && <TabTransactions />}
        </Stack>
      </Container>
      {groupData.data && (
        <AddTransactionModal groupData={groupData.data.expand.groupInfo} />
      )}
    </>
  );
};

export default GroupPage;
