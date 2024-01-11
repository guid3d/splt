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
import { IconCheck } from "@tabler/icons-react";

type PageNotifyFinishProps = {
  // groupUrl: string;
  // form: UseFormReturnType<GroupFormValues>;
};
const PageNotifyFinish = ({}: PageNotifyFinishProps) => {
  return (
    <Container mah={rem(300)}>
      <Stack gap={"xl"}>
        <Center>
          <Avatar color="green" size="xl" radius={rem(100)}>
            <IconCheck style={{ width: rem(60), height: rem(60) }} />
          </Avatar>
        </Center>
        <Center>
          <Title order={3}>Participant is Added</Title>
        </Center>
      </Stack>
    </Container>
  );
};

export default PageNotifyFinish;
