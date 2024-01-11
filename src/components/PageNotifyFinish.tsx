import {
  ActionIcon,
  Affix,
  Avatar,
  Button,
  Center,
  Container,
  Input,
  Space,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
  rem,
} from "@mantine/core";
import React from "react";
import { useForm, UseFormReturnType } from "@mantine/form";
import { GroupFormValues } from "@/types";
import EmojiActionButtion from "@/components/EmojiActionButtion";
import BigTextInput from "@/components/BigTextInput";
import { IconCheck } from "@tabler/icons-react";
import CopyButton from "@/components/CopyButton";
import { IconLink } from "@tabler/icons-react";

type PageNotifyFinishProps = {
  title: string;
  // groupUrl: string;
  // form: UseFormReturnType<GroupFormValues>;
};
const PageNotifyFinish = ({ title }: PageNotifyFinishProps) => {
  // const urlPath = window.location.href;
  // const shareLink = urlPath + groupUrl;
  return (
    <Container mah={rem(300)}>
      <Stack gap={"xl"}>
        <Center>
          <Avatar color="green" size="xl" radius={rem(100)}>
            <IconCheck style={{ width: rem(60), height: rem(60) }} />
          </Avatar>
        </Center>
        <Center>
          <Title order={3}>{title}</Title>
        </Center>
      </Stack>
    </Container>
  );
};

export default PageNotifyFinish;
