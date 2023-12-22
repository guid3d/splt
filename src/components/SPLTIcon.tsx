import { Button, Group, Title, UnstyledButton, rem } from "@mantine/core";
import { IconReportMoney } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

const SPLTIconBig = () => {
  return (
    <>
      <IconReportMoney style={{ width: rem(80), height: rem(80) }} />
      <Title>SPLT</Title>
    </>
  );
};

const SPLTIconSmall = () => {
  const router = useRouter();
  return (
    <UnstyledButton onClick={() => router.push("/")}>
      <Group>
        {/* <IconReportMoney style={{ width: rem(40), height: rem(40) }} /> */}
        <Title order={5}>SPLT</Title>
      </Group>
    </UnstyledButton>
  );
};

export { SPLTIconBig, SPLTIconSmall };
