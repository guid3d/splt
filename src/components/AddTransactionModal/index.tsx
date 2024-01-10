import React, { useCallback, useState } from "react";
import { useCounter, useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  Button,
  Affix,
  Center,
  ActionIcon,
  Stack,
  rem,
  Text,
} from "@mantine/core";
import { UseFormReturnType, useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { IconChevronLeft } from "@tabler/icons-react";
import { Carousel, CarouselSlide, Embla } from "@mantine/carousel";
import ModalFooterButton from "../ModalFooterButton";
import { useParams, useRouter } from "next/navigation";
import PageSetAmount from "./components/PageSetAmount";
import PageSetDetails from "./components/PageSetDetails";
import Modal from "@/components/Modal";
import {
  GroupData,
  ModifiedTransactionFormValues,
  Participant,
  SplitType,
  StoreEmojiData,
  TransactionFormValues,
} from "@/types";
import PageSelectParticipant from "./components/PageSelectParticipant";
import dayjs from "dayjs";
import { useCreateExpense } from "@/api";
import PageNotifyFinish from "./components/PageNotifyFinish";

type AddTransactionModalProps = {
  groupData: GroupData;
};

const AddTransactionModal = ({ groupData }: AddTransactionModalProps) => {
  // console.log(dayjs().toISOString());
  // const [timeNow, setTimeNow] = useState(() => dayjs().toISOString());
  // console.log(timeNow);

  // const timeNow = dayjs().toISOString();
  // console.log(da)
  const [confirmSuccess, setConfirmSuccess] = useState<boolean>(false);
  const { groupId } = useParams<{ groupId: string }>();
  const createExpenseMutation = useCreateExpense();
  const maxPage = 3;
  const confirmPage = 2;
  const [page, pageHandler] = useCounter(0, {
    min: 0,
    max: maxPage,
  });
  const form = useForm({
    initialValues: {
      groupInfo: groupId,
      amount: 0,
      transactionDateTime: new Date(),
      name: "",
      avatar: { emoji: "😄", unified: "1f604" },
      description: "",
      paidBy: groupData.expand.participants[0].id,
      splitType: SplitType.Equal,
      everyoneIsParticipant: true,
      participants: [],
    } as TransactionFormValues,

    validate: (values) => {
      if (page === 0) {
        return {
          amount: values.amount < 0.01 ? "Amount must be > 0" : null,
          paidBy: values.paidBy.length < 1 ? "Paid by must be selected" : null,
        };
      }

      if (page === 1) {
        return {
          name:
            values.name.length < 1 ? "Transaction name must be given" : null,
          transactionDateTime: !values.transactionDateTime.toISOString()
            ? "Transaction date must be given"
            : null,
        };
      }

      if (page === 2) {
        return {
          participants:
            values.participants.length < 1
              ? "Participants must include at least 1 person"
              : null,
        };
      }

      return {};
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Modal
        form={form}
        page={page}
        pageHandler={pageHandler}
        maxPage={maxPage}
        confirmPage={confirmPage}
        onConfirmClick={() => {
          const modifiedFormValues: ModifiedTransactionFormValues = {
            ...form.values,
            transactionDateTime: form.values.transactionDateTime.toISOString(),
          };
          console.log(modifiedFormValues);
          // console.log(form.values);
          createExpenseMutation.mutate(modifiedFormValues, {
            onSuccess: (data) => {
              setConfirmSuccess(true);
              console.log(data);
            },
          });
        }}
        onLastPageHandler={() => {
          form.reset();
        }}
        onCloseModalClick={() => {
          form.reset();
        }}
        nextButtonIsPending={createExpenseMutation.isPending}
        confirmSuccess={confirmSuccess}
        setConfirmSuccess={setConfirmSuccess}
        button={
          <Text fw={600} c="blue">
            Add
          </Text>
          // <Affix
          //   // TODO: Find the way to center the button without cannot touching behind this button
          //   position={{ bottom: 20, right: 20 }}
          // >
          //   <Center>
          //     <ActionIcon
          //       variant="filled"
          //       color="gray"
          //       size="xl"
          //       radius="xl"
          //       aria-label="Add Transaction"
          //     >
          //       <IconPlus
          //         style={{ width: "70%", height: "70%" }}
          //         stroke={1.5}
          //       />
          //     </ActionIcon>
          //   </Center>
          // </Affix>
        }
      >
        <Carousel.Slide>
          <PageSetAmount form={form} groupData={groupData} />
        </Carousel.Slide>
        <Carousel.Slide>
          <PageSetDetails form={form} />
        </Carousel.Slide>
        <Carousel.Slide>
          <PageSelectParticipant form={form} groupData={groupData} />
        </Carousel.Slide>
        <Carousel.Slide>
          <PageNotifyFinish />
        </Carousel.Slide>
      </Modal>
    </form>
  );
};

export default AddTransactionModal;
