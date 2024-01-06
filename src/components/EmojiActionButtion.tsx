import {
  ActionIcon,
  Center,
  Title,
  rem,
  Modal as MantineModal,
  Stack,
  Indicator,
} from "@mantine/core";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconChevronLeft } from "@tabler/icons-react";
import { UseFormReturnType } from "@mantine/form";
import { GroupFormValues } from "@/types";
import { IconEdit } from "@tabler/icons-react";
import { IconPencil } from "@tabler/icons-react";

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

type EmojiActionButtionProps = {
  form: UseFormReturnType<any>;
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
            <Stack mih={rem(550)} justify="space-between">
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
        <Indicator
          color="gray"
          onClick={open}
          offset={13}
          position="bottom-end"
          size={35}
          withBorder
          label={<IconPencil size={20} width={20} height={20} stroke={1.5} />}
        >
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
        </Indicator>
      )}
    </>
  );
};

export default EmojiActionButtion;
