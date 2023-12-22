"use client";

import {
  Box,
  Stack,
  Center,
  rem,
  Container,
  Title,
  NavLink,
  Text,
  Affix,
  ActionIcon,
} from "@mantine/core";
import React from "react";
import {
  IconReportMoney,
  IconChevronRight,
  IconArrowUp,
  IconPlus,
} from "@tabler/icons-react";
import AddBillModal from "@/components/AddBillModal";
import { SPLTIconBig } from "@/components/SPLTIcon";
import { useRouter } from "next/navigation";
// import AddBillModal from "@/components/AddBillModal";

const recentlyVisited = [
  { id: "xyz", name: "Bill 1", numPeople: 3, icon: "🍕" },
  { id: "abc", name: "Bill 2", numPeople: 2, icon: "🍔" },
  { id: "def", name: "Bill 3", numPeople: 1, icon: "🍟" },
  { id: "ghi", name: "Bill 4", numPeople: 4, icon: "🌭" },
  { id: "jkl", name: "Bill 5", numPeople: 5, icon: "🍿" },
];

const HomePage = () => {
  const router = useRouter();
  return (
    //TODO: Add app shell here
    <>
      <Container size="xs">
        <Stack gap="xs">
          <Center>
            <SPLTIconBig />
          </Center>
          <Title order={5}>Recent Visited Bill</Title>
          <Stack mb={100} gap="xs">
            {recentlyVisited.map((bill) => (
              <NavLink
                key={bill.id}
                // href="#required-for-focus"
                label={bill.name}
                leftSection={<Text>{bill.icon}</Text>}
                rightSection={
                  <IconChevronRight
                    size="0.8rem"
                    stroke={1.5}
                    className="mantine-rotate-rtl"
                  />
                }
                onClick={() => {
                  router.push(`/bill/${bill.id}`);
                }}
              ></NavLink>
            ))}
          </Stack>
        </Stack>
      </Container>
      <AddBillModal />
    </>
  );
};

export default HomePage;
