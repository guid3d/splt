"use client";

import {
  Stack,
  Center,
  Container,
  Title,
  Text,
  Group,
  Avatar,
  Button,
  Menu,
  Skeleton,
  rem,
} from "@mantine/core";
import AddGroupModal from "@/components/AddGroupModal";
import { SPLTIconBig } from "@/components/SPLTIcon";
import { useLocalStorage } from "@mantine/hooks";
import { GroupData } from "@/types";
import GroupHistoryList from "./components/GroupHistoryList";
import MadeWithLove from "@/components/MadeWithLove";
import LoginModal from "@/components/LoginModal";
import { useAuth } from "@/providers/AuthProvider";
import { useServerGroupHistory } from "@/api";
import { IconUser, IconLogout } from "@tabler/icons-react";

const HomePage = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [localHistory] = useLocalStorage({
    key: "splt-group-history",
    defaultValue: [] as string[],
  });
  const serverHistory = useServerGroupHistory();

  // Build the list to display: server history when logged in, localStorage otherwise
  const historyGroups: GroupData[] = isAuthenticated
    ? (serverHistory.data ?? [])
        .filter((item) => item.expand?.groupId)
        .map((item) => item.expand.groupId)
    : localHistory.map((g) => JSON.parse(g) as GroupData);

  const historyLoading = isAuthenticated && serverHistory.isPending;

  return (
    <>
      <Container size="xs">
        <Stack gap="xs">
          <Group justify="space-between" align="center">
            <SPLTIconBig />
            {isAuthenticated && currentUser ? (
              <Menu shadow="md" width={160}>
                <Menu.Target>
                  <Avatar
                    style={{ cursor: "pointer" }}
                    variant="light"
                    radius="xl"
                    size="md"
                    title={currentUser.username}
                  >
                    {currentUser.username?.charAt(0).toUpperCase() ?? (
                      <IconUser size={16} />
                    )}
                  </Avatar>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>{currentUser.username}</Menu.Label>
                  <Menu.Divider />
                  <Menu.Item
                    leftSection={<IconLogout size={14} />}
                    onClick={logout}
                    color="red"
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <LoginModal
                button={
                  <Button variant="light" size="xs">
                    Login
                  </Button>
                }
              />
            )}
          </Group>
          <Title order={5}>
            {isAuthenticated ? "Your Groups" : "Recently Visited Groups"}
          </Title>
          <Stack mb={100} gap="xs">
            {historyLoading ? (
              <>
                <Skeleton height={rem(60)} radius="md" />
                <Skeleton height={rem(60)} radius="md" />
              </>
            ) : historyGroups.length > 0 ? (
              historyGroups.map((group) => (
                <GroupHistoryList key={group.id} group={group} />
              ))
            ) : (
              <Center p="lg">
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
