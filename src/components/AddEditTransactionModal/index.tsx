import React, { useEffect, useState } from "react";
import { useCounter } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { Carousel } from "@mantine/carousel";
import { useParams } from "next/navigation";
import PageSetAmount from "./components/PageSetAmount";
import PageSetDetails from "./components/PageSetDetails";
import Modal from "@/components/Modal";
import {
  ExpenseTransactionData,
  GroupData,
  ModifiedTransactionFormValues,
  SplitData,
  SplitType,
  TransactionFormValues,
} from "@/types";
import { useCreateExpense, useUpdateExpense } from "@/api";
import PageNotifyFinish from "@/components/PageNotifyFinish";
import { randomEmoji } from "@/utils/randomEmoji";
import PageSetSplit from "./components/PageSetSplit";

type AddEditTransactionModalProps = {
  groupData: GroupData;
  button: React.ReactNode;
  isEdit?: boolean;
  expenseData?: ExpenseTransactionData;
  localUserId?: string | null;
};

const AddEditTransactionModal = ({
  groupData,
  button,
  isEdit,
  expenseData,
  localUserId,
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
        ? // TODO: Change this to form.initialize from mantine
          ({
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
            paidBy: localUserId ?? groupData.expand.participants[0].id,
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
        let splitAmountError: string | null = null;
        if (values.splitType === SplitType.Amount) {
          const totalEntered = splitData.reduce(
            (sum, split) => sum + (split.amount || 0),
            0
          );
          const remaining = (values.amount || 0) - totalEntered;
          if (remaining > 0.001) {
            splitAmountError = "Remaining amount must be fully distributed";
          } else if (remaining < -0.001) {
            splitAmountError = "Total split amount exceeds the transaction amount";
          }
        }

        return {
          participants:
            values.participants.length < 1
              ? "Participants must include at least 1 person"
              : null,
          splitAmountError,
        };
      }

      return {};
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const [splitData, setSplitData] = useState<SplitData[]>(
    isEdit && expenseData && expenseData.splits && expenseData.splits.length > 0
      ? expenseData.splits.map((s) => ({
          expenseId: expenseData.id,
          participantId: s.participantId,
          part: s.part,
          amount: s.amount,
        }))
      : [
          {
            expenseId: "",
            participantId: "",
            part: 0,
            amount: 0,
          },
        ]
  );

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
            splits: splitData,
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
          form.setFieldValue("transactionDateTime", new Date());
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
          <PageSetDetails
            form={form}
            suggestionQuery={!isEdit ? form.values.name : undefined}
          />
        </Carousel.Slide>
        {/* <Carousel.Slide>
          <PageSelectParticipant
            form={form}
            groupData={groupData}
            splitData={splitData}
            setSplitData={setSplitData}
          />
        </Carousel.Slide> */}
        <Carousel.Slide>
          <PageSetSplit
            form={form}
            groupData={groupData}
            splitData={splitData}
            setSplitData={setSplitData}
          />
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
