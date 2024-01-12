import { Button, Group, Title, UnstyledButton, rem } from "@mantine/core";
import { IconReportMoney } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import spltWhiteIcon from "../../public/splt-icon-white.svg";
import spltBlackIcon from "../../public/splt-icon-black.svg";

const SPLTIconBig = () => {
  const router = useRouter();
  return (
    <>
      <UnstyledButton lightHidden onClick={() => router.push("/")}>
        <Image
          priority
          src={spltWhiteIcon}
          alt="SPLT"
          // width={80}
          height={60}
          quality={100}
          // layout="fixed"
          style={{ margin: rem(30) }}
        />
      </UnstyledButton>
      <UnstyledButton darkHidden onClick={() => router.push("/")}>
        <Image
          priority
          src={spltBlackIcon}
          alt="SPLT"
          // width={80}
          height={60}
          quality={100}
          // layout="fixed"
          style={{ margin: rem(30) }}
        />
      </UnstyledButton>
    </>
  );
};

const SPLTIconSmall = () => {
  const router = useRouter();
  return (
    <>
      <UnstyledButton lightHidden onClick={() => router.push("/")}>
        <Image
          priority
          src={spltWhiteIcon}
          alt="SPLT"
          // width={80}
          height={20}
          quality={100}
          // layout="fixed"
          style={{ margin: rem(5) }}
        />
      </UnstyledButton>
      <UnstyledButton darkHidden onClick={() => router.push("/")}>
        <Image
          priority
          src={spltBlackIcon}
          alt="SPLT"
          // width={80}
          height={20}
          quality={100}
          // layout="fixed"
          style={{ margin: rem(5) }}
        />
      </UnstyledButton>
    </>
  );
};

export { SPLTIconBig, SPLTIconSmall };
