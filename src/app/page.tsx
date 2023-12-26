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
import AddGroupModal from "@/components/AddGroupModal";
import { SPLTIconBig } from "@/components/SPLTIcon";
import { useRouter } from "next/navigation";
// import AddGroupModal from "@/components/AddGroupModal";

const recentlyVisited = [
  { id: "xyz", name: "Group 1", numPeople: 3, icon: "🍕" },
  { id: "abc", name: "Group 2", numPeople: 2, icon: "🍔" },
  { id: "def", name: "Group 3", numPeople: 1, icon: "🍟" },
  { id: "ghi", name: "Group 4", numPeople: 4, icon: "🌭" },
  { id: "jkl", name: "Group 5", numPeople: 5, icon: "🍿" },
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
          <Title order={5}>Recent Visited Group</Title>
          <Stack mb={100} gap="xs">
            {recentlyVisited.map((group) => (
              <NavLink
                key={group.id}
                // href="#required-for-focus"
                label={group.name}
                leftSection={<Text>{group.icon}</Text>}
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
            ))}
          </Stack>
        </Stack>
      </Container>
      <AddGroupModal />
    </>
  );
};

export default HomePage;
