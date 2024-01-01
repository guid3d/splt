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

const transactionsData: TransactionsData[] = [
  {
    type: "expense",
    avatar: { emoji: "🛫", unified: "xxx" },
    amount: 340.94,
    name: "Plane Ticket",
    date: "2023-12-27T16:17:59.769Z",
    description: "Qatar Airways",
    category: "Transportation",
  },
  {
    type: "expense",
    avatar: { emoji: "🏨", unified: "xxx" },
    amount: 93.5,
    name: "Hotel in San Francisco",
    date: "2023-12-27T16:17:59.769Z",
    description: "Holiday Inn",
    category: "Accomodation",
  },
  {
    type: "expense",
    avatar: { emoji: "🍔", unified: "xxx" },
    amount: 49,
    name: "Panda Express",
    date: "2023-12-27T16:17:59.769Z",
    description: "Dinner",
    category: "Food",
  },
  {
    type: "payback",
    from: { name: "Sarah", avatar: "👩🏻‍💼" },
    to: { name: "John", avatar: "🧑🏻‍💻" },
    amount: 340.94,
    date: "2023-12-27T16:17:59.769Z",
  },
];

const GroupPage = () => {
  const { id } = useParams<{ id: string }>();
  const groupData = useTotalSpend(id);
  const [selectedTab, setSelectedTab] = useState(TabType.Transactions);
  const [value, setValue] = useLocalStorage({
    key: "splt-group-history",
    defaultValue: [] as GroupData[],
  });

  if (groupData.data) {
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
            {selectedTab === "transactions" && (
              <TabTransactions groupTransactionData={transactionsData} />
            )}
          </Stack>
        </Container>
        <AddTransactionModal groupData={groupData.data.expand.groupInfo} />
      </>
    );
  }
};

export default GroupPage;
