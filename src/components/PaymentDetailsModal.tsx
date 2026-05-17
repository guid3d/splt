"use client";
import {
  Button,
  Center,
  Input,
  Modal,
  rem,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useCounter } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";
import { Participant, PaymentMethodType } from "@/types";
import { useUpdateParticipant } from "@/api";
import ModalComponent from "./Modal";
import { getHashedSessionId, recordConsent } from "@/lib/consent";

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
  });

  useEffect(() => {
    if (opened) {
      form.setValues(participant);
    }
  }, [opened]);

  const handleSave = async () => {
    if (!participant.id) return;
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
      footerContent={() => {
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
          </Stack>
        );
      }}
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

          <Stack gap={rem(3)}>
            <Text size="sm">Preferred Payment By</Text>
            <SegmentedControl
              value={form.values.selectedPaymentMethod}
              onChange={(value) =>
                form.setFieldValue("selectedPaymentMethod", value as PaymentMethodType)
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
    </ModalComponent>
  );
};

export default PaymentDetailsModal;
