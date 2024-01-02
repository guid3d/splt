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
      <Stack justify="space-between" pb={40}>
        <Stack>
          <Center>
            <EmojiActionButtion form={form} />
          </Center>
          {/* <TextInput
            label="Name"
            placeholder="Trip to chicken farm"
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Description (optional)"
            placeholder="Last weekend of March 2023"
            {...form.getInputProps("description")}
          /> */}
          <BigTextInput
            placeholder="Name of the group"
            {...form.getInputProps("name")}
          />
          <Textarea
            styles={{ input: { textAlign: "center" } }}
            radius={0}
            variant="unstyled"
            autosize
            minRows={2}
            maxRows={4}
            placeholder="Description (optional)"
            // placeholder="Last weekend of March 2023"
            {...form.getInputProps("description")}
          />
          <Space />
        </Stack>
      </Stack>
    </Container>
  );
};

export default PageSetName;
