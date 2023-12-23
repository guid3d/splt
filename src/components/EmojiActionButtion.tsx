import { ActionIcon, Title, rem } from "@mantine/core";
import EmojiPicker, { Theme } from "emoji-picker-react";
import React, { useState } from "react";

type EmojiActionButtionProps = {
  avatar: string;
};

const EmojiActionButtion = ({ avatar }: EmojiActionButtionProps) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  return (
    <>
      <ActionIcon variant="default" size={rem(100)} radius={rem(100)}>
        <Title order={1} style={{ fontSize: rem(60) }}>
          {avatar}
        </Title>
      </ActionIcon>
      <EmojiPicker
        theme={Theme.AUTO}
        onEmojiClick={(emoji) => {
          console.log(emoji);
        }}
      />
    </>
  );
};

export default EmojiActionButtion;
