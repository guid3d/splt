"use client";
import {
  ActionIcon,
  Center,
  Modal,
  rem,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { Participant } from "@/types";
import ParticipantAvatar from "./ParticipantAvatar";
import { useHover, useMediaQuery, useViewportSize } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";

type ParticipantItemProps = {
  participant: Participant;
  onSelect: (id: string) => void;
};

const ParticipantItem = ({ participant, onSelect }: ParticipantItemProps) => {
  const { hovered, ref } = useHover();
  return (
    <UnstyledButton ref={ref} onClick={() => participant.id && onSelect(participant.id)}>
      <ParticipantAvatar
        avatar={participant.avatar}
        name={participant.name}
        isSelected={hovered}
      />
    </UnstyledButton>
  );
};

type UserSelectionModalProps = {
  opened: boolean;
  participants: Participant[];
  onSelect: (participantId: string) => void;
  onClose?: () => void;
};

const UserSelectionModal = ({
  opened,
  participants,
  onSelect,
  onClose,
}: UserSelectionModalProps) => {
  const isMobile = useMediaQuery("(max-width: 50em)") || false;
  const { height } = useViewportSize();
  const modalHeight = isMobile ? rem(height - 100) : rem(500);

  return (
    <Modal.Root
      opened={opened}
      onClose={() => onClose?.()}
      fullScreen={isMobile}
      transitionProps={{ transition: "pop", duration: 200 }}
      centered
    >
      <Modal.Overlay />
      <Modal.Content radius={isMobile ? 0 : "lg"}>
        <Modal.Header>
          {onClose && (
            <ActionIcon
              variant="transparent"
              color="gray"
              onClick={onClose}
              ml="auto"
            >
              <IconX style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
          )}
        </Modal.Header>
        <Modal.Body>
          <ScrollArea h={modalHeight}>
            <Stack>
              <Center>
                <Stack gap={rem(2)} align="center">
                  <Text fw={500}>Who are you?</Text>
                  <Text size="sm" c="dimmed">
                    Choose your name to personalise your experience
                  </Text>
                </Stack>
              </Center>
              <SimpleGrid cols={3} spacing={0} pb="xl">
                {participants.map((participant) => (
                  <ParticipantItem
                    key={participant.id}
                    participant={participant}
                    onSelect={onSelect}
                  />
                ))}
              </SimpleGrid>
            </Stack>
          </ScrollArea>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default UserSelectionModal;
