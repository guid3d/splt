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
  // ModifiedGroupFormValues,
  Participant,
  StoreEmojiData,
} from "@/types";
import { useCreateGroup, useCreateParticipant } from "@/api";

const AddGroupModal = () => {
  const createGroupMutation = useCreateGroup();
  const createParticipantMutation = useCreateParticipant();
  const router = useRouter();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const numPage = 3;
  const [page, pageHandler] = useCounter(0, {
    min: 0,
    max: numPage - 1,
  });
  const form = useForm<GroupFormValues>({
    initialValues: {
      avatar: { emoji: "😄", unified: "1f604" },
      name: "",
      description: "",
      password: "",
      currency: "EUR",
      participants: [],
    },

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
            participants.length < 1
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
          (async () => {
            const participantIds: string[] = [];
            try {
              for (const newParticipant of participants) {
                await new Promise((resolve, reject) => {
                  createParticipantMutation.mutate(newParticipant, {
                    onSuccess: (returnNewParticipant) => {
                      // form.setFieldValue("participants", [
                      //   ...form.values.participants,
                      //   returnNewParticipant.id,
                      // ]);
                      participantIds.push(returnNewParticipant.id);
                      resolve(returnNewParticipant);
                    },
                    onError: (error) => {
                      console.log(error);
                      reject(error);
                    },
                  });
                });
              }
              // console.log(form.values);
              const newFormValues = {
                ...form.values,
                participants: participantIds,
              };
              createGroupMutation.mutate(newFormValues, {
                onSuccess: (data) => {
                  router.push(`/group/${data.id}`);
                },
              });
            } catch (error) {
              console.log("Error during participant creation:", error);
            }
          })();

          form.reset();
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
            participants={participants}
            setParticipants={setParticipants}
          />
        </Carousel.Slide>
      </Modal>
    </form>
  );
};

export default AddGroupModal;
