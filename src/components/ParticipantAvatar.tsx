import { StoreEmojiData } from "@/types";
import {
  Center,
  Container,
  Stack,
  Text,
  Title,
  rem,
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

const ParticipantAvatar = ({
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
      p="sm"
      style={{
        borderRadius: 20,
      }}
      w={rem(95)}
    >
      <Stack gap="xs">
        <Center>
          <UserAvatar size="lg">
            <Title order={1}>{avatar.emoji}</Title>
          </UserAvatar>
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
  );
};

export default ParticipantAvatar;
