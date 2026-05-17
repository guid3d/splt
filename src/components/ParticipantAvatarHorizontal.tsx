import { StoreEmojiData } from "@/types";
import {
  Container,
  Group,
  Text,
  Title,
  useComputedColorScheme,
  useMantineTheme,
} from "@mantine/core";
import UserAvatar from "@/components/UserAvatar";
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
        return theme.colors.dark[6];
      }
      return theme.colors.gray[2];
    }
    return "";
  };

  return (
    <Container
      bg={renderColor()}
      p="xs"
      style={{
        borderRadius: 16,
      }}
      w="100%"
    >
      <Group justify="space-between" align="center" gap="xs">
        <Group>
          <UserAvatar size="md">
            <Title order={4}>{avatar.emoji}</Title>
          </UserAvatar>
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
