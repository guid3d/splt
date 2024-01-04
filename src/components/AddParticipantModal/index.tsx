import React, { useCallback, useId, useState, useMemo } from "react";
import { useCounter, useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  Button,
  Affix,
  Center,
  ActionIcon,
  Stack,
  rem,
  Avatar,
  Text,
} from "@mantine/core";
import { UseFormReturnType, useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { IconChevronLeft } from "@tabler/icons-react";
import { Carousel, CarouselSlide, Embla } from "@mantine/carousel";
import ModalFooterButton from "../ModalFooterButton";
import { useRouter } from "next/navigation";

import Modal from "@/components/Modal";
import {
  Participant,
  ParticipantFormValues,
  PaymentMethodType,
  StoreEmojiData,
} from "@/types";
import PageSetPayment from "./components/PageSetPayment";
import { GroupFormValues } from "@/types";
import { useCreateParticipant } from "@/api";
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
  groupForm: UseFormReturnType<GroupFormValues>;
  participantIds: string[];
  setParticipantIds: React.Dispatch<React.SetStateAction<string[]>>;
};

const AddParticipantModal = ({
  groupForm,
  disabledPreferredPaymentMethod,
  participantIds,
  setParticipantIds,
}: AddParticipantModalProps) => {
  const createParticipantMutation = useCreateParticipant();
  const numPage = 1;
  const [page, pageHandler] = useCounter(0, {
    min: 0,
    max: numPage - 1,
  });
  const form = useForm({
    initialValues: {
      avatar: { emoji: "😄", unified: "1f604" },
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
          numPage={numPage}
          onConfirmClick={() => {
            const newParticipant: ParticipantFormValues = form.values;
            createParticipantMutation.mutate(newParticipant, {
              onSuccess: (returnNewParticipant) => {
                // console.log(returnNewParticipant);
                groupForm.setFieldValue("participants", [
                  ...groupForm.values.participants,
                  returnNewParticipant,
                ]);
                setParticipantIds([
                  ...participantIds,
                  `${returnNewParticipant.id}`,
                ]);
              },
            });

            form.reset();
          }}
          onCloseModalClick={() => {
            form.reset();
          }}
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
