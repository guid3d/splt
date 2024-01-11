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
import { useMediaQuery, useViewportSize } from "@mantine/hooks";

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
  const { height, width } = useViewportSize();
  const isMobile = useMediaQuery("(max-width: 50em)") || false;
  const modalHeight = isMobile ? rem(height - 100) : rem(500);
  const [confirmSuccess, setConfirmSuccess] = React.useState<boolean>(false);
  return (
    <>
      <Container>
        <ScrollArea h={modalHeight}>
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
            {/* <Center> */}
            <Stack>
              <SimpleGrid cols={3} spacing={0} pb="xl">
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
                  onConfirmClick={() => {
                    setConfirmSuccess(true);
                  }}
                  confirmSuccess={confirmSuccess}
                  setConfirmSuccess={setConfirmSuccess}
                />
              </SimpleGrid>
            </Stack>
            {/* </Center> */}
          </Stack>
        </ScrollArea>
      </Container>
    </>
  );
};

export default PageAddParticipant;
