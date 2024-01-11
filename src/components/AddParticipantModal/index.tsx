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
import PageNotifyFinish from "./components/PageNotifyFinish";
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
  // groupForm: UseFormReturnType<GroupFormValues>;
  participants: Participant[];
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
  // setNewParticipant?: React.Dispatch<React.SetStateAction<Participant>>;
  onConfirmClick?: (newParticipant: Participant) => void;
  confirmSuccess?: boolean;
  setConfirmSuccess?: React.Dispatch<React.SetStateAction<boolean>>;
  nextButtonIsPending?: boolean;
};

const AddParticipantModal = ({
  // groupForm,
  disabledPreferredPaymentMethod,
  participants,
  setParticipants,
  // setNewParticipant,
  onConfirmClick,
  confirmSuccess,
  setConfirmSuccess,
  nextButtonIsPending,
}: AddParticipantModalProps) => {
  useEffect(() => {
    form.setFieldValue("avatar", { emoji: randomPersonEmoji(), unified: "" });
  }, [confirmSuccess]);

  const maxPage = 1;
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
          onConfirmClick={() => {
            setParticipants([...participants, form.values]);
            if (onConfirmClick) {
              onConfirmClick(form.values);
            }
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
          <Carousel.Slide>
            <PageNotifyFinish />
          </Carousel.Slide>
        </Modal>
      </form>
    </Center>
  );
};

export default AddParticipantModal;
