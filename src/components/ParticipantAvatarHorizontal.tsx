import { StoreEmojiData } from "@/types";
import {
  Avatar,
  Container,
  Group,
  Text,
  Title,
  useComputedColorScheme,
  useMantineTheme,
} from "@mantine/core";
import React from "react";

type ParticipantAvatarProps = {
  avatar: StoreEmojiData;
  name: string;
  isSelected?: boolean;
  description?: React.ReactNode;
};

const ParticipantAvatarHorizontal = ({
  avatar,
  name,
  isSelected,
  description,
}: ParticipantAvatarProps) => {
  const theme = useMantineTheme();
  const computedColorScheme = useComputedColorScheme();

  const renderColor = () => {
    if (isSelected) {
      if (computedColorScheme === "dark") {
        return theme.colors.dark[4];
      }
      return theme.colors.gray[3];
    }
    return "";
  };

  return (
    <Container
      bg={renderColor()}
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
        {description}
      </Group>
    </Container>
  );
};

export default ParticipantAvatarHorizontal;
