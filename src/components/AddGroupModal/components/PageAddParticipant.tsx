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
};

const PageAddParticipant = ({ form }: PageAddParticipantProps) => {
  return (
    <>
      <Container pb={40}>
        <Stack gap={"xl"}>
          <Center>
            <Text fw={500}>Participant</Text>
          </Center>
          <Center>
            <ScrollArea.Autosize mah={400}>
              <SimpleGrid cols={3}>
                {form.values.participant.map((participant, index) => (
                  <ParticipantAvatar
                    key={index}
                    avatar={participant.avatar}
                    name={participant.name}
                  />
                ))}
                <AddParticipantModal
                  groupForm={form}
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
