import { Center, Group, Text, rem } from "@mantine/core";
import React from "react";

const MadeWithLove = () => {
  return (
    <Center>
      <Group gap={rem(4)} mb={rem(50)}>
        <Text size="sm">Made with</Text>
        <Text size="sm" c="red">
          ♥
        </Text>
        <Text size="sm">by</Text>
        <Text
          size="sm"
          td="underline"
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 77 }}
          component="a"
          href="https://github.com/guid3d"
        >
          @guid3d
        </Text>
      </Group>
    </Center>
  );
};

export default MadeWithLove;
