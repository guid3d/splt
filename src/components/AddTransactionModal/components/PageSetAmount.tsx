import EmojiActionButtion from "@/components/EmojiActionButtion";
import { Center, Container } from "@mantine/core";
import React from "react";
import { TransactionFormValues } from "..";
import { UseFormReturnType } from "@mantine/form";

type PageSetAmountProps = {
  form: UseFormReturnType<TransactionFormValues>;
  // // isModalOpened: boolean;
  // page: number;
  // // scrollBack: () => void;
  // pageIncrement: () => void;
  // isMobile: boolean;
};

const PageSetAmount = ({ form }: PageSetAmountProps) => {
  return (
    <Container>
      <Center>
        <EmojiActionButtion form={form} />
      </Center>
    </Container>
  );
};

export default PageSetAmount;
