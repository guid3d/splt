import { theme } from "@/theme";
import { StoreEmojiData } from "@/types";
import {
  Avatar,
  Center,
  Container,
  Flex,
  Group,
  Input,
  Stack,
  Text,
  Title,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import React from "react";

type ParticipantAvatarProps = {
  avatar: StoreEmojiData;
  name: string;
  isSelected?: boolean;
  description?: React.ReactNode;
  value?: string | number;
  isEditableValue?: boolean;
};

const ParticipantAvatarHorizontal = ({
  avatar,
  name,
  isSelected,
  description,
  value,
  isEditableValue,
}: ParticipantAvatarProps) => {
  const theme = useMantineTheme();
  return (
    <>
      {/* TODO: Handle light and dark mode better */}
      <Container
        lightHidden
        bg={isSelected ? theme.colors.dark[4] : ""}
        p="xs"
        style={{
          borderRadius: 20,
        }}
        w="100%"
      >
        <Group justify="space-between" align="center" gap="xs">
          <Group>
            <Avatar size="md" radius="xl">
              <Title order={4}>{avatar.emoji}</Title>
            </Avatar>
            <Text lineClamp={2} ta="center">
              {name}
            </Text>
          </Group>
          {description && (
            <Text c="dimmed" lineClamp={2} ta="center">
              {description}
            </Text>
          )}
          {isEditableValue && value && (
            <Input
              styles={{
                input: {
                  textAlign: "end",
                  fontSize: rem(16),
                  // height: rem(40),
                  width: rem(60),
                },
              }}
              radius={0}
              variant="unstyled"
              placeholder="part"
              value={value}
            />
          )}
        </Group>
      </Container>
      <Container
        darkHidden
        bg={isSelected ? theme.colors.gray[3] : ""}
        p="xs"
        style={{
          borderRadius: 20,
        }}
        w="100%"
      >
        <Group justify="space-between" align="center" gap="xs">
          <Group>
            <Avatar size="md" radius="xl">
              <Title order={4}>{avatar.emoji}</Title>
            </Avatar>
            <Text lineClamp={2} ta="center">
              {name}
            </Text>
          </Group>
          {description && (
            <Text c="dimmed" lineClamp={2} ta="center">
              {description}
            </Text>
          )}
        </Group>
      </Container>
    </>
  );
};

export default ParticipantAvatarHorizontal;
