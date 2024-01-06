import { Center, Container, PinInput, Stack, Text } from "@mantine/core";
import React from "react";
import { useForm, UseFormReturnType } from "@mantine/form";
import { GroupFormValues } from "@/types";

type PageSetPasswordProps = {
  form: UseFormReturnType<GroupFormValues>;
};
const PageSetPassword = ({ form }: PageSetPasswordProps) => {
  return (
    <>
      <Container>
        <Stack gap={"xl"}>
          <Center>
            <Text fw={500}>Set Password</Text>
          </Center>
          <Center>
            <PinInput
              size="xl"
              radius="lg"
              {...form.getInputProps("password")}
            />
          </Center>
        </Stack>
      </Container>
    </>
  );
};

export default PageSetPassword;
