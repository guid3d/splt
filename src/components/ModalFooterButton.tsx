import { Affix, Button } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React from "react";
import { BillFormValues } from "./AddBillModal";
import { useRouter } from "next/navigation";

type ModalFooterButtonProps = {
  form: UseFormReturnType<BillFormValues>;
  isMobile: boolean;
  page: number;
  isModalOpened: boolean;
  pageIncrement: () => void;
};

const ModalFooterButton = ({
  form,
  isMobile,
  page,
  isModalOpened,
  pageIncrement,
}: ModalFooterButtonProps) => {
  const router = useRouter();

  if (isMobile) {
    if (isModalOpened) {
      if (page === 2) {
        return (
          <Affix style={{ bottom: 20, left: 20, right: 20 }}>
            <Button
              variant="light"
              fullWidth
              onClick={() => {
                console.log(form.values);
                router.push(`/bill/${"billIdxxx"}`);
              }}
              radius="xl"
            >
              Confirm
            </Button>
          </Affix>
        );
      } else {
        return (
          <Affix style={{ bottom: 20, left: 20, right: 20 }}>
            <Button
              variant="light"
              fullWidth
              onClick={() => {
                pageIncrement();
              }}
              radius="xl"
            >
              Next
            </Button>
          </Affix>
        );
      }
    }
  } else {
    if (isModalOpened) {
      if (page === 2) {
        return (
          <Button
            variant="light"
            fullWidth
            onClick={() => {
              console.log(form.values);
              router.push(`/bill/${"billIdxxx"}`);
            }}
            radius="xl"
          >
            Confirm
          </Button>
        );
      } else {
        return (
          <Button
            variant="light"
            fullWidth
            onClick={() => {
              pageIncrement();
            }}
            radius="xl"
          >
            Next
          </Button>
        );
      }
    }
  }
};

export default ModalFooterButton;
