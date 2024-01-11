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
import PageNotifyFinish from "./components/PageNotifyFinish";
import { randomEmoji } from "@/utils/randomEmoji";

const AddGroupModal = () => {
  const createGroupMutation = useCreateGroup();
  const createParticipantMutation = useCreateParticipant();
  const router = useRouter();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const maxPage = 2;
  const confirmPage = 1;
  const [page, pageHandler] = useCounter(0, {
    min: 0,
    max: maxPage,
  });
  const [groupUrl, setGroupUrl] = useState<string>("");
  const [confirmSuccess, setConfirmSuccess] = useState<boolean>(false);
  const form = useForm<GroupFormValues>({
    initialValues: {
      avatar: { emoji: randomEmoji(), unified: "" },
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

      // if (page === 1) {
      //   return {
      //     password:
      //       values.password.length < 4
      //         ? "Password must include at least 4 characters"
      //         : null,
      //   };
      // }

      if (page === 1) {
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
        maxPage={maxPage}
        confirmPage={confirmPage}
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
                  setGroupUrl(`group/${data.id}`);
                  setConfirmSuccess(true);
                  // pageHandler.increment();
                  // router.push(`/group/${data.id}`);
                },
              });
            } catch (error) {
              console.log("Error during participant creation:", error);
            }
          })();
          form.reset();
        }}
        onLastPageHandler={() => {
          setParticipants([]);
          router.push(`/${groupUrl}`);
        }}
        onCloseModalClick={() => {
          form.reset();
          setParticipants([]);
        }}
        button={
          <Affix
            // TODO: Find the way to center the button without cannot touching behind this button
            position={{ bottom: 40, right: 0, left: 0 }}
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
        nextButtonIsPending={
          createGroupMutation.isPending || createParticipantMutation.isPending
        }
        confirmSuccess={confirmSuccess}
        setConfirmSuccess={setConfirmSuccess}
      >
        <Carousel.Slide>
          <PageSetName form={form} />
        </Carousel.Slide>
        {/* TODO: Implment Password handling */}
        {/* <Carousel.Slide>
          <PageSetPassword form={form} />
        </Carousel.Slide> */}
        <Carousel.Slide>
          <PageAddParticipant
            form={form}
            participants={participants}
            setParticipants={setParticipants}
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <PageNotifyFinish groupUrl={groupUrl} />
        </Carousel.Slide>
      </Modal>
    </form>
  );
};

export default AddGroupModal;
