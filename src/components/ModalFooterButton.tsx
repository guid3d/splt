import { Affix, Button } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React from "react";
import { GroupFormValues } from "@/types";
// import { useRouter } from "next/navigation";

type ModalFooterButtonProps = {
  // form: UseFormReturnType<GroupFormValues>;
  nextButtonDisabled?: boolean;
  isMobile: boolean;
  page: number;
  maxPage: number;
  isModalOpened: boolean;
  pageIncrement: () => void;
  confirmFunction: () => void;
};

const ModalFooterButton = ({
  // form,
  isMobile,
  page,
  maxPage,
  isModalOpened,
  pageIncrement,
  confirmFunction,
  nextButtonDisabled,
}: ModalFooterButtonProps) => {
  // const router = useRouter();

  if (isMobile) {
    // Mobile
    if (isModalOpened) {
      if (page === maxPage) {
        return (
          <Affix style={{ bottom: 20, left: 20, right: 20 }} zIndex={200}>
            <Button
              variant="light"
              fullWidth
              onClick={confirmFunction}
              radius="xl"
              // type="submit"
              disabled={nextButtonDisabled}
            >
              Confirm
            </Button>
          </Affix>
        );
      } else {
        return (
          <Affix style={{ bottom: 20, left: 20, right: 20 }} zIndex={200}>
            <Button
              variant="light"
              fullWidth
              onClick={() => {
                pageIncrement();
              }}
              radius="xl"
              disabled={nextButtonDisabled}
            >
              Next
            </Button>
          </Affix>
        );
      }
    }
  } else {
    // Desktop
    if (isModalOpened) {
      if (page === maxPage) {
        return (
          <Button
            variant="light"
            fullWidth
            onClick={confirmFunction}
            radius="xl"
            // type="submit"
            disabled={nextButtonDisabled}
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
            disabled={nextButtonDisabled}
          >
            Next
          </Button>
        );
      }
    }
  }
};

export default ModalFooterButton;
