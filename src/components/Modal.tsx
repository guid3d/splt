import React, { useCallback, useEffect, useState } from "react";
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
  Flex,
  Text,
  Group,
  Space,
} from "@mantine/core";
import { UseFormReturnType, useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { IconChevronLeft } from "@tabler/icons-react";
import { Carousel, CarouselSlide, Embla } from "@mantine/carousel";
import ModalFooterButton from "./ModalFooterButton";
import { GroupFormValues } from "@/types";

type ModalPropsType = {
  children: React.ReactNode;
  maxPage: number;
  confirmPage: number;
  // isActionIcon?: boolean;
  onConfirmClick: () => void;
  onCloseModalClick?: () => void;
  // buttonTitle?: string;
  button: React.ReactNode;
  page: number;
  pageHandler: any;
  form: UseFormReturnType<any>;
  nextButtonIsPending?: boolean;
  confirmSuccess?: boolean;
  setConfirmSuccess?: React.Dispatch<React.SetStateAction<boolean>>;
  onLastPageHandler?: () => void;
  keepButtonWhenOpened?: boolean;
  headerTitle?: string;
};

const Modal = ({
  maxPage,
  confirmPage,
  // isActionIcon,
  children,
  onConfirmClick,
  onCloseModalClick,
  // buttonTitle,
  button,
  page,
  pageHandler,
  form,
  nextButtonIsPending,
  confirmSuccess,
  setConfirmSuccess,
  onLastPageHandler,
  keepButtonWhenOpened,
  headerTitle,
}: ModalPropsType) => {
  useEffect(() => {
    if (confirmSuccess) {
      pageIncrement();
    }
  }, [confirmSuccess]);
  // const maxPage = maxPage - 1;
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 50em)") || false;
  // const [page, pageHandler] = useCounter(0, {
  //   min: 0,
  //   max: maxPage,
  // });
  const [embla, setEmbla] = useState<Embla | null>(null);
  const pageDecrement = () => {
    scrollPrev();
    pageHandler.decrement();
  };
  const pageIncrement = () => {
    if (!form.validate().hasErrors) {
      scrollNext();
      pageHandler.increment();
    }
  };
  const scrollPrev = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);

  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  const closeModalHandler = () => {
    setConfirmSuccess ? setConfirmSuccess(false) : null;
    close();
    pageHandler.set(0);
  };

  const onCloseModal = () => {
    closeModalHandler();
    onCloseModalClick ? onCloseModalClick() : null;
  };

  const confirmFunction = () => {
    if (!form.validate().hasErrors) {
      onConfirmClick();
    }
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
            <Text c="dimmed" size="sm" fw={400}>
              {headerTitle}
            </Text>
            <Space w="xl" h="xl" />
          </MantineModal.Header>
          <MantineModal.Body>
            <Stack h={rem(550)} justify="space-between">
              <Carousel
                draggable={false}
                withControls={false}
                getEmblaApi={setEmbla}
                withKeyboardEvents={false}
                pb={isMobile ? "xl" : "none"}
              >
                {children}
              </Carousel>
              <ModalFooterButton
                isMobile={isMobile}
                isModalOpened={opened}
                page={page}
                maxPage={maxPage}
                confirmPage={confirmPage}
                pageIncrement={pageIncrement}
                confirmFunction={confirmFunction}
                closeModalHandler={closeModalHandler}
                nextButtonIsPending={nextButtonIsPending}
                onLastPageHandler={onLastPageHandler}
              />
            </Stack>
          </MantineModal.Body>
        </MantineModal.Content>
      </MantineModal.Root>
      {(!opened || keepButtonWhenOpened) && (
        <UnstyledButton onClick={open}>{button}</UnstyledButton>
      )}
    </>
  );
};

export default Modal;
