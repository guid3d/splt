import React, { useEffect, useState } from "react";
import { useCounter } from "@mantine/hooks";
import { Center, Stack, Avatar, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";

import Modal from "@/components/Modal";
import { Participant, PaymentMethodType } from "@/types";
import PageSetPayment from "./components/PageSetPayment";
import { randomPersonEmoji } from "@/utils/randomEmoji";
import { validateIban } from "@/lib/validateIban";
// import { useId } from "@mantine/hooks";

const NewParticipantAvatar = () => {
  return (
    <Stack>
      <Center>
        <Avatar size="lg" radius="xl">
          <IconPlus style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </Avatar>
      </Center>
    </Stack>
  );
};

type AddParticipantModalProps = {
  disabledPreferredPaymentMethod?: boolean;
  participants: Participant[];
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
  onConfirmClick?: (newParticipant: Participant) => void;
  confirmSuccess?: boolean;
  setConfirmSuccess?: React.Dispatch<React.SetStateAction<boolean>>;
  nextButtonIsPending?: boolean;
  // Controlled / edit mode
  opened?: boolean;
  onClose?: () => void;
  editIndex?: number;
  editParticipant?: Participant;
};

const AddParticipantModal = ({
  disabledPreferredPaymentMethod,
  participants,
  setParticipants,
  onConfirmClick,
  confirmSuccess,
  setConfirmSuccess,
  nextButtonIsPending,
  opened,
  onClose,
  editIndex,
  editParticipant,
}: AddParticipantModalProps) => {
  useEffect(() => {
    if (editParticipant == null) {
      form.setFieldValue("avatar", { emoji: randomPersonEmoji(), unified: "" });
    }
  }, [confirmSuccess]);

  useEffect(() => {
    if (editParticipant != null) {
      form.setValues(editParticipant);
    }
  }, [editParticipant]);

  const maxPage = 0;
  const confirmPage = 0;
  const [page, pageHandler] = useCounter(0, {
    min: 0,
    max: maxPage,
  });
  const form = useForm({
    initialValues: {
      avatar: { emoji: randomPersonEmoji(), unified: "" },
      name: "",
      accountName: "",
      selectedPaymentMethod: PaymentMethodType.Iban,
      paymentMethod: {
        iban: "",
        paypal: "",
      },
    },
    validate: (values) => {
      if (page === 0) {
        return {
          name:
            values.name.trim().length < 1
              ? "Person name must include at least 1 character"
              : null,
          "paymentMethod.iban":
            !disabledPreferredPaymentMethod &&
            values.selectedPaymentMethod === PaymentMethodType.Iban
              ? validateIban(values.paymentMethod.iban)
              : null,
        };
      }
      return {};
    },
  });

  return (
    <Center>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Modal
          form={form}
          page={page}
          pageHandler={pageHandler}
          maxPage={maxPage}
          confirmPage={confirmPage}
          opened={opened}
          onClose={onClose}
          onConfirmClick={() => {
            if (editIndex !== undefined) {
              setParticipants((prev) =>
                prev.map((p, i) => (i === editIndex ? { ...p, ...form.values } : p))
              );
            } else {
              setParticipants([...participants, form.values]);
            }
            if (onConfirmClick) {
              onConfirmClick(form.values);
            }
            form.reset();
          }}
          onCloseModalClick={() => {
            form.reset();
          }}
          onLastPageHandler={() => {
            form.reset();
          }}
          confirmSuccess={confirmSuccess}
          setConfirmSuccess={setConfirmSuccess}
          nextButtonIsPending={nextButtonIsPending}
          button={
            <Stack>
              <NewParticipantAvatar />
              <Center>
                <Text>Add</Text>
              </Center>
            </Stack>
          }
        >
          <Carousel.Slide>
            <PageSetPayment
              disabledPreferredPaymentMethod={disabledPreferredPaymentMethod}
              form={form}
            />
          </Carousel.Slide>
        </Modal>
      </form>
    </Center>
  );
};

export default AddParticipantModal;
