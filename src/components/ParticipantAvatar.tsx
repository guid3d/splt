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
} from "@mantine/core";
import React from "react";

type ParticipantAvatarProps = {
  avatar: StoreEmojiData;
  name: string;
  isSelected?: boolean;
};

const ParticipantAvatar = ({
  avatar,
  name,
  isSelected,
}: ParticipantAvatarProps) => {
  return (
    <Container
      bg={isSelected ? "#3b3b3b" : ""}
      pt="md"
      pb="md"
      // p="md"
      style={{
        borderRadius: 20,
        //  width: rem(120)
      }}
    >
      <Stack>
        <Center>
          <Avatar
            size="lg"
            radius="xl"
          >
            <Title order={1}>{avatar.emoji}</Title>
          </Avatar>
        </Center>
        <Center>
          <Text lineClamp={2} ta="center">
            {name}
          </Text>
        </Center>
      </Stack>
    </Container>
  );
};

export default ParticipantAvatar;
