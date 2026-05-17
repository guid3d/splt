"use client";
import {
  Button,
  Center,
  Input,
  rem,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRef, useState } from "react";
import { useCounter } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";
import { Participant, PaymentMethodType } from "@/types";
import ParticipantAvatar from "./ParticipantAvatar";
import { useHover } from "@mantine/hooks";
import { useUpdateParticipant } from "@/api";
import Modal from "./Modal";
import { getHashedSessionId, recordConsent } from "@/lib/consent";

type ParticipantItemProps = {
  participant: Participant;
  onSelect: (id: string) => void;
};

const ParticipantItem = ({ participant, onSelect }: ParticipantItemProps) => {
  const { hovered, ref } = useHover();
  return (
    <UnstyledButton
      ref={ref}
      onClick={() => participant.id && onSelect(participant.id)}
    >
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
  const [page, pageHandler] = useCounter(0, { min: 0, max: 1 });
  const pageIncrementRef = useRef<(() => void) | null>(null);
  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null);
  const updateParticipant = useUpdateParticipant();

  const form = useForm<Participant>({
    initialValues: {
      avatar: { emoji: "", unified: "" },
      name: "",
      accountName: "",
      selectedPaymentMethod: PaymentMethodType.Iban,
      paymentMethod: { iban: "", paypal: "" },
    },
  });

  const hasPaymentDetails = (p: Participant): boolean => {
    switch (p.selectedPaymentMethod) {
      case PaymentMethodType.Cash:
        return true;
      case PaymentMethodType.Iban:
        return p.paymentMethod.iban.trim().length > 0;
      case PaymentMethodType.Paypal:
        return p.paymentMethod.paypal.trim().length > 0;
      default:
        return false;
    }
  };

  const handleParticipantSelect = (participantId: string) => {
    const participant = participants.find((p) => p.id === participantId);
    if (!participant) return;
    if (hasPaymentDetails(participant)) {
      onSelect(participantId);
      return;
    }
    setSelectedParticipant(participant);
    form.setValues(participant);
    pageIncrementRef.current?.();
  };

  const handleSave = async () => {
    if (!selectedParticipant?.id) return;
    const needsConsent =
      form.values.selectedPaymentMethod === PaymentMethodType.Iban ||
      form.values.selectedPaymentMethod === PaymentMethodType.Paypal;
    if (needsConsent) {
      const hashed = await getHashedSessionId();
      recordConsent(selectedParticipant.id, hashed);
    }
    await updateParticipant.mutateAsync({
      ...form.values,
      id: selectedParticipant.id,
    });
    onSelect(selectedParticipant.id);
  };

  const handleSkip = () => {
    if (selectedParticipant?.id) onSelect(selectedParticipant.id);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      page={page}
      pageHandler={pageHandler}
      maxPage={1}
      confirmPage={-1}
      onConfirmClick={() => {}}
      form={form}
      pageIncrementRef={pageIncrementRef}
      footerContent={(currentPage) => {
        if (currentPage === 0) return null;
        const requiresConsent =
          form.values.selectedPaymentMethod === PaymentMethodType.Iban ||
          form.values.selectedPaymentMethod === PaymentMethodType.Paypal;
        return (
          <Stack gap="xs" pb="md">
            {requiresConsent && (
              <Text size="xs" c="dimmed" ta="center">
                By saving, you consent to your payment details being stored and visible to group members
              </Text>
            )}
            <Button
              onClick={handleSave}
              loading={updateParticipant.isPending}
              fullWidth
            >
              Save
            </Button>
            <Center>
              <Text
                size="sm"
                c="dimmed"
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={handleSkip}
              >
                Skip for now
              </Text>
            </Center>
          </Stack>
        );
      }}
    >
      {/* Step 1: Who are you? */}
      <Carousel.Slide>
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
                onSelect={handleParticipantSelect}
              />
            ))}
          </SimpleGrid>
        </Stack>
      </Carousel.Slide>

      {/* Step 2: Payment details */}
      <Carousel.Slide>
        <Stack gap="md">
          <Center>
            <Stack gap={rem(2)} align="center" pb="lg">
              <Text fw={500}>Your payment details</Text>
              <Text size="sm" c="dimmed">
                So others know how to pay you back
              </Text>
            </Stack>
          </Center>

          <Stack gap={rem(3)}>
            <Text size="sm">Preferred Payment By</Text>
            <SegmentedControl
              value={form.values.selectedPaymentMethod}
              onChange={(value) =>
                form.setFieldValue(
                  "selectedPaymentMethod",
                  value as PaymentMethodType,
                )
              }
              data={[
                { label: "IBAN", value: PaymentMethodType.Iban },
                { label: "Paypal", value: PaymentMethodType.Paypal },
                { label: "Cash", value: PaymentMethodType.Cash },
              ]}
            />
          </Stack>

          {form.values.selectedPaymentMethod === PaymentMethodType.Iban && (
            <>
              <TextInput
                radius={0}
                variant="unstyled"
                size="md"
                label="Account Name"
                placeholder="John Doe"
                {...form.getInputProps("accountName")}
              />
              <Input.Wrapper label="IBAN">
                <Input
                  radius={0}
                  variant="unstyled"
                  size="md"
                  placeholder="DE00 0000 0000 0000 0000 00"
                  {...form.getInputProps("paymentMethod.iban")}
                />
              </Input.Wrapper>
            </>
          )}

          {form.values.selectedPaymentMethod === PaymentMethodType.Paypal && (
            <TextInput
              radius={0}
              variant="unstyled"
              size="md"
              label="Paypal Email / Account"
              placeholder="@johndoe"
              {...form.getInputProps("paymentMethod.paypal")}
            />
          )}
        </Stack>
      </Carousel.Slide>
    </Modal>
  );
};

export default UserSelectionModal;
