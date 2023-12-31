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
import { useGroup, useTotalSpend } from "@/api";
// import { resultList } from "@/api/pocketbase";
const groupData: GroupData = {
  avatar: { emoji: "🐔", unified: "sss" },
  name: "Trips to Chicken Farm",
  description: "A weekend in Silicon Valley",
  participant: [
    {
      name: "Sarah",
      avatar: { emoji: "👩🏻‍💼", unified: "xxx" },
      accountName: "Sarah Mooler",
      selectedPaymentMethod: PaymentMethodType.Iban,
      paymentMethod: { iban: "DE12345678901234567890", paypal: "" },
    },
    {
      name: "John",
      avatar: { emoji: "🧑🏻‍💻", unified: "xxx" },
      accountName: "John Mooler",
      selectedPaymentMethod: PaymentMethodType.Iban,
      paymentMethod: { iban: "DE12345678901234567890", paypal: "" },
    },
    {
      name: "Adam",
      avatar: { emoji: "👩🏻‍🎤", unified: "xxx" },
      accountName: "Adam Mooler",
      selectedPaymentMethod: PaymentMethodType.Iban,
      paymentMethod: { iban: "DE12345678901234567890", paypal: "" },
    },
    {
      name: "Tim",
      avatar: { emoji: "🐶", unified: "xxx" },
      accountName: "Tim Mooler",
      selectedPaymentMethod: PaymentMethodType.Iban,
      paymentMethod: { iban: "DE12345678901234567890", paypal: "" },
    },
  ],
  totalAmount: 3000.89,
  currency: "EUR",
  debts: [
    {
      from: { name: "Sarah", avatar: { emoji: "👩🏻‍💼", unified: "xxx" } },
      to: { name: "John", avatar: { emoji: "🧑🏻‍💻", unified: "xxx" } },
      amount: 340.94,
    },
    {
      from: { name: "John", avatar: { emoji: "🧑🏻‍💻", unified: "xxx" } },
      to: { name: "Adam", avatar: { emoji: "👩🏻‍🎤", unified: "xxx" } },
      amount: 33.5,
    },
    {
      from: { name: "Tim", avatar: { emoji: "🐶", unified: "xxx" } },
      to: { name: "John", avatar: { emoji: "🧑🏻‍💻", unified: "xxx" } },
      amount: 46.0,
    },
  ],
};

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
  const [selectedTab, setSelectedTab] = useState(TabType.Transactions);
  // const { id } = useParams<{ id: string }>();
  // const { data, isPending, error } = useTotalSpend(id);
  // console.log(data);
  return (
    <>
      <Container size="xs" mt="md">
        <SPLTIconSmall />
        <Stack>
          <Center>
            <TopSummary selectedTab={selectedTab} />
          </Center>
          <Center>
            <Tab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          </Center>
          {selectedTab === "overview" && <TabOverview groupData={groupData} />}
          {selectedTab === "transactions" && (
            <TabTransactions groupTransactionData={transactionsData} />
          )}
        </Stack>
      </Container>
      <AddTransactionModal groupData={groupData} />
    </>
  );
};

export default GroupPage;
