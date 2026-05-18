import {
  ActionIcon,
  Affix,
  Button,
  Center,
  Container,
  Input,
  Space,
  Stack,
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

type PageSetNameProps = {
  form: UseFormReturnType<GroupFormValues>;
};
const PageSetName = ({ form }: PageSetNameProps) => {
  return (
    <Container>
      <Stack gap={"xl"}>
        <Center>
          <EmojiActionButtion form={form} />
        </Center>
        <BigTextInput
          placeholder="Name of the group"
          {...form.getInputProps("name")}
        />
        <Textarea
          size="md"
          styles={{ input: { textAlign: "center" } }}
          radius={0}
          variant="unstyled"
          autosize
          minRows={2}
          maxRows={6}
          placeholder="Description (optional)"
          // placeholder="Last weekend of March 2023"
          {...form.getInputProps("description")}
        />
      </Stack>
    </Container>
  );
};

export default PageSetName;
