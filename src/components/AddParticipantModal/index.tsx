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
import { Participant, PaymentMethodType, StoreEmojiData } from "@/types";
import PageSetPayment from "./components/PageSetPayment";
import { GroupFormValues } from "@/types";
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
};

const AddParticipantModal = ({
  groupForm,
  disabledPreferredPaymentMethod,
}: AddParticipantModalProps) => {
  // const [uuid, setuuid] = useState<string>(uuidv4());
  // const id = useId();
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
    validate: {
      // TODO: make sure name of participant is unique
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <Center>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Modal
          numPage={1}
          onConfirmClick={() => {
            const newParticipant: Participant = form.values;
            groupForm.setFieldValue("participant", [
              ...groupForm.values.participant,
              newParticipant,
            ]);
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
