import React from "react";
import { useCounter, useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Modal, Button, Affix, Center, ActionIcon } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { IconChevronLeft } from "@tabler/icons-react";
import PageSetName from "./components/PageSetName";
import PageSetParticipant from "./components/PageSetParticipant";

export interface BillFormValues {
  avatar: string;
  name: string;
  description: string;
  password: string;
  participant: string[];
}

const AddBillModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 50em)");
  const [page, pageHandler] = useCounter(0, {
    min: 0,
    max: 1,
  });

  const form = useForm({
    initialValues: {
      avatar: "🐥",
      name: "",
      description: "",
      password: "",
      participant: [],
      // termsOfService: false,
    } as BillFormValues,

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <>
      <Modal.Root
        opened={opened}
        onClose={close}
        fullScreen={isMobile}
        transitionProps={{ transition: "slide-up", duration: 200 }}
        centered
      >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <ActionIcon
              variant="transparent"
              color="gray"
              aria-label="Settings"
              onClick={close}
            >
              <IconChevronLeft
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              {page === 0 ? (
                <PageSetName
                  form={form}
                  isModalOpened={opened}
                  page={page}
                  pageHandler={pageHandler}
                />
              ) : page === 1 ? (
                <PageSetParticipant form={form} isModalOpened={opened} />
              ) : null}
            </form>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      {!opened && (
        <Affix
          // TODO: Find the way to center the button without cannot touching behind this button
          position={{ bottom: 20, right: 0, left: 0 }}
          // style={{ transform: "translate(-50%, -50%)" }}
        >
          <Center>
            <ActionIcon
              variant="filled"
              color="gray"
              size="xl"
              radius="xl"
              aria-label="Add bill"
              onClick={open}
            >
              <IconPlus style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
          </Center>
        </Affix>
      )}
    </>
  );
};

export default AddBillModal;
