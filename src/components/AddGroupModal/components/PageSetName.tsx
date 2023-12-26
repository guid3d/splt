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
  Title,
  rem,
} from "@mantine/core";
import React from "react";
import { useForm, UseFormReturnType } from "@mantine/form";
import { GroupFormValues } from "@/types";
import EmojiActionButtion from "@/components/EmojiActionButtion";

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
          <TextInput
            label="Name"
            placeholder="Trip to chicken farm"
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Description (optional)"
            placeholder="Last weekend of March 2023"
            {...form.getInputProps("description")}
          />

          {/* 
          TODO: try this style
          <TextInput
            styles={{ input: { textAlign: "center" } }}
            radius={0}
            variant="unstyled"
            // label="Name"
            placeholder="Name of the group"
            size={rem(30)}
            {...form.getInputProps("name")}
          />
          <TextInput
            styles={{ input: { textAlign: "center" } }}
            radius={0}
            variant="unstyled"
            // label="Name"
            // size={rem(30)}
            placeholder="Description (optional)"
            // placeholder="Last weekend of March 2023"
            {...form.getInputProps("description")}
          /> */}
          <Space />
        </Stack>
      </Stack>
    </Container>
  );
};

export default PageSetName;
