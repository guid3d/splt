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

type PageSetNameProps = {
  form: UseFormReturnType<BillFormValues>;
  isModalOpened: boolean;
  pageHandler: any; //TODO: find type for this
};
const PageSetName = ({
  form,
  isModalOpened,
  pageHandler,
}: PageSetNameProps) => {
  return (
    <div>
      <Container pb={40}>
        <Stack justify="space-between">
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
      <Affix style={{ bottom: 20, left: 20, right: 20 }}>
        <Button
          variant="light"
          fullWidth
          onClick={() => {
            pageHandler.increment();
          }}
        >
          Confirm
        </Button>
      </Affix>
    </div>
  );
};

export default PageSetName;
