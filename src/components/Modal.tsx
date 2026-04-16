import React, { useCallback, useEffect, useState } from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  Modal as MantineModal,
  ActionIcon,
  rem,
  Stack,
  UnstyledButton,
  Text,
  Space,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconChevronLeft } from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";
import type { EmblaCarouselType } from "embla-carousel";
import ModalFooterButton from "./ModalFooterButton";

type ModalPropsType = {
  children: React.ReactNode | ((close: () => void) => React.ReactNode);
  maxPage?: number;
  confirmPage?: number;
  // isActionIcon?: boolean;
  onConfirmClick?: () => void;
  onCloseModalClick?: () => void;
  // buttonTitle?: string;
  button: React.ReactNode;
  page?: number;
  pageHandler?: any;
  form?: UseFormReturnType<any>;
  nextButtonIsPending?: boolean;
  confirmSuccess?: boolean;
  setConfirmSuccess?: React.Dispatch<React.SetStateAction<boolean>>;
  onLastPageHandler?: () => void;
  keepButtonWhenOpened?: boolean;
  headerTitle?: string;
  hideFooter?: boolean;
  renderFooter?: (opts: {
    page: number;
    pageIncrement: () => void;
    confirmFunction: () => void;
    closeModalHandler: () => void;
    isMobile: boolean;
  }) => React.ReactNode;
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
  hideFooter,
  renderFooter,
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
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);
  const pageDecrement = () => {
    scrollPrev();
    pageHandler?.decrement();
  };
  const pageIncrement = () => {
    if (!form?.validate()?.hasErrors) {
      scrollNext();
      pageHandler?.increment();
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
    pageHandler?.set(0);
  };

  const onCloseModal = () => {
    closeModalHandler();
    onCloseModalClick ? onCloseModalClick() : null;
  };

  const confirmFunction = () => {
    if (!form?.validate()?.hasErrors) {
      onConfirmClick?.();
    }
  };

  const renderedChildren =
    typeof children === "function" ? children(closeModalHandler) : children;

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
        <MantineModal.Content radius={isMobile ? 0 : "lg"}>
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
            {hideFooter ? (
              renderedChildren
            ) : (
              <Stack h={rem(550)} justify="space-between">
                <Carousel
                  draggable={false}
                  withControls={false}
                  getEmblaApi={setEmbla}
                  withKeyboardEvents={false}
                  pb={isMobile ? "xl" : "none"}
                  height={rem(430)}
                >
                  {renderedChildren}
                </Carousel>
                {renderFooter ? (
                renderFooter({ page: page ?? 0, pageIncrement, confirmFunction, closeModalHandler, isMobile })
              ) : (
                <ModalFooterButton
                  isMobile={isMobile}
                  isModalOpened={opened}
                  page={page ?? 0}
                  maxPage={maxPage ?? 0}
                  confirmPage={confirmPage ?? 0}
                  pageIncrement={pageIncrement}
                  confirmFunction={confirmFunction}
                  closeModalHandler={closeModalHandler}
                  nextButtonIsPending={nextButtonIsPending}
                  onLastPageHandler={onLastPageHandler}
                />
              )}
              </Stack>
            )}
          </MantineModal.Body>
        </MantineModal.Content>
      </MantineModal.Root>
      {(!opened || keepButtonWhenOpened) && (
        <UnstyledButton component="span" onClick={open}>{button}</UnstyledButton>
      )}
    </>
  );
};

export default Modal;
