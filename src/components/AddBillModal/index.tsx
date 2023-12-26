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
import { BillFormValues, Participant, StoreEmojiData } from "@/types";

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
        button={
          <Affix
            // TODO: Find the way to center the button without cannot touching behind this button
            position={{ bottom: 20, right: 0, left: 0 }}
            // style={{ transform: "translate(-50%, -50%)" }}
          >
            <Center>
              <Button
                variant="filled"
                leftSection={<IconPlus size={14} />}
                // onClick={open}
                justify="center"
              >
                Create Bill
              </Button>
            </Center>
          </Affix>
        }
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