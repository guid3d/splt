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
import { useCounter, useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconChevronLeft } from "@tabler/icons-react";
import { UseFormReturnType, useForm } from "@mantine/form";
import {
  GroupFormValues,
  GroupData,
  Participant,
  PaymentMethodType,
} from "@/types";
import { IconEdit } from "@tabler/icons-react";
import { IconPencil } from "@tabler/icons-react";
import AddParticipantModal from "@/components/AddParticipantModal";
import ParticipantAvatar from "@/components/ParticipantAvatar";
import PageSetPayment from "../AddParticipantModal/components/PageSetPayment";
import Modal from "../Modal";
import { Carousel } from "@mantine/carousel";
import { useUpdateParticipant } from "@/api";

type ViewParticipantModalProps = {
  participant: Participant;
  groupInfo: GroupData;
};

const ViewParticipantModal = ({
  participant,
  groupInfo,
}: ViewParticipantModalProps) => {
  const updateParticipant = useUpdateParticipant();
  const numPage = 1;
  const [page, pageHandler] = useCounter(0, {
    min: 0,
    max: numPage - 1,
  });
  const form = useForm({
    initialValues: participant,
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
            console.log(form.values);
            // const newParticipant: Participant = form.values;
            updateParticipant.mutate(form.values, {
              onSuccess: (returnNewParticipant) => {
                form.setValues(returnNewParticipant);
              },
            });
          }}
          onCloseModalClick={() => {
            form.reset();
          }}
          button={
            <ParticipantAvatar
              avatar={participant.avatar}
              name={participant.name}
            />
          }
        >
          <Carousel.Slide>
            <PageSetPayment form={form} />
          </Carousel.Slide>
        </Modal>
      </form>
    </Center>
  );
};

export default ViewParticipantModal;
