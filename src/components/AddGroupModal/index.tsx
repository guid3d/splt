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
import { GroupFormValues, Participant, StoreEmojiData } from "@/types";
import { useCreateGroup } from "@/api";

const AddGroupModal = () => {
  const createGroupMutation = useCreateGroup();
  const router = useRouter();
  const [participantIds, setParticipantIds] = useState<string[]>([]);
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

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <form>
      <Modal
        numPage={3}
        onConfirmClick={() => {
          const modifiedFormValues = {
            ...form.values,
            participants: participantIds,
          };
          console.log(modifiedFormValues);
          createGroupMutation.mutate(modifiedFormValues);
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
