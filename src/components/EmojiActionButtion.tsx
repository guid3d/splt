import {
  ActionIcon,
  Center,
  Title,
  rem,
  Modal as MantineModal,
  Stack,
} from "@mantine/core";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconChevronLeft } from "@tabler/icons-react";
import { UseFormReturnType } from "@mantine/form";
import { TransactionFormValues } from "./AddTransactionModal";

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

type EmojiActionButtionProps = {
  form: UseFormReturnType<TransactionFormValues>;
};

const EmojiActionButtion = ({ form }: EmojiActionButtionProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 50em)") || false;
  // const [chosenEmoji, setChosenEmoji] = useState<StoreEmojiData>({
  //   emoji: form.values.avatar.emoji,
  //   unified: form.values.avatar.unified,
  // });
  return (
    <>
      <MantineModal.Root
        opened={opened}
        onClose={close}
        fullScreen={isMobile}
        transitionProps={{ transition: "fade", duration: 200 }}
        centered
        zIndex={201}
      >
        <MantineModal.Overlay />
        <MantineModal.Content radius={isMobile ? 0 : "l"}>
          <MantineModal.Header>
            <ActionIcon
              variant="transparent"
              color="gray"
              aria-label="Settings"
              onClick={close}
            >
              <IconChevronLeft
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
          </MantineModal.Header>
          <MantineModal.Body>
            <Stack mih={rem(500)} justify="space-between">
              <Center>
                <ActionIcon variant="default" size={rem(100)} radius={rem(100)}>
                  <Title order={1} style={{ fontSize: rem(60) }}>
                    {form.values.avatar.emoji}
                  </Title>
                </ActionIcon>
              </Center>
              <Center>
                <Picker
                  // style={{ border: "none" }}
                  height={390}
                  theme={Theme.AUTO}
                  onEmojiClick={(res) => {
                    form.setFieldValue("avatar", {
                      emoji: res.emoji,
                      unified: res.unified,
                    });
                    // setChosenEmoji({ emoji: res.emoji, unified: res.unified });
                    close();
                  }}
                  previewConfig={{ showPreview: false }}
                  lazyLoadEmojis
                />
              </Center>
            </Stack>
          </MantineModal.Body>
        </MantineModal.Content>
      </MantineModal.Root>
      {!opened && (
        <ActionIcon
          variant="default"
          size={rem(100)}
          radius={rem(100)}
          onClick={open}
        >
          <Title order={1} style={{ fontSize: rem(60) }}>
            {form.values.avatar.emoji}
          </Title>
        </ActionIcon>
      )}
    </>
  );
};

export default EmojiActionButtion;
