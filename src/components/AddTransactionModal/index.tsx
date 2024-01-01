import React, { useCallback, useState } from "react";
import { useCounter, useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Button, Affix, Center, ActionIcon, Stack, rem } from "@mantine/core";
import { UseFormReturnType, useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { IconChevronLeft } from "@tabler/icons-react";
import { Carousel, CarouselSlide, Embla } from "@mantine/carousel";
import ModalFooterButton from "../ModalFooterButton";
import { useRouter } from "next/navigation";
import PageSetAmount from "./components/PageSetAmount";
import PageSetDetails from "./components/PageSetDetails";
import Modal from "@/components/Modal";
import {
  GroupData,
  Participant,
  SplitType,
  StoreEmojiData,
  TransactionFormValues,
} from "@/types";
import PageSelectParticipant from "./components/PageSelectParticipant";
import dayjs from "dayjs";

type AddTransactionModalProps = {
  groupData: GroupData;
};

const AddTransactionModal = ({ groupData }: AddTransactionModalProps) => {
  // console.log(dayjs().toISOString());
  // const [timeNow, setTimeNow] = useState(() => dayjs().toISOString());
  // console.log(timeNow);

  // const timeNow = dayjs().toISOString();
  // console.log(da)
  const form = useForm({
    initialValues: {
      avatar: { emoji: "😄", unified: "1f604" },
      name: "",
      description: "",
      amount: 0,
      splitType: SplitType.Equal,
      everyoneIsParticipant: true,
      participants: [],
      expenseDateTime: new Date(),
    } as TransactionFormValues,

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Modal
        numPage={3}
        onConfirmClick={() => {
          form.reset();
          console.log(form.values);
        }}
        onCloseModalClick={() => {
          form.reset();
        }}
        button={
          <Affix
            // TODO: Find the way to center the button without cannot touching behind this button
            position={{ bottom: 20, right: 20 }}
          >
            <Center>
              <ActionIcon
                variant="filled"
                color="gray"
                size="xl"
                radius="xl"
                aria-label="Add Transaction"
              >
                <IconPlus
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Center>
          </Affix>
        }
      >
        <Carousel.Slide>
          <PageSetAmount form={form} />
        </Carousel.Slide>
        <Carousel.Slide>
          <PageSetDetails form={form} />
        </Carousel.Slide>
        <Carousel.Slide>
          <PageSelectParticipant form={form} groupData={groupData} />
        </Carousel.Slide>
      </Modal>
    </form>
  );
};

export default AddTransactionModal;
