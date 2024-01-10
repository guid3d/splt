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

type PageNotifyFinishProps = {
  groupUrl: string;
  // form: UseFormReturnType<GroupFormValues>;
};
const PageNotifyFinish = ({ groupUrl }: PageNotifyFinishProps) => {
  return (
    <Container>
      <Stack gap={"xl"}>
        <Center>
          <Avatar size="lg" radius="xl">
            <IconCheck size={rem(60)} />
          </Avatar>
        </Center>
        <Title order={3}>You&apos;re all set!</Title>
        <Text>
          Share this link with your friends to start collecting payments.
        </Text>
        <Text>{groupUrl}</Text>
      </Stack>
    </Container>
  );
};

export default PageNotifyFinish;
