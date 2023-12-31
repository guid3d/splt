import React, { useCallback, useState } from "react";
import { useCounter, useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  Modal as MantineModal,
  Button,
  Affix,
  Center,
  ActionIcon,
  rem,
  Stack,
  UnstyledButton,
} from "@mantine/core";
import { UseFormReturnType, useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { IconChevronLeft } from "@tabler/icons-react";
import { Carousel, CarouselSlide, Embla } from "@mantine/carousel";
import ModalFooterButton from "./ModalFooterButton";

type ModalPropsType = {
  children: React.ReactNode;
  numPage: number;
  // isActionIcon?: boolean;
  onConfirmClick: () => void;
  onCloseModalClick?: () => void;
  // buttonTitle?: string;
  button: React.ReactNode;
};

const Modal = ({
  numPage,
  // isActionIcon,
  children,
  onConfirmClick,
  onCloseModalClick,
  // buttonTitle,
  button,
}: ModalPropsType) => {
  const maxPage = numPage - 1;
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 50em)") || false;
  const [page, pageHandler] = useCounter(0, {
    min: 0,
    max: maxPage,
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

  const onCloseModal = () => {
    close();
    pageHandler.set(0);
    onCloseModalClick();
  };

  const onConfirmClickHandler = () => {
    close();
    pageHandler.set(0);
    onConfirmClick();
  };

  return (
    <>
      <MantineModal.Root
        opened={opened}
        onClose={onCloseModal}
        fullScreen={isMobile}
        transitionProps={{ transition: "slide-up", duration: 200 }}
        centered
      >
        <MantineModal.Overlay />
        <MantineModal.Content radius={isMobile ? 0 : "l"}>
          <MantineModal.Header>
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
          </MantineModal.Header>
          <MantineModal.Body>
            <Stack mih={rem(500)} justify="space-between">
              <Carousel
                draggable={false}
                withControls={false}
                getEmblaApi={setEmbla}
                withKeyboardEvents={false}
              >
                {children}
              </Carousel>
              <ModalFooterButton
                isMobile={isMobile}
                isModalOpened={opened}
                page={page}
                maxPage={maxPage}
                pageIncrement={pageIncrement}
                confirmFunction={onConfirmClickHandler}
              />
            </Stack>
          </MantineModal.Body>
        </MantineModal.Content>
      </MantineModal.Root>
      {!opened && <UnstyledButton onClick={open}>{button}</UnstyledButton>}
    </>
  );
};

export default Modal;
