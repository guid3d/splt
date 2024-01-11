import { Affix, Button } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React, { useState } from "react";
import { GroupFormValues } from "@/types";
// import { useRouter } from "next/navigation";

type ModalFooterButtonProps = {
  // form: UseFormReturnType<GroupFormValues>;
  nextButtonDisabled?: boolean;
  isMobile: boolean;
  page: number;
  maxPage: number;
  confirmPage: number;
  isModalOpened: boolean;
  pageIncrement: () => void;
  confirmFunction: () => void;
  closeModalHandler: () => void;
  nextButtonIsPending?: boolean;
  onLastPageHandler?: () => void;
};

const ModalFooterButton = ({
  // form,
  isMobile,
  page,
  maxPage,
  confirmPage,
  isModalOpened,
  pageIncrement,
  confirmFunction,
  nextButtonDisabled,
  closeModalHandler,
  nextButtonIsPending,
  onLastPageHandler,
}: ModalFooterButtonProps) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleClick = () => {
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 300); // Re-enable the button after 3 seconds
  };
  // const router = useRouter();

  if (isMobile) {
    // Mobile
    if (isModalOpened) {
      if (page < maxPage) {
        if (page === confirmPage) {
          // Confirm then go to next page
          return (
            <Affix style={{ bottom: 20, left: 20, right: 20 }} zIndex={200}>
              <Button
                // variant="light"
                fullWidth
                onClick={() => {
                  handleClick();
                  confirmFunction();
                  //pageIncrement();
                  // TODO: Now handle pageIncrement in the parent component (e.g. AddGroupModal), find a way to handle it here
                }}
                radius="xl"
                // type="submit"
                disabled={nextButtonDisabled || isButtonDisabled}
                loading={nextButtonIsPending}
                loaderProps={{ type: "dots" }}
              >
                Confirm
              </Button>
            </Affix>
          );
        } else {
          return (
            <Affix style={{ bottom: 20, left: 20, right: 20 }} zIndex={200}>
              <Button
                // variant="light"
                fullWidth
                onClick={() => {
                  handleClick();
                  pageIncrement();
                }}
                radius="xl"
                disabled={nextButtonDisabled || isButtonDisabled}
                loading={nextButtonIsPending}
                loaderProps={{ type: "dots" }}
              >
                Next
              </Button>
            </Affix>
          );
        }
      } else {
        // Page is maxPage
        if (page === confirmPage) {
          // Confirm then go close modal
          return (
            <Affix style={{ bottom: 20, left: 20, right: 20 }} zIndex={200}>
              <Button
                // variant="light"
                fullWidth
                onClick={() => {
                  handleClick();
                  confirmFunction();
                  closeModalHandler();
                  //pageIncrement();
                  // TODO: Now handle pageIncrement in the parent component (e.g. AddGroupModal), find a way to handle it here
                }}
                radius="xl"
                // type="submit"
                disabled={nextButtonDisabled || isButtonDisabled}
                loading={nextButtonIsPending}
                loaderProps={{ type: "dots" }}
              >
                Confirm
              </Button>
            </Affix>
          );
        } else {
          // Just close modal
          return (
            <Affix style={{ bottom: 20, left: 20, right: 20 }} zIndex={200}>
              <Button
                // variant="light"
                fullWidth
                onClick={() => {
                  handleClick();
                  // pageIncrement();
                  closeModalHandler();
                  onLastPageHandler && onLastPageHandler();
                }}
                radius="xl"
                disabled={nextButtonDisabled || isButtonDisabled}
                loading={nextButtonIsPending}
                loaderProps={{ type: "dots" }}
              >
                Done
              </Button>
            </Affix>
          );
        }
      }
    }
  } else {
    // Desktop
    if (isModalOpened) {
      if (page < maxPage) {
        if (page === confirmPage) {
          // Confirm then go to next page
          return (
            <Button
              // variant="light"
              fullWidth
              onClick={() => {
                handleClick();
                confirmFunction();
                //pageIncrement();
                // TODO: Now handle pageIncrement in the parent component (e.g. AddGroupModal), find a way to handle it here
              }}
              radius="xl"
              // type="submit"
              disabled={nextButtonDisabled || isButtonDisabled}
              loading={nextButtonIsPending}
              loaderProps={{ type: "dots" }}
            >
              Confirm
            </Button>
          );
        } else {
          return (
            <Button
              // variant="light"
              fullWidth
              onClick={() => {
                handleClick();
                pageIncrement();
              }}
              radius="xl"
              disabled={nextButtonDisabled || isButtonDisabled}
              loading={nextButtonIsPending}
              loaderProps={{ type: "dots" }}
            >
              Next
            </Button>
          );
        }
      } else {
        // Page is maxPage
        if (page === confirmPage) {
          // Confirm then go close modal
          return (
            <Button
              // variant="light"
              fullWidth
              onClick={() => {
                handleClick();
                confirmFunction();
                closeModalHandler();
                //pageIncrement();
                // TODO: Now handle pageIncrement in the parent component (e.g. AddGroupModal), find a way to handle it here
              }}
              radius="xl"
              // type="submit"
              disabled={nextButtonDisabled || isButtonDisabled}
              loading={nextButtonIsPending}
              loaderProps={{ type: "dots" }}
            >
              Confirm
            </Button>
          );
        } else {
          // Just close modal
          return (
            <Button
              // variant="light"
              fullWidth
              onClick={() => {
                handleClick();
                // pageIncrement();
                closeModalHandler();
                onLastPageHandler && onLastPageHandler();
              }}
              radius="xl"
              disabled={nextButtonDisabled || isButtonDisabled}
              loading={nextButtonIsPending}
              loaderProps={{ type: "dots" }}
            >
              Done
            </Button>
          );
        }
      }
    }
  }
};

export default ModalFooterButton;
