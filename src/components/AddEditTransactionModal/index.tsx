import React, { useCallback, useEffect, useState } from "react";
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
  ExpenseTransactionData,
  GroupData,
  ModifiedTransactionFormValues,
  Participant,
  SplitType,
  StoreEmojiData,
  TransactionFormValues,
} from "@/types";
import PageSelectParticipant from "./components/PageSelectParticipant";
import dayjs from "dayjs";
import { useCreateExpense, useUpdateExpense } from "@/api";
import PageNotifyFinish from "@/components/PageNotifyFinish";
import { randomEmoji } from "@/utils/randomEmoji";

type AddEditTransactionModalProps = {
  groupData: GroupData;
  button: React.ReactNode;
  isEdit?: boolean;
  expenseData?: ExpenseTransactionData;
};

const AddEditTransactionModal = ({
  groupData,
  button,
  isEdit,
  expenseData,
}: AddEditTransactionModalProps) => {
  const [confirmSuccess, setConfirmSuccess] = useState<boolean>(false);
  const { groupId } = useParams<{ groupId: string }>();
  const createExpenseMutation = useCreateExpense();
  const updateExpenseMutation = useUpdateExpense();
  const maxPage = 3;
  const confirmPage = 2;
  const [page, pageHandler] = useCounter(0, {
    min: 0,
    max: maxPage,
  });

  useEffect(() => {
    if (!isEdit) {
      form.setFieldValue("avatar", { emoji: randomEmoji(), unified: "" });
    }
  }, [confirmSuccess]);

  const form = useForm({
    initialValues:
      isEdit && expenseData
        ? ({
            id: expenseData.id,
            groupInfo: expenseData.groupInfo,
            amount: expenseData.amount,
            transactionDateTime: new Date(expenseData.transactionDateTime),
            name: expenseData.name,
            avatar: expenseData.avatar,
            description: expenseData.description,
            paidBy: expenseData.paidBy,
            splitType: expenseData.splitType,
            everyoneIsParticipant: expenseData.everyoneIsParticipant,
            participants: expenseData.participants,
          } as TransactionFormValues)
        : ({
            groupInfo: groupId,
            amount: null,
            transactionDateTime: new Date(),
            name: "",
            avatar: { emoji: randomEmoji(), unified: "" },
            description: "",
            paidBy: groupData.expand.participants[0].id,
            splitType: SplitType.Equal,
            everyoneIsParticipant: true,
            participants: [],
          } as TransactionFormValues),

    validate: (values) => {
      if (page === 0) {
        return {
          amount: values.amount
            ? values.amount < 0.01
              ? "Amount must be > 0"
              : null
            : "Amount must be > 0",
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
          if (isEdit) {
            updateExpenseMutation.mutate(modifiedFormValues, {
              onSuccess: (data) => {
                setConfirmSuccess(true);
                console.log(data);
              },
            });
          } else {
            createExpenseMutation.mutate(modifiedFormValues, {
              onSuccess: (data) => {
                setConfirmSuccess(true);
                console.log(data);
              },
            });
          }
        }}
        onLastPageHandler={() => {
          form.reset();
        }}
        onCloseModalClick={() => {
          form.reset();
        }}
        nextButtonIsPending={
          createExpenseMutation.isPending || updateExpenseMutation.isPending
        }
        confirmSuccess={confirmSuccess}
        setConfirmSuccess={setConfirmSuccess}
        button={button}
        headerTitle={isEdit ? "Edit Expense" : "Add Expense"}
        keepButtonWhenOpened
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
          <PageNotifyFinish
            title={isEdit ? "Transaction is edited" : "Transaction is added"}
          />
        </Carousel.Slide>
      </Modal>
    </form>
  );
};

export default AddEditTransactionModal;
