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
import { GroupData, Participant, StoreEmojiData } from "@/types";
import PageSelectParticipant from "./components/PageSelectParticipant";

export enum SplitType {
  Equal = "equal",
  Percent = "percent",
  Amount = "amount",
}

export interface TransactionFormValues {
  avatar: StoreEmojiData;
  name: string;
  description: string;
  amount: number;
  splitType: SplitType.Equal | SplitType.Percent | SplitType.Amount;
  everyoneIsParticipant: boolean;
  participant: string[];
}

type AddTransactionModalProps = {
  groupData: GroupData;
};

const AddTransactionModal = ({ groupData }: AddTransactionModalProps) => {
  const form = useForm({
    initialValues: {
      avatar: { emoji: "😄", unified: "1f604" },
      name: "",
      description: "",
      amount: 0,
      splitType: SplitType.Equal,
      everyoneIsParticipant: true,
      participant: [],
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
          console.log(form.values);
          // router.push(`/group/groupId`);
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
