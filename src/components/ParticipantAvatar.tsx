import { theme } from "@/theme";
import { StoreEmojiData } from "@/types";
import {
  Avatar,
  Center,
  Container,
  Stack,
  Text,
  Title,
  rem,
  useMantineTheme,
} from "@mantine/core";
import React from "react";

type ParticipantAvatarProps = {
  avatar: StoreEmojiData;
  name: string;
  isSelected?: boolean;
  description?: React.ReactNode;
};

const ParticipantAvatar = ({
  avatar,
  name,
  isSelected,
  description,
}: ParticipantAvatarProps) => {
  const theme = useMantineTheme();
  return (
    <>
      {/* TODO: Handle light and dark mode better */}
      <Container
        lightHidden
        bg={isSelected ? theme.colors.dark[4] : ""}
        p="sm"
        style={{
          borderRadius: 20,
        }}
        w={rem(95)}
      >
        <Stack gap="xs">
          <Center>
            <Avatar size="lg" radius="xl">
              <Title order={1}>{avatar.emoji}</Title>
            </Avatar>
          </Center>
          <Center>
            <Text lineClamp={2} ta="center">
              {name}
            </Text>
          </Center>
          {description && (
            <Center>
              <Text c="dimmed" lineClamp={2} ta="center">
                {description}
              </Text>
            </Center>
          )}
        </Stack>
      </Container>
      <Container
        darkHidden
        bg={isSelected ? theme.colors.gray[3] : ""}
        p="sm"
        style={{
          borderRadius: 20,
        }}
        w={rem(95)}
      >
        <Stack gap="xs">
          <Center>
            <Avatar size="lg" radius="xl">
              <Title order={1}>{avatar.emoji}</Title>
            </Avatar>
          </Center>
          <Center>
            <Text lineClamp={2} ta="center">
              {name}
            </Text>
          </Center>
          {description && (
            <Center>
              <Text c="dimmed" lineClamp={2} ta="center">
                {description}
              </Text>
            </Center>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default ParticipantAvatar;
