import React, { useState } from "react";
import { Affix, Button, Center, Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons-react";
import { IconCross } from "@tabler/icons-react";
import { IconX } from "@tabler/icons-react";

type ConfirmButtonProps = {
  isModalOpened: boolean;
  confirmFunction: () => void;
  isPending?: boolean;
};

const ConfirmButton = ({
  isModalOpened,
  confirmFunction,
  isPending,
}: ConfirmButtonProps) => {
  const [confirmPressed, setConfirmPressed] = useState(false);
  const isMobile = useMediaQuery("(max-width: 50em)") || false;

  if (isMobile) {
    // Mobile
    if (isModalOpened) {
      return (
        <Affix style={{ bottom: 20, left: 20, right: 20 }} zIndex={200}>
          <>
            {!confirmPressed ? (
              <Button fullWidth onClick={() => setConfirmPressed(true)}>
                I have sent the money
              </Button>
            ) : (
              <Center>
                <Group>
                  <Button
                    // styles={{ root: { width: "40%" } }}
                    leftSection={<IconX size={18} />}
                    variant="filled"
                    color="red"
                    onClick={() => setConfirmPressed(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    loading={isPending}
                    loaderProps={{ type: "dots" }}
                    // styles={{ root: { width: "40%" } }}
                    leftSection={<IconCheck />}
                    variant="filled"
                    color="green"
                    onClick={confirmFunction}
                  >
                    Confirm
                  </Button>
                </Group>
              </Center>
            )}
          </>
        </Affix>
      );
    }
  } else {
    // Desktop
    if (isModalOpened) {
      return (
        <>
          {!confirmPressed ? (
            <Button fullWidth onClick={() => setConfirmPressed(true)}>
              I have sent the money
            </Button>
          ) : (
            <Center>
              <Group>
                <Button
                  // styles={{ root: { width: "40%" } }}
                  leftSection={<IconX size={18} />}
                  variant="filled"
                  color="red"
                  onClick={() => setConfirmPressed(false)}
                >
                  Cancel
                </Button>
                <Button
                  loading={isPending}
                  loaderProps={{ type: "dots" }}
                  // styles={{ root: { width: "40%" } }}
                  leftSection={<IconCheck size={18} />}
                  variant="filled"
                  color="green"
                  onClick={confirmFunction}
                >
                  Confirm
                </Button>
              </Group>
            </Center>
          )}
        </>
      );
    }
  }
};

export default ConfirmButton;
