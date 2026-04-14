"use client";

import {
  Stack,
  Center, Container,
  Title, Text, Group
} from "@mantine/core";
import AddGroupModal from "@/components/AddGroupModal";
import { SPLTIconBig } from "@/components/SPLTIcon";
import { useLocalStorage } from "@mantine/hooks";
import { GroupData } from "@/types";
import GroupHistoryList from "./components/GroupHistoryList";
import MadeWithLove from "@/components/MadeWithLove";
import ToggleDarkLightMode from "@/components/ToggleDarkLightMode";
import LoginModal from "@/components/LoginModal";

// const recentlyVisited = [
//   { id: "xyz", name: "Group 1", numPeople: 3, icon: "🍕" },
//   { id: "abc", name: "Group 2", numPeople: 2, icon: "🍔" },
//   { id: "def", name: "Group 3", numPeople: 1, icon: "🍟" },
//   { id: "ghi", name: "Group 4", numPeople: 4, icon: "🌭" },
//   { id: "jkl", name: "Group 5", numPeople: 5, icon: "🍿" },
// ];

const HomePage = () => {
  const [recentlyVisited, setRecentlyVisited] = useLocalStorage({
    key: "splt-group-history",
    defaultValue: [] as string[],
  });
  return (
    //TODO: Add app shell here
    <>
      <Container size="xs">
        <Stack gap="xs">
          <Group justify="space-between" mt="md">
            <SPLTIconBig />
            <Group gap="xs">
              <ToggleDarkLightMode />
              <LoginModal />
            </Group>
          </Group>
          <Title order={5}>Recent Visited Groups</Title>
          <Stack mb={100} gap="xs">
            {recentlyVisited.length > 0 ? (
              recentlyVisited.map((group) => {
                const parsedGroup: GroupData = JSON.parse(group);
                return (
                  <GroupHistoryList key={parsedGroup.id} group={parsedGroup} />
                );
              })
            ) : (
              <Center
                p="lg"
                // c="dimmed" style={{ border: "1px dashed" }}
              >
                <Text c="dimmed" size="sm">
                  Press + to create new group
                </Text>
              </Center>
            )}
          </Stack>
        </Stack>
        <MadeWithLove />
      </Container>
      <AddGroupModal />
    </>
  );
};

export default HomePage;
