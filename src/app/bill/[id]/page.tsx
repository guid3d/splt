"use client";

import {
  Avatar,
  AvatarGroup,
  Center,
  Container,
  NavLink,
  NumberFormatter,
  SegmentedControl,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React, { useState } from "react";
import Tab, { TabType } from "./components/Tab";
import { IconChevronRight } from "@tabler/icons-react";
import TopSummary from "./components/TopSummary";
import TabOverview from "./components/TabOverview";
import TabTransactions from "./components/TabTransactions";
import { SPLTIconSmall } from "@/components/SPLTIcon";
import { BillData, PaymentMethodType, TransactionsData } from "@/types";
import AddTransactionModal from "@/components/AddTransactionModal";

const billData: BillData = {
  avatar: "🐔",
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
      from: { name: "Sarah", avatar: "👩🏻‍💼" },
      to: { name: "John", avatar: "🧑🏻‍💻" },
      amount: 340.94,
    },
    {
      from: { name: "John", avatar: "🧑🏻‍💻" },
      to: { name: "Adam", avatar: "👩🏻‍🎤" },
      amount: 33.5,
    },
    {
      from: { name: "Tim", avatar: "🐶" },
      to: { name: "John", avatar: "🧑🏻‍💻" },
      amount: 46.0,
    },
  ],
};

const transactionsData: TransactionsData[] = [
  {
    type: "expense",
    avatar: "🛫",
    amount: 340.94,
    name: "Plane Ticket",
    date: 1703274759246,
    description: "Qatar Airways",
    category: "Transportation",
  },
  {
    type: "expense",
    avatar: "🏨",
    amount: 93.5,
    name: "Hotel in San Francisco",
    date: 1703274759246,
    description: "Holiday Inn",
    category: "Accomodation",
  },
  {
    type: "expense",
    avatar: "🏨",
    amount: 49,
    name: "Panda Express",
    date: 1703274759246,
    description: "Dinner",
    category: "Food",
  },
  {
    type: "payback",
    from: { name: "Sarah", avatar: "👩🏻‍💼" },
    to: { name: "John", avatar: "🧑🏻‍💻" },
    amount: 340.94,
    date: 1703274999999,
  },
];

const BillPage = () => {
  const [selectedTab, setSelectedTab] = useState(TabType.Transactions);

  return (
    <>
      <Container size="xs" mt="md">
        <SPLTIconSmall />
        <Stack>
          <Center>
            <TopSummary billData={billData} selectedTab={selectedTab} />
          </Center>
          <Center>
            <Tab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          </Center>
          {selectedTab === "overview" && <TabOverview billData={billData} />}
          {selectedTab === "transactions" && (
            <TabTransactions billTransactionData={transactionsData} />
          )}
        </Stack>
      </Container>
      <AddTransactionModal billData={billData} />
    </>
  );
};

export default BillPage;