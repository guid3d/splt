"use client";

import {
  ActionIcon,
  Center,
  Title,
  rem,
  Modal as MantineModal,
  Stack,
  Indicator,
  Container,
  Flex,
} from "@mantine/core";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconChevronLeft } from "@tabler/icons-react";
import { UseFormReturnType } from "@mantine/form";
import { GroupFormValues } from "@/types";
import { IconEdit } from "@tabler/icons-react";
import { IconPencil } from "@tabler/icons-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useExpense, useTotalSpend } from "@/api";
import ExpensePage from "./components/ExpensePage";
import PaybackPage from "./components/PaybackPage";

const TransactionPage = () => {
  // const { transactionId } = useParams<{ transactionId: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isExpense = searchParams.has("e");
  const isPayback = searchParams.has("p");
  const { groupId } = useParams<{ groupId: string }>();
  const groupData = useTotalSpend(groupId);

  return (
    <>
      <Container size="xs" mt="md">
        <Flex justify="space-between">
          <ActionIcon
            variant="transparent"
            color="gray"
            aria-label="Back"
            onClick={() => router.back()}
          >
            <IconChevronLeft
              // style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ActionIcon>
        </Flex>
        <Container>
          {isExpense ? <ExpensePage /> : isPayback ? <PaybackPage /> : null}
        </Container>
      </Container>
    </>
  );
};

export default TransactionPage;
