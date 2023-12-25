import React, { useCallback, useState } from "react";
import { useCounter, useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Button, Affix, Center, ActionIcon, rem, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { IconChevronLeft } from "@tabler/icons-react";
import PageSetName from "./components/PageSetName";
import PageSetParticipant from "./components/PageSetParticipant";
import PageSetPassword from "./components/PageSetPassword";
import { Carousel, CarouselSlide, Embla } from "@mantine/carousel";
import ModalFooterButton from "../ModalFooterButton";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { StoreEmojiData } from "@/types";

export interface BillFormValues {
  avatar: StoreEmojiData;
  name: string;
  description: string;
  password: string;
  currency: string;
  participant: string[];
}

const AddBillModal = () => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      avatar: { emoji: "😄", unified: "1f604" },
      name: "",
      description: "",
      password: "",
      currency: "EUR",
      participant: [],
      // termsOfService: false,
    } as BillFormValues,

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <form>
      <Modal
        numPage={3}
        onConfirmClick={() => {
          console.log(form.values);
          router.push(`/bill/billId`);
        }}
        buttonTitle="Create Bill"
      >
        <Carousel.Slide>
          <PageSetName form={form} />
        </Carousel.Slide>
        <Carousel.Slide>
          <PageSetPassword form={form} />
        </Carousel.Slide>
        <Carousel.Slide>
          <PageSetParticipant form={form} />
        </Carousel.Slide>
      </Modal>
    </form>
  );
};

export default AddBillModal;
