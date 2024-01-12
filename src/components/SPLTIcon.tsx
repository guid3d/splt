import { Button, Group, Title, UnstyledButton, rem } from "@mantine/core";
import { IconReportMoney } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import SPLTWhiteIcon from "../../public/splt-icon-white.svg";
import SPLTBlackIcon from "../../public/splt-icon-black.svg";
import SPLTWhiteIconSmall from "../../public/splt-icon-white-small.svg";
import SPLTBlackIconSmall from "../../public/splt-icon-black-small.svg";

const SPLTIconBig = () => {
  const router = useRouter();
  return (
    <>
      <UnstyledButton p={rem(30)} lightHidden onClick={() => router.push("/")}>
        <SPLTWhiteIcon />
      </UnstyledButton>
      <UnstyledButton p={rem(30)} darkHidden onClick={() => router.push("/")}>
        <SPLTBlackIcon />
      </UnstyledButton>
    </>
  );
};

const SPLTIconSmall = () => {
  const router = useRouter();
  return (
    <>
      <UnstyledButton p={rem(5)} lightHidden onClick={() => router.push("/")}>
        <SPLTWhiteIconSmall />
      </UnstyledButton>
      <UnstyledButton p={rem(5)} darkHidden onClick={() => router.push("/")}>
        <SPLTBlackIconSmall />
      </UnstyledButton>
    </>
  );
};

export { SPLTIconBig, SPLTIconSmall };
