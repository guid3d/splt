"use client";
import React from "react";
import {
  ActionIcon,
  Center,
  Container,
  Modal as MantineModal,
  Stack,
  TextInput,
  rem,
} from "@mantine/core";
import { useCounter, useMediaQuery } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { Carousel } from "@mantine/carousel";
import { IconChevronLeft } from "@tabler/icons-react";
import { pb } from "@/lib/pb";
import { useAuth } from "@/providers/AuthProvider";
import EmojiActionButtion from "@/components/EmojiActionButtion";
import BigTextInput from "@/components/BigTextInput";
import ModalFooterButton from "@/components/ModalFooterButton";

type EditProfileModalProps = {
  opened: boolean;
  onClose: () => void;
};

const EditProfileModal = ({ opened, onClose }: EditProfileModalProps) => {
  const { currentUser } = useAuth();
  const isMobile = useMediaQuery("(max-width: 50em)") || false;
  const maxPage = 0;
  const confirmPage = 0;
  const [page, pageHandler] = useCounter(0, { min: 0, max: maxPage });

  const form = useForm({
    initialValues: {
      avatar: currentUser?.avatar ?? { emoji: "👤", unified: "" },
      name: currentUser?.name ?? "",
    },
    validate: {
      name: (v: string) => v.trim().length < 1 ? "Name is required" : null,
    },
  });

  const handleClose = () => {
    form.setValues({
      avatar: currentUser?.avatar ?? { emoji: "👤", unified: "" },
      name: currentUser?.name ?? "",
    });
    pageHandler.set(0);
    onClose();
  };

  const handleSave = async () => {
    if (form.validate().hasErrors) return;
    const userId = pb.authStore.record?.id;
    if (userId) {
      await pb.collection("users").update(userId, {
        name: form.values.name,
        avatar: form.values.avatar,
      });
      await pb.collection("users").authRefresh();
    }
  };

  return (
    <MantineModal.Root
      opened={opened}
      onClose={handleClose}
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
            aria-label="Back"
            onClick={handleClose}
          >
            <IconChevronLeft style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </MantineModal.Header>
        <MantineModal.Body>
          <Stack gap="xs" h={rem(550)} justify="space-between">
            <Carousel
              draggable={false}
              withControls={false}
              withKeyboardEvents={false}
              height={rem(430)}
            >
              <Carousel.Slide>
                <Container>
                  <Stack gap="xs">
                    <Center>
                      <EmojiActionButtion form={form} />
                    </Center>
                    <Center>
                      <BigTextInput
                        mb="md"
                        placeholder="Your Name"
                        maxLength={30}
                        {...form.getInputProps("name")}
                      />
                    </Center>
                    <TextInput
                      radius={0}
                      variant="unstyled"
                      size="md"
                      label="Username"
                      value={currentUser?.username ?? ""}
                      disabled
                    />
                    <TextInput
                      radius={0}
                      variant="unstyled"
                      size="md"
                      label="Email"
                      value={currentUser?.email ?? ""}
                      disabled
                    />
                  </Stack>
                </Container>
              </Carousel.Slide>
            </Carousel>
            <ModalFooterButton
              isMobile={isMobile}
              isModalOpened={opened}
              page={page}
              maxPage={maxPage}
              confirmPage={confirmPage}
              pageIncrement={() => {}}
              confirmFunction={handleSave}
              closeModalHandler={handleClose}
            />
          </Stack>
        </MantineModal.Body>
      </MantineModal.Content>
    </MantineModal.Root>
  );
};

export default EditProfileModal;
