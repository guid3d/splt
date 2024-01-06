import {
  ActionIcon,
  Center,
  Title,
  rem,
  Modal as MantineModal,
  Stack,
  Indicator,
  Text,
  ScrollArea,
  SimpleGrid,
  AvatarGroup,
  Avatar,
  UnstyledButton,
} from "@mantine/core";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconChevronLeft } from "@tabler/icons-react";
import { UseFormReturnType, useForm } from "@mantine/form";
import {
  GroupFormValues,
  GroupData,
  Participant,
  PaymentMethodType,
} from "@/types";
import { IconEdit } from "@tabler/icons-react";
import { IconPencil } from "@tabler/icons-react";
import AddParticipantModal from "@/components/AddParticipantModal";
import ViewParticipantModal from "@/components/ViewParticipantModal";
import ParticipantAvatar from "@/components/ParticipantAvatar";
import { useCreateParticipant, useUpdateGroup } from "@/api";
import { useRouter } from "next/navigation";

type ListParticipantsModalProps = {
  groupInfo: GroupData;
  // form: UseFormReturnType<any>;
};

const ListParticipantsModal = ({ groupInfo }: ListParticipantsModalProps) => {
  // const [participantIds, setParticipantIds] = useState<string[]>(
  //   groupInfo.participants
  // );
  const router = useRouter();
  // const [newParticipant, setNewParticipant] = useState<Participant>({
  //   avatar: { emoji: "😄", unified: "1f604" },
  //   name: "",
  //   accountName: "",
  //   selectedPaymentMethod: PaymentMethodType.Iban,
  //   paymentMethod: {
  //     iban: "",
  //     paypal: "",
  //   },
  // });

  const [participants, setParticipants] = useState<Participant[]>(
    groupInfo.expand.participants
  );
  const createParticipantMutation = useCreateParticipant();
  const updateGroupMutation = useUpdateGroup();

  const groupForm = useForm<GroupFormValues>({
    initialValues: {
      id: groupInfo.id,
      avatar: groupInfo.avatar,
      name: groupInfo.name,
      description: groupInfo.description,
      password: groupInfo.password,
      currency: groupInfo.currency,
      participants: groupInfo.participants,
    },
  });
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 50em)") || false;

  return (
    <>
      <MantineModal.Root
        opened={opened}
        onClose={close}
        fullScreen={isMobile}
        transitionProps={{ transition: "pop", duration: 200 }}
        centered
        // zIndex={201}
      >
        <MantineModal.Overlay />
        <MantineModal.Content radius={isMobile ? 0 : "l"}>
          <MantineModal.Header>
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
          </MantineModal.Header>
          <MantineModal.Body>
            <ScrollArea h={rem(550)}>
              <Stack>
                <Center>
                  <Text fw={500}>Participants</Text>
                </Center>
                {/* <Center> */}
                <Stack>
                  <SimpleGrid cols={3} spacing={0} pb="xl">
                    {groupInfo.expand.participants.map((participant, index) => (
                      <ViewParticipantModal
                        key={index}
                        participant={participant}
                        groupInfo={groupInfo}
                      />
                    ))}
                    <AddParticipantModal
                      // setNewParticipant={setNewParticipant}
                      participants={participants}
                      setParticipants={setParticipants}
                      // disabledPreferredPaymentMethod={true}
                      onConfirmClick={(newParticipant) => {
                        console.log(newParticipant);
                        (async () => {
                          const participantIds: string[] =
                            groupForm.values.participants;
                          try {
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

                            // console.log(form.values);
                            const newFormValues = {
                              ...groupForm.values,
                              participants: participantIds,
                            };
                            updateGroupMutation.mutate(newFormValues, {
                              onSuccess: (data) => {
                                // router.push(`/group/${data.id}`);
                              },
                            });
                          } catch (error) {
                            console.log(
                              "Error during participant creation:",
                              error
                            );
                          }
                        })();
                      }}
                    />
                  </SimpleGrid>
                </Stack>
                {/* </Center> */}
              </Stack>
            </ScrollArea>
          </MantineModal.Body>
        </MantineModal.Content>
      </MantineModal.Root>

      <UnstyledButton onClick={open}>
        <AvatarGroup>
          {groupInfo.expand.participants
            .slice(0, 8)
            .map((participant, index) => (
              <Avatar key={index}>
                <Title order={2}>{participant.avatar.emoji}</Title>
              </Avatar>
            ))}
          <Avatar>
            <IconPencil style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </Avatar>
        </AvatarGroup>
      </UnstyledButton>
    </>
  );
};

export default ListParticipantsModal;
