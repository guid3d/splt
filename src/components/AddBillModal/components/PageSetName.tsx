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
import { BillFormValues } from "..";
import ModalFooterButton from "@/components/ModalFooterButton";

type PageSetNameProps = {
  form: UseFormReturnType<BillFormValues>;
  // // isModalOpened: boolean;
  // page: number;
  // // scrollBack: () => void;
  // pageIncrement: () => void;
  // isMobile: boolean;
};
const PageSetName = ({ form }: PageSetNameProps) => {
  return (
    <>
      <Container>
        <Stack justify="space-between" pb={40}>
          <Stack>
            <Center>
              {/* <Input
              variant="filled"
              size={rem(60)}
              radius={rem(60)}
              placeholder="🐥"
              styles={{
                input: {
                  textAlign: "center",
                  width: rem(100),
                  height: rem(100),
                },
              }}
              maxLength={2}
            /> */}
              <ActionIcon variant="default" size={rem(100)} radius={rem(100)}>
                <Title order={1} style={{ fontSize: rem(60) }}>
                  {form.values.avatar}
                </Title>
              </ActionIcon>
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
            <Space />
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default PageSetName;
