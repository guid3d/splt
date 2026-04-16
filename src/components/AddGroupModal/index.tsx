import React, { useCallback, useState } from "react";
import { useCounter, useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Button, Affix, Center, ActionIcon, rem, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { IconChevronLeft } from "@tabler/icons-react";
import PageSetName from "./components/PageSetName";
import PageAddParticipant from "./components/PageAddParticipant";
import { Carousel } from "@mantine/carousel";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import {
  GroupFormValues,
  // ModifiedGroupFormValues,
  Participant,
  PaymentMethodType,
  StoreEmojiData,
} from "@/types";
import { useCreateGroup, useCreateParticipant } from "@/api";
import { useQueryClient } from "@tanstack/react-query";
import { pb } from "@/lib/pb";
import PageNotifyFinish from "./components/PageNotifyFinish";
import { randomEmoji } from "@/utils/randomEmoji";
import { useAuth } from "@/providers/AuthProvider";

const AddGroupModal = () => {
  const createGroupMutation = useCreateGroup();
  const createParticipantMutation = useCreateParticipant();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isAuthenticated, currentUser } = useAuth();

  // When logged in, pre-fill participants with the user's username
  const initialParticipants: Participant[] =
    isAuthenticated && currentUser
      ? [
          {
            avatar: { emoji: randomEmoji(), unified: "" },
            name: currentUser.username || currentUser.name || "",
            accountName: currentUser.username || "",
            selectedPaymentMethod: PaymentMethodType.None,
            paymentMethod: { iban: "", paypal: "" },
          },
        ]
      : [];

  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);

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
      isPrivate: false,
      owner: "",
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
          participants:
            participants.length < 1
              ? "Participants must include at least 1 person"
              : null,
        };
      }

      return {};
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
              const newFormValues: GroupFormValues = {
                ...form.values,
                participants: participantIds,
              };
              if (isAuthenticated && currentUser) {
                newFormValues.owner = currentUser.id;
              }
              createGroupMutation.mutate(newFormValues, {
                onSuccess: (data) => {
                  setGroupUrl(`group/${data.id}`);
                  setConfirmSuccess(true);
                  if (isAuthenticated && currentUser) {
                    pb.collection("userGroupHistory").create({
                      userId: currentUser.id,
                      groupId: data.id,
                      visitedAt: new Date().toISOString(),
                    }).then(() => {
                      queryClient.invalidateQueries({ queryKey: ["serverGroupHistory"] });
                    }).catch(console.error);
                  }
                },
              });
            } catch (error) {
              console.log("Error during participant creation:", error);
            }
          })();
          form.reset();
        }}
        onLastPageHandler={() => {
          setParticipants(initialParticipants);
          router.push(`/${groupUrl}`);
        }}
        onCloseModalClick={() => {
          form.reset();
          setParticipants(initialParticipants);
        }}
        button={
          <Affix
            position={{ bottom: 40, right: 0, left: 0 }}
          >
            <Center>
              <Button
                variant="filled"
                leftSection={<IconPlus size={14} />}
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
