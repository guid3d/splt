import {
  ActionIcon,
  Center,
  Container,
  Group,
  Modal as MantineModal,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
  UnstyledButton,
  rem,
} from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { UseFormReturnType } from "@mantine/form";
import { GroupFormValues, Participant, PaymentMethodType, StoreEmojiData } from "@/types";
import { IconChevronLeft, IconPlus } from "@tabler/icons-react";
import ParticipantAvatar from "@/components/ParticipantAvatar";
import { useDisclosure, useMediaQuery, useViewportSize } from "@mantine/hooks";
import { randomPersonEmoji } from "@/utils/randomEmoji";
import { Theme } from "emoji-picker-react";
import dynamic from "next/dynamic";
import AddParticipantModal from "@/components/AddParticipantModal";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

type PageAddParticipantProps = {
  form: UseFormReturnType<GroupFormValues>;
  participants: Participant[];
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
  isActive?: boolean;
};

const PageAddParticipant = ({
  form,
  participants,
  setParticipants,
  isActive,
}: PageAddParticipantProps) => {
  const { height } = useViewportSize();
  const isMobile = useMediaQuery("(max-width: 50em)") || false;
  const modalHeight = isMobile ? rem(height - 100) : rem(500);

  // Add row state
  const [inputValue, setInputValue] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState<StoreEmojiData>({
    emoji: randomPersonEmoji(),
    unified: "",
  });
  const [pickerOpened, { open: openPicker, close: closePicker }] = useDisclosure(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Edit state
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [editConfirmSuccess, setEditConfirmSuccess] = useState(false);
  const [editingData, setEditingData] = useState<{ index: number; participant: Participant } | null>(null);

  useEffect(() => {
    if (!isActive) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 300);
    return () => clearTimeout(timer);
  }, [isActive]);

  const addParticipant = () => {
    const name = inputValue.trim();
    if (!name) return;
    setParticipants((prev) => [
      ...prev,
      {
        avatar: selectedEmoji,
        name,
        accountName: "",
        selectedPaymentMethod: PaymentMethodType.Iban,
        paymentMethod: { iban: "", paypal: "" },
      },
    ]);
    setInputValue("");
    setSelectedEmoji({ emoji: randomPersonEmoji(), unified: "" });
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addParticipant();
    }
  };

  const openEditModal = (index: number) => {
    setEditingData({ index, participant: participants[index] });
    openEdit();
  };

  const closeEditModal = () => {
    closeEdit();
    setEditingData(null);
    setEditConfirmSuccess(false);
  };

  return (
    <>
      {/* Add participant emoji picker */}
      <MantineModal.Root
        opened={pickerOpened}
        onClose={closePicker}
        fullScreen={isMobile}
        transitionProps={{ transition: "fade", duration: 200 }}
        centered
        zIndex={201}
      >
        <MantineModal.Overlay />
        <MantineModal.Content radius={isMobile ? 0 : "lg"}>
          <MantineModal.Header>
            <ActionIcon variant="transparent" color="gray" onClick={closePicker}>
              <IconChevronLeft style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
          </MantineModal.Header>
          <MantineModal.Body>
            <Stack mih={rem(550)} justify="space-between">
              <Center>
                <ActionIcon variant="default" size={rem(100)} radius={rem(100)}>
                  <Title order={1} style={{ fontSize: rem(60) }}>
                    {selectedEmoji.emoji}
                  </Title>
                </ActionIcon>
              </Center>
              <Center>
                <Picker
                  height={390}
                  theme={Theme.AUTO}
                  onEmojiClick={(res) => {
                    setSelectedEmoji({ emoji: res.emoji, unified: res.unified });
                    closePicker();
                  }}
                  previewConfig={{ showPreview: false }}
                  lazyLoadEmojis
                />
              </Center>
            </Stack>
          </MantineModal.Body>
        </MantineModal.Content>
      </MantineModal.Root>

      {/* Edit participant — AddParticipantModal in controlled mode */}
      <AddParticipantModal
        participants={participants}
        setParticipants={setParticipants}
        disabledPreferredPaymentMethod={true}
        opened={editOpened}
        onClose={closeEditModal}
        editIndex={editingData?.index}
        editParticipant={editingData?.participant}
        onConfirmClick={() => setEditConfirmSuccess(true)}
        confirmSuccess={editConfirmSuccess}
        setConfirmSuccess={setEditConfirmSuccess}
      />

      <Container h={modalHeight} style={{ display: "flex", flexDirection: "column" }}>
        <Stack gap="xs" style={{ flexShrink: 0 }}>
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

        <Group gap="xs" align="center" wrap="nowrap" mt="xl" style={{ flexShrink: 0 }}>
          <ActionIcon
            variant="transparent"
            size={rem(36)}
            onClick={openPicker}
            style={{ fontSize: rem(24), flexShrink: 0 }}
          >
            {selectedEmoji.emoji}
          </ActionIcon>
          <TextInput
            ref={inputRef}
            variant="unstyled"
            placeholder="Type participant name..."
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
            maxLength={15}
            style={{ flex: 1 }}
            styles={{ input: { fontSize: "16px", borderRadius: 0 } }}
          />
          <ActionIcon
            onClick={addParticipant}
            disabled={!inputValue.trim()}
            variant="light"
            size="lg"
            style={{ flexShrink: 0 }}
          >
            <IconPlus size={16} />
          </ActionIcon>
        </Group>

        <ScrollArea flex={1} mt="xl">
          <SimpleGrid cols={3} spacing={0} pb="xl">
            {participants.map((participant, index) => (
              <UnstyledButton key={index} onClick={() => openEditModal(index)}>
                <ParticipantAvatar avatar={participant.avatar} name={participant.name} />
              </UnstyledButton>
            ))}
          </SimpleGrid>
        </ScrollArea>
      </Container>
    </>
  );
};

export default PageAddParticipant;
