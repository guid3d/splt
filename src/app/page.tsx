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
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { GroupData } from "@/types";
import GroupHistoryList from "./components/GroupHistoryList";
import MadeWithLove from "@/components/MadeWithLove";
import LoginModal from "@/components/LoginModal";
import EditProfileModal from "@/components/EditProfileModal";
import { useAuth } from "@/providers/AuthProvider";
import { useServerGroupHistory } from "@/api";
import { IconUser, IconLogout, IconPencil } from "@tabler/icons-react";

const HomePage = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [editProfileOpened, { open: openEditProfile, close: closeEditProfile }] = useDisclosure(false);
  const [localHistory] = useLocalStorage({
    key: "splt-group-history",
    defaultValue: [] as string[],
  });
  const serverHistory = useServerGroupHistory();

  const serverGroups: GroupData[] = isAuthenticated
    ? (serverHistory.data ?? [])
        .filter((item) => item.expand?.groupId)
        .map((item) => item.expand.groupId)
    : [];

  const localGroups: GroupData[] = localHistory.map((g) => JSON.parse(g) as GroupData);

  // When logged in: show server groups as primary, local-only groups as "recently visited"
  const serverGroupIds = new Set(serverGroups.map((g) => g.id));
  const localOnlyGroups = isAuthenticated
    ? localGroups.filter((g) => !serverGroupIds.has(g.id))
    : localGroups;

  const historyGroups = isAuthenticated ? serverGroups : localGroups;

  const historyLoading = isAuthenticated && serverHistory.isPending;

  return (
    <>
      <Container size="xs">
        <Stack gap="xs">
          <Group justify="space-between" align="center">
            <div style={{ flex: 1 }} />
            <SPLTIconBig />
            <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            {isAuthenticated && currentUser ? (
              <Menu shadow="md" width={160} radius="lg">
                <Menu.Target>
                  <Avatar
                    style={{ cursor: "pointer" }}
                    variant="light"
                    radius="xl"
                    size="md"
                    title={currentUser.username}
                  >
                    {currentUser.avatar?.emoji ?? currentUser.username?.charAt(0).toUpperCase() ?? (
                      <IconUser size={16} />
                    )}
                  </Avatar>
                </Menu.Target>
                <Menu.Dropdown>
                  {currentUser.name && <Menu.Label>{currentUser.name}</Menu.Label>}
                  <Menu.Label c="dimmed">@{currentUser.username}</Menu.Label>
                  <Menu.Divider />
                  <Menu.Item
                    leftSection={<IconPencil size={14} />}
                    onClick={openEditProfile}
                  >
                    Edit Profile
                  </Menu.Item>
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
            </div>
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
            {isAuthenticated && localOnlyGroups.length > 0 && (
              <>
                <Title order={5} mt="sm">Recently Visited</Title>
                {localOnlyGroups.map((group) => (
                  <GroupHistoryList key={group.id} group={group} />
                ))}
              </>
            )}
          </Stack>
        </Stack>
        <MadeWithLove />
      </Container>
      <AddGroupModal />
      <EditProfileModal opened={editProfileOpened} onClose={closeEditProfile} />
    </>
  );
};

export default HomePage;
