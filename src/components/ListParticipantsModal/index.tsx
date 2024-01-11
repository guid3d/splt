import {
  ActionIcon,
  Center,
  Title,
  rem,
  Modal as MantineModal,
  Stack,
  Text,
  ScrollArea,
  SimpleGrid,
  AvatarGroup,
  Avatar,
  UnstyledButton,
} from "@mantine/core";
import { useState } from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconChevronLeft } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { GroupFormValues, GroupData, Participant } from "@/types";
import { IconPencil } from "@tabler/icons-react";
import AddParticipantModal from "@/components/AddParticipantModal";
import ViewParticipantModal from "@/components/ViewParticipantModal";
import ParticipantAvatar from "@/components/ParticipantAvatar";
import { useCreateParticipant, useUpdateGroup } from "@/api";
import { useRouter } from "next/navigation";
import { useViewportSize } from "@mantine/hooks";
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
  const isMobile = useMediaQuery("(max-width: 50em)") || false;
  const { height, width } = useViewportSize();
  const modalHeight = isMobile ? rem(height - 100) : rem(500);

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
  const [confirmSuccess, setConfirmSuccess] = useState<boolean>(false);

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
            <ScrollArea h={modalHeight}>
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
                        // groupInfo={groupInfo}
                        button={
                          <ParticipantAvatar
                            avatar={participant.avatar}
                            name={participant.name}
                          />
                        }
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
                                setConfirmSuccess(true);
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
                      confirmSuccess={confirmSuccess}
                      setConfirmSuccess={setConfirmSuccess}
                      nextButtonIsPending={
                        updateGroupMutation.isPending ||
                        createParticipantMutation.isPending
                      }
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
        </AvatarGroup>
      </UnstyledButton>
    </>
  );
};

export default ListParticipantsModal;
