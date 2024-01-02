import React, { useCallback, useState } from "react";
import { useCounter, useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Button, Affix, Center, ActionIcon, rem, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { IconChevronLeft } from "@tabler/icons-react";
import PageSetName from "./components/PageSetName";
import PageAddParticipant from "./components/PageAddParticipant";
import PageSetPassword from "./components/PageSetPassword";
import { Carousel, CarouselSlide, Embla } from "@mantine/carousel";
import ModalFooterButton from "../ModalFooterButton";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import {
  GroupFormValues,
  ModifiedGroupFormValues,
  Participant,
  StoreEmojiData,
} from "@/types";
import { useCreateGroup } from "@/api";

const AddGroupModal = () => {
  const createGroupMutation = useCreateGroup();
  const router = useRouter();
  const [participantIds, setParticipantIds] = useState<string[]>([]);
  const numPage = 3;
  const [page, pageHandler] = useCounter(0, {
    min: 0,
    max: numPage - 1,
  });
  const form = useForm({
    initialValues: {
      avatar: { emoji: "😄", unified: "1f604" },
      name: "",
      description: "",
      password: "",
      currency: "EUR",
      participants: [],
      // termsOfService: false,
    } as GroupFormValues,

    validate: (values) => {
      if (page === 0) {
        return {
          name:
            values.name.trim().length < 1
              ? "Group name must include at least 6 characters"
              : null,
        };
      }

      if (page === 1) {
        return {
          password:
            values.password.length < 4
              ? "Password must include at least 4 characters"
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
    <form>
      <Modal
        form={form}
        page={page}
        pageHandler={pageHandler}
        numPage={numPage}
        onConfirmClick={() => {
          const modifiedFormValues: ModifiedGroupFormValues = {
            ...form.values,
            participants: participantIds,
          };
          console.log(modifiedFormValues);
          createGroupMutation.mutate(modifiedFormValues, {
            onSuccess: (data) => {
              router.push(`/group/${data.id}`);
            },
          });
          form.reset();
          // console.log(form.values);
          // router.push(`/group/groupId`);
          // form.setFieldValue("participant", participantIds);
        }}
        onCloseModalClick={() => {
          form.reset();
        }}
        button={
          <Affix
            // TODO: Find the way to center the button without cannot touching behind this button
            position={{ bottom: 20, right: 0, left: 0 }}
            // style={{ transform: "translate(-50%, -50%)" }}
          >
            <Center>
              <Button
                variant="filled"
                leftSection={<IconPlus size={14} />}
                // onClick={open}
                justify="center"
              >
                Create Group
              </Button>
            </Center>
          </Affix>
        }
      >
        <Carousel.Slide>
          <PageSetName form={form} />
        </Carousel.Slide>
        <Carousel.Slide>
          <PageSetPassword form={form} />
        </Carousel.Slide>
        <Carousel.Slide>
          <PageAddParticipant
            form={form}
            participantIds={participantIds}
            setParticipantIds={setParticipantIds}
          />
        </Carousel.Slide>
      </Modal>
    </form>
  );
};

export default AddGroupModal;
