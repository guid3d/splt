"use client";
import { Button, Center, rem, Stack, Text } from "@mantine/core";
import PaymentForm from "@/components/PaymentForm";
import { useForm } from "@mantine/form";
import { useCallback, useEffect, useRef } from "react";
import { useCounter } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";
import { Participant, PaymentMethodType } from "@/types";
import { useUpdateParticipant } from "@/api";
import ModalComponent from "./Modal";
import { getHashedSessionId, recordConsent } from "@/lib/consent";
import { validateIban } from "@/lib/validateIban";

type PaymentDetailsModalProps = {
  opened: boolean;
  participant: Participant;
  onClose: () => void;
};

const PaymentDetailsModal = ({
  opened,
  participant,
  onClose,
}: PaymentDetailsModalProps) => {
  const [page, pageHandler] = useCounter(0, { min: 0, max: 0 });
  const updateParticipant = useUpdateParticipant();

  const form = useForm<Participant>({
    initialValues: {
      avatar: { emoji: "", unified: "" },
      name: "",
      accountName: "",
      selectedPaymentMethod: PaymentMethodType.Iban,
      paymentMethod: { iban: "", paypal: "" },
    },
    validate: (values) => ({
      "paymentMethod.iban":
        values.selectedPaymentMethod === PaymentMethodType.Iban
          ? validateIban(values.paymentMethod.iban)
          : null,
    }),
  });

  useEffect(() => {
    if (opened) {
      form.setValues(participant);
    }
  }, [opened]);

  const handleSave = async () => {
    if (!participant.id) return;
    if (form.validate().hasErrors) return;
    const needsConsent =
      form.values.selectedPaymentMethod === PaymentMethodType.Iban ||
      form.values.selectedPaymentMethod === PaymentMethodType.Paypal;
    if (needsConsent) {
      const hashed = await getHashedSessionId();
      recordConsent(participant.id, hashed);
    }
    await updateParticipant.mutateAsync({ ...form.values, id: participant.id });
    onClose();
  };

  const handleSaveRef = useRef(handleSave);
  handleSaveRef.current = handleSave;

  const requiresConsent =
    form.values.selectedPaymentMethod === PaymentMethodType.Iban ||
    form.values.selectedPaymentMethod === PaymentMethodType.Paypal;

  const footerContent = useCallback(
    () => (
      <Stack gap="xs" pb="md">
        {requiresConsent && (
          <Text size="xs" c="dimmed" ta="center">
            By saving, you consent to your payment details being stored and visible to group members
          </Text>
        )}
        <Button
          onClick={() => handleSaveRef.current()}
          loading={updateParticipant.isPending}
          fullWidth
          radius="xl"
          loaderProps={{ type: "dots" }}
        >
          Save
        </Button>
      </Stack>
    ),
    [requiresConsent, updateParticipant.isPending]
  );

  return (
    <ModalComponent
      opened={opened}
      onClose={onClose}
      page={page}
      pageHandler={pageHandler}
      maxPage={0}
      confirmPage={-1}
      onConfirmClick={() => {}}
      form={form}
      footerContent={footerContent}
    >
      <Carousel.Slide>
        <Stack gap="md">
          <Center>
            <Stack gap={rem(2)} align="center">
              <Text fw={500}>Payment details</Text>
              <Text size="sm" c="dimmed">
                How others pay you back
              </Text>
            </Stack>
          </Center>

          <PaymentForm form={form} />
        </Stack>
      </Carousel.Slide>
    </ModalComponent>
  );
};

export default PaymentDetailsModal;
