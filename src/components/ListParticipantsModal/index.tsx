import {
  ActionIcon,
  Center,
  Title,
  rem,
  Modal as MantineModal,
  Stack,
  Indicator,
  Text,
  ScrollArea,
  SimpleGrid,
  AvatarGroup,
  Avatar,
  UnstyledButton,
} from "@mantine/core";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconChevronLeft } from "@tabler/icons-react";
import { UseFormReturnType } from "@mantine/form";
import { GroupFormValues, GroupData } from "@/types";
import { IconEdit } from "@tabler/icons-react";
import { IconPencil } from "@tabler/icons-react";
import AddParticipantModal from "@/components/AddParticipantModal";
import ViewParticipantModal from "@/components/ViewParticipantModal";
import ParticipantAvatar from "@/components/ParticipantAvatar";

type ListParticipantsModalProps = {
  groupInfo: GroupData;
  // form: UseFormReturnType<any>;
};

const ListParticipantsModal = ({ groupInfo }: ListParticipantsModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 50em)") || false;
  return (
    <>
      <MantineModal.Root
        opened={opened}
        onClose={close}
        fullScreen={isMobile}
        transitionProps={{ transition: "pop", duration: 200 }}
        centered
        // zIndex={201}
      >
        <MantineModal.Overlay />
        <MantineModal.Content radius={isMobile ? 0 : "l"}>
          <MantineModal.Header>
            <ActionIcon
              variant="transparent"
              color="gray"
              aria-label="Settings"
              onClick={close}
            >
              <IconChevronLeft
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
          </MantineModal.Header>
          <MantineModal.Body>
            <Stack mih={rem(500)}>
              <Center>
                <Text fw={500}>Participants</Text>
              </Center>
              <Center>
                <ScrollArea.Autosize mah={400}>
                  <SimpleGrid cols={3}>
                    {groupInfo.expand.participants.map((participant, index) => (
                      <ViewParticipantModal
                        key={index}
                        participant={participant}
                        groupInfo={groupInfo}
                      />
                    ))}
                    {/* <AddParticipantModal
                      groupForm={form}
                      participantIds={participantIds}
                      setParticipantIds={setParticipantIds}
                      disabledPreferredPaymentMethod={true}
                    /> */}
                  </SimpleGrid>
                </ScrollArea.Autosize>
              </Center>
            </Stack>
          </MantineModal.Body>
        </MantineModal.Content>
      </MantineModal.Root>

      <UnstyledButton onClick={open}>
        <AvatarGroup>
          {groupInfo.expand.participants.map((participant, index) => (
            <Avatar key={index}>
              <Title order={2}>{participant.avatar.emoji}</Title>
            </Avatar>
          ))}
          <Avatar>
            <IconPencil style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </Avatar>
        </AvatarGroup>
      </UnstyledButton>
    </>
  );
};

export default ListParticipantsModal;
