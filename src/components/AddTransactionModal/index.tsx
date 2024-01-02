import React, { useCallback, useState } from "react";
import { useCounter, useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Button, Affix, Center, ActionIcon, Stack, rem } from "@mantine/core";
import { UseFormReturnType, useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { IconChevronLeft } from "@tabler/icons-react";
import { Carousel, CarouselSlide, Embla } from "@mantine/carousel";
import ModalFooterButton from "../ModalFooterButton";
import { useParams, useRouter } from "next/navigation";
import PageSetAmount from "./components/PageSetAmount";
import PageSetDetails from "./components/PageSetDetails";
import Modal from "@/components/Modal";
import {
  GroupData,
  ModifiedTransactionFormValues,
  Participant,
  SplitType,
  StoreEmojiData,
  TransactionFormValues,
} from "@/types";
import PageSelectParticipant from "./components/PageSelectParticipant";
import dayjs from "dayjs";
import { useCreateTransaction } from "@/api";

type AddTransactionModalProps = {
  groupData: GroupData;
};

const AddTransactionModal = ({ groupData }: AddTransactionModalProps) => {
  // console.log(dayjs().toISOString());
  // const [timeNow, setTimeNow] = useState(() => dayjs().toISOString());
  // console.log(timeNow);

  // const timeNow = dayjs().toISOString();
  // console.log(da)
  const { id } = useParams<{ id: string }>();
  const createTransactionMutation = useCreateTransaction();

  const form = useForm({
    initialValues: {
      groupInfo: id,
      amount: 0,
      transactionDateTime: new Date(),
      name: "",
      avatar: { emoji: "😄", unified: "1f604" },
      description: "",
      paidBy: groupData.expand.participants[0].id,
      splitType: SplitType.Equal,
      everyoneIsParticipant: true,
      participants: [],
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
          const modifiedFormValues: ModifiedTransactionFormValues = {
            ...form.values,
            transactionDateTime: form.values.transactionDateTime.toISOString(),
          };
          console.log(modifiedFormValues);
          // console.log(form.values);
          createTransactionMutation.mutate(modifiedFormValues, {
            onSuccess: (data) => {
              console.log(data);
            },
          });
          form.reset();
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
          <PageSetAmount form={form} groupData={groupData} />
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
