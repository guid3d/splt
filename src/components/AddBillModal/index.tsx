import React, { useCallback, useState } from "react";
import { useCounter, useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Modal, Button, Affix, Center, ActionIcon } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { IconChevronLeft } from "@tabler/icons-react";
import PageSetName from "./components/PageSetName";
import PageSetParticipant from "./components/PageSetParticipant";
import PageSetPassword from "./components/PageSetPassword";
import { Carousel, CarouselSlide, Embla } from "@mantine/carousel";
import ModalFooterButton from "../ModalFooterButton";

export interface BillFormValues {
  avatar: string;
  name: string;
  description: string;
  password: string;
  participant: string[];
}

const AddBillModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 50em)") || false;
  const [page, pageHandler] = useCounter(0, {
    min: 0,
    max: 2,
  });
  const [embla, setEmbla] = useState<Embla | null>(null);
  const pageDecrement = () => {
    scrollPrev();
    pageHandler.decrement();
  };
  const pageIncrement = () => {
    scrollNext();
    pageHandler.increment();
  };
  const scrollPrev = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);

  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  const form = useForm({
    initialValues: {
      avatar: "🐥",
      name: "",
      description: "",
      password: "",
      participant: [],
      // termsOfService: false,
    } as BillFormValues,

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <>
      <Modal.Root
        opened={opened}
        onClose={close}
        fullScreen={isMobile}
        transitionProps={{ transition: "slide-up", duration: 200 }}
        centered
      >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <ActionIcon
              variant="transparent"
              color="gray"
              aria-label="Settings"
              onClick={page !== 0 ? pageDecrement : close}
            >
              <IconChevronLeft
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <Carousel
                draggable={false}
                withControls={false}
                getEmblaApi={setEmbla}
                withKeyboardEvents={false}
              >
                <Carousel.Slide>
                  <PageSetName
                    form={form}
                    // isModalOpened={opened}
                    // page={page}
                    // pageIncrement={pageIncrement}
                    // isMobile={isMobile}
                  />
                </Carousel.Slide>
                <Carousel.Slide>
                  <PageSetPassword form={form} />
                </Carousel.Slide>
                <Carousel.Slide>
                  <PageSetParticipant form={form} />
                </Carousel.Slide>
              </Carousel>
              <ModalFooterButton
                form={form}
                isMobile={isMobile}
                isModalOpened={opened}
                page={page}
                pageIncrement={pageIncrement}
              />
            </form>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      {!opened && (
        <Affix
          // TODO: Find the way to center the button without cannot touching behind this button
          position={{ bottom: 20, right: 0, left: 0 }}
          // style={{ transform: "translate(-50%, -50%)" }}
        >
          <Center>
            <ActionIcon
              variant="filled"
              color="gray"
              size="xl"
              radius="xl"
              aria-label="Add bill"
              onClick={open}
            >
              <IconPlus style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
          </Center>
        </Affix>
      )}
    </>
  );
};

export default AddBillModal;
