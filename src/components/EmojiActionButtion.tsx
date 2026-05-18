import {
  ActionIcon,
  Center,
  Title,
  rem,
  Modal as MantineModal,
  Stack,
  Indicator,
  Loader,
} from "@mantine/core";
import { Theme } from "emoji-picker-react";
import dynamic from "next/dynamic";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconChevronLeft, IconPencil, IconRefresh } from "@tabler/icons-react";
import { UseFormReturnType } from "@mantine/form";
import { useEffect, useRef, useState } from "react";
import { useEmojiSuggestions } from "@/hooks/useEmojiSuggestions";

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

type EmojiActionButtionProps = {
  form: UseFormReturnType<any>;
  suggestionQuery?: string;
  onRandomize?: () => void;
};

const EmojiActionButtion = ({
  form,
  suggestionQuery,
  onRandomize,
}: EmojiActionButtionProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 50em)") || false;
  const wasManuallySet = useRef(false);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const { suggestions, loading } = useEmojiSuggestions(suggestionQuery ?? "");

  useEffect(() => {
    if (!wasManuallySet.current && suggestions.length > 0) {
      form.setFieldValue("avatar", { emoji: suggestions[0], unified: "" });
      setSuggestionIndex(0);
    }
  }, [suggestions]);

  const handleCycle = () => {
    if (suggestions.length < 2) return;
    const next = (suggestionIndex + 1) % suggestions.length;
    setSuggestionIndex(next);
    form.setFieldValue("avatar", { emoji: suggestions[next], unified: "" });
  };

  const showCycleButton =
    suggestions.length > 1 && !wasManuallySet.current && !opened;

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
        <MantineModal.Content radius={isMobile ? 0 : "lg"}>
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
                  height={390}
                  theme={Theme.AUTO}
                  onEmojiClick={(res) => {
                    wasManuallySet.current = true;
                    form.setFieldValue("avatar", {
                      emoji: res.emoji,
                      unified: res.unified,
                    });
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
          offset={13}
          position="bottom-end"
          size={35}
          withBorder
          label={<IconPencil size={20} width={20} height={20} stroke={1.5} />}
          onClick={open}
        >
          <div style={{ position: "relative" }}>
            <ActionIcon
              variant="default"
              size={rem(100)}
              radius={rem(100)}
              onClick={open}
              style={{
                opacity: loading && !wasManuallySet.current ? 0.5 : 1,
                transition: "opacity 0.2s",
              }}
            >
              {loading && !wasManuallySet.current ? (
                <Loader size="sm" />
              ) : (
                <Title order={1} style={{ fontSize: rem(60) }}>
                  {form.values.avatar.emoji}
                </Title>
              )}
            </ActionIcon>
            {(showCycleButton || onRandomize) && (
              <ActionIcon
                variant="default"
                size={rem(28)}
                radius={rem(28)}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  zIndex: 1,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onRandomize) onRandomize();
                  else handleCycle();
                }}
              >
                <IconRefresh size={14} stroke={1.5} />
              </ActionIcon>
            )}
          </div>
        </Indicator>
      )}
    </>
  );
};

export default EmojiActionButtion;
