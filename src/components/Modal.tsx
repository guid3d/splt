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
  children: React.ReactNode;
  maxPage: number;
  confirmPage: number;
  onConfirmClick: () => void;
  onCloseModalClick?: () => void;
  button?: React.ReactNode;
  page: number;
  pageHandler: any;
  form: UseFormReturnType<any>;
  nextButtonIsPending?: boolean;
  confirmSuccess?: boolean;
  setConfirmSuccess?: React.Dispatch<React.SetStateAction<boolean>>;
  onLastPageHandler?: () => void;
  keepButtonWhenOpened?: boolean;
  headerTitle?: string;
  /** Controlled mode: pass opened + onClose to skip the trigger button */
  opened?: boolean;
  onClose?: () => void;
  /** Override the footer per page. Return null to render nothing. */
  footerContent?: (page: number) => React.ReactNode;
  /** Ref populated with pageIncrement so slide content can advance pages */
  pageIncrementRef?: React.RefObject<(() => void) | null>;
};

const Modal = ({
  maxPage,
  confirmPage,
  children,
  onConfirmClick,
  onCloseModalClick,
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
  opened: controlledOpened,
  onClose: controlledOnClose,
  footerContent,
  pageIncrementRef,
}: ModalPropsType) => {
  const isControlled = controlledOpened !== undefined;
  const [internalOpened, { open, close }] = useDisclosure(false);
  const isOpen = isControlled ? controlledOpened! : internalOpened;

  const isMobile = useMediaQuery("(max-width: 50em)") || false;
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);

  const scrollPrev = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);

  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

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

  // Keep ref current so callers can trigger page advance from slide content
  useEffect(() => {
    if (pageIncrementRef) pageIncrementRef.current = pageIncrement;
  });

  useEffect(() => {
    if (confirmSuccess) {
      pageIncrement();
    }
  }, [confirmSuccess]);

  const closeModalHandler = () => {
    setConfirmSuccess?.(false);
    if (isControlled) {
      controlledOnClose?.();
    } else {
      close();
    }
    pageHandler.set(0);
  };

  const onCloseModal = () => {
    closeModalHandler();
    onCloseModalClick?.();
  };

  const confirmFunction = () => {
    if (!form.validate().hasErrors) {
      onConfirmClick();
    }
  };

  return (
    <>
      <MantineModal.Root
        opened={isOpen}
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
              onClick={page !== 0 ? pageDecrement : (isControlled ? closeModalHandler : close)}
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
                emblaOptions={{ watchDrag: false }}
                withControls={false}
                getEmblaApi={setEmbla}
                withKeyboardEvents={false}
                pb={isMobile ? "xl" : "none"}
              >
                {React.Children.map(children, (child, index) => {
                  const slide = child as React.ReactElement<{ children?: React.ReactNode }>;
                  return React.cloneElement(slide, {
                    children: (
                      // inert prevents tab/focus from reaching off-screen slides,
                      // which would otherwise trigger Embla to scroll to that slide
                      <div inert={index !== page ? true : undefined}>
                        {slide.props.children}
                      </div>
                    ),
                  });
                })}
              </Carousel>
              {footerContent !== undefined
                ? footerContent(page)
                : (
                  <ModalFooterButton
                    isMobile={isMobile}
                    isModalOpened={isOpen}
                    page={page}
                    maxPage={maxPage}
                    confirmPage={confirmPage}
                    pageIncrement={pageIncrement}
                    confirmFunction={confirmFunction}
                    closeModalHandler={closeModalHandler}
                    nextButtonIsPending={nextButtonIsPending}
                    onLastPageHandler={onLastPageHandler}
                  />
                )
              }
            </Stack>
          </MantineModal.Body>
        </MantineModal.Content>
      </MantineModal.Root>
      {!isControlled && (!internalOpened || keepButtonWhenOpened) && (
        <UnstyledButton onClick={open}>{button}</UnstyledButton>
      )}
    </>
  );
};

export default Modal;
