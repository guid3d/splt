import {
  ActionIcon,
  Affix,
  Avatar,
  Button,
  Center,
  Container,
  Input,
  Paper,
  ScrollArea,
  SimpleGrid,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import React from "react";
import { useForm, UseFormReturnType } from "@mantine/form";
import { BillFormValues } from "..";
import { IconPlus } from "@tabler/icons-react";

type PageSetParticipantProps = {
  form: UseFormReturnType<BillFormValues>;
};

type ParticipantAvatarProps = {
  avatar: string;
  name: string;
};

const participants = [
  { id: "xxx", name: "You", avatar: "🐥" },
  { id: "xyz", name: "John Fingerlickesdasdsadr", avatar: "🧑🏻‍💻" },
  { id: "zyx", name: "Jenny Fingerliadwdawdcker", avatar: "👩🏻‍🎤" },
  { id: "ss", name: "Jenny Fingerliadwdawdcker", avatar: "👩🏻‍🎤" },
];

const ParticipantAvatar = ({ avatar, name }: ParticipantAvatarProps) => {
  return (
    <Stack>
      <Center>
        <Avatar
          size="lg"
          radius="xl"
          onClick={() => {
            console.log("xx");
          }}
        >
          <Title order={1}>{avatar}</Title>
        </Avatar>
      </Center>
      <Center>
        <Text truncate="end">{name}</Text>
      </Center>
    </Stack>
  );
};

const NewParticipantAvatar = () => {
  return (
    <Stack>
      <Center>
        <Avatar
          size="lg"
          radius="xl"
          onClick={() => {
            console.log("xx");
          }}
        >
          <IconPlus style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </Avatar>
      </Center>
    </Stack>
  );
};

const PageSetParticipant = ({ form }: PageSetParticipantProps) => {
  return (
    <>
      <Container pb={40}>
        <Stack gap={"xl"}>
          <Center>
            <Text fw={500}>Select Participant</Text>
          </Center>
          <Center>
            <ScrollArea.Autosize mah={400}>
              <SimpleGrid cols={3}>
                {participants.map((participant) => (
                  <ParticipantAvatar
                    key={participant.id}
                    avatar={participant.avatar}
                    name={participant.name}
                  />
                ))}
                <NewParticipantAvatar />
              </SimpleGrid>
            </ScrollArea.Autosize>
          </Center>
        </Stack>
      </Container>
    </>
  );
};

export default PageSetParticipant;
