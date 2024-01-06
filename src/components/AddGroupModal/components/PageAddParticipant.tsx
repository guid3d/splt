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
import { GroupFormValues, Participant, StoreEmojiData } from "@/types";
import { IconPlus } from "@tabler/icons-react";
import AddParticipantModal from "@/components/AddParticipantModal";
import ParticipantAvatar from "@/components/ParticipantAvatar";

type PageAddParticipantProps = {
  form: UseFormReturnType<GroupFormValues>;
  participants: Participant[];
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
};

const PageAddParticipant = ({
  form,
  participants,
  setParticipants,
}: PageAddParticipantProps) => {
  return (
    <>
      <Container pb={40}>
        <Stack gap={"xl"}>
          <Stack gap={"xs"}>
            <Center>
              <Text fw={500}>Participants</Text>
            </Center>
            {form.errors.participants && (
              <Center>
                <Text c="red" size="sm">
                  {form.errors.participants}
                </Text>
              </Center>
            )}
          </Stack>
          <Center>
            <ScrollArea.Autosize mah={400}>
              <SimpleGrid cols={3}>
                {participants.map((participant, index) => (
                  <ParticipantAvatar
                    key={index}
                    avatar={participant.avatar}
                    name={participant.name}
                  />
                ))}
                <AddParticipantModal
                  participants={participants}
                  setParticipants={setParticipants}
                  disabledPreferredPaymentMethod={true}
                />
              </SimpleGrid>
            </ScrollArea.Autosize>
          </Center>
        </Stack>
      </Container>
    </>
  );
};

export default PageAddParticipant;
