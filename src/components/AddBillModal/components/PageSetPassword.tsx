import { Center, Container, PinInput, Stack, Text } from "@mantine/core";
import React from "react";
import { useForm, UseFormReturnType } from "@mantine/form";
import { BillFormValues } from "..";

type PageSetPasswordProps = {
  form: UseFormReturnType<BillFormValues>;
};
const PageSetPassword = ({ form }: PageSetPasswordProps) => {
  return (
    <>
      <Container pb={40}>
        <Stack gap={"xl"}>
          <Center>
            <Text fw={500}>Set Password</Text>
          </Center>
          <Center>
            <PinInput size="xl" {...form.getInputProps("password")} />
          </Center>
        </Stack>
      </Container>
    </>
  );
};

export default PageSetPassword;
