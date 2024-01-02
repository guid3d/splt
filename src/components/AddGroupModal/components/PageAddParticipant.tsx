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
import { GroupFormValues, StoreEmojiData } from "@/types";
import { IconPlus } from "@tabler/icons-react";
import AddParticipantModal from "@/components/AddParticipantModal";
import ParticipantAvatar from "@/components/ParticipantAvatar";

type PageAddParticipantProps = {
  form: UseFormReturnType<GroupFormValues>;
  participantIds: string[];
  setParticipantIds: React.Dispatch<React.SetStateAction<string[]>>;
};

const PageAddParticipant = ({
  form,
  participantIds,
  setParticipantIds,
}: PageAddParticipantProps) => {
  return (
    <>
      <Container pb={40}>
        <Stack gap={"xl"}>
          <Stack gap={"xs‰"}>
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
                {form.values.participants.map((participant, index) => (
                  <ParticipantAvatar
                    key={index}
                    avatar={participant.avatar}
                    name={participant.name}
                  />
                ))}
                <AddParticipantModal
                  groupForm={form}
                  participantIds={participantIds}
                  setParticipantIds={setParticipantIds}
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
