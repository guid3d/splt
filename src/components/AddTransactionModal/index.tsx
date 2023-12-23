import React, { useCallback, useState } from "react";
import { useCounter, useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Button, Affix, Center, ActionIcon, Stack, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { IconChevronLeft } from "@tabler/icons-react";
import { Carousel, CarouselSlide, Embla } from "@mantine/carousel";
import ModalFooterButton from "../ModalFooterButton";
import { useRouter } from "next/navigation";
import PageSetAmount from "./components/PageSetAmount";
import PageSetDetails from "./components/PageSetDetails";
import Modal from "@/components/Modal";

export interface TransactionFormValues {
  avatar: string;
  name: string;
  description: string;
  amount: number;
  participant: string[];
}

const AddTransactionModal = () => {
  const form = useForm({
    initialValues: {
      avatar: "🍟",
      name: "",
      description: "",
      amount: 0,
      participant: [],
    } as TransactionFormValues,

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Modal
        numPage={2}
        onConfirmClick={() => {
          console.log(form.values);
          // router.push(`/bill/billId`);
        }}
        isActionIcon
      >
        <Carousel.Slide>
          <PageSetAmount form={form} />
        </Carousel.Slide>
        <Carousel.Slide>
          <PageSetDetails form={form} />
        </Carousel.Slide>
      </Modal>
    </form>
  );
};

export default AddTransactionModal;
