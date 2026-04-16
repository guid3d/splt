import { Center, Container, PinInput, Stack, Switch, Text } from "@mantine/core";
import { useCounter } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { GroupData, GroupFormValues } from "@/types";
import Modal from "@/components/Modal";
import { Carousel } from "@mantine/carousel";
import { useUpdateGroup } from "@/api";
import PageSetName from "@/components/AddGroupModal/components/PageSetName";
import PageNotifyFinish from "@/components/PageNotifyFinish";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";

type EditGroupModalProps = {
  groupInfo: GroupData;
  button: React.ReactNode;
};

const EditGroupModal = ({ groupInfo, button }: EditGroupModalProps) => {
  const [confirmSuccess, setConfirmSuccess] = useState<boolean>(false);
  const { isAuthenticated, currentUser } = useAuth();
  const isOwner =
    isAuthenticated && currentUser?.id === groupInfo.owner && groupInfo.owner !== "";

  const updateGroup = useUpdateGroup();
  const maxPage = isOwner ? 2 : 1;
  const confirmPage = isOwner ? 1 : 0;
  const [page, pageHandler] = useCounter(0, {
    min: 0,
    max: maxPage,
  });
  const form = useForm({
    initialValues: {
      id: groupInfo.id,
      avatar: groupInfo.avatar,
      name: groupInfo.name,
      description: groupInfo.description,
      password: groupInfo.password ?? "",
      currency: groupInfo.currency,
      participants: groupInfo.participants,
      isPrivate: groupInfo.isPrivate ?? false,
      owner: groupInfo.owner ?? "",
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
      return {};
    },
  });
  return (
    <Center>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Modal
          form={form}
          page={page}
          pageHandler={pageHandler}
          maxPage={maxPage}
          confirmPage={confirmPage}
          onConfirmClick={() => {
            const values = form.values;
            // If turning off private, clear password
            if (!values.isPrivate) {
              values.password = "";
            }
            updateGroup.mutate(values, {
              onSuccess: () => {
                setConfirmSuccess(true);
              },
            });
          }}
          onCloseModalClick={() => {
            form.reset();
          }}
          button={button}
          keepButtonWhenOpened={true}
          nextButtonIsPending={updateGroup.isPending}
          confirmSuccess={confirmSuccess}
          setConfirmSuccess={setConfirmSuccess}
        >
          <Carousel.Slide>
            <PageSetName form={form} />
          </Carousel.Slide>
          {isOwner && (
            <Carousel.Slide>
              <Container>
                <Stack gap="xl">
                  <Center>
                    <Text fw={500}>Privacy Settings</Text>
                  </Center>
                  <Switch
                    label="Make group private (PIN protected)"
                    checked={form.values.isPrivate ?? false}
                    onChange={(e) =>
                      form.setFieldValue("isPrivate", e.currentTarget.checked)
                    }
                  />
                  {form.values.isPrivate && (
                    <Stack gap="xs">
                      <Center>
                        <Text size="sm" c="dimmed">
                          Set a 4-digit PIN
                        </Text>
                      </Center>
                      <Center>
                        <PinInput
                          size="xl"
                          radius="lg"
                          length={4}
                          {...form.getInputProps("password")}
                        />
                      </Center>
                    </Stack>
                  )}
                </Stack>
              </Container>
            </Carousel.Slide>
          )}
          <Carousel.Slide>
            <PageNotifyFinish title="Group detail is updated" />
          </Carousel.Slide>
        </Modal>
      </form>
    </Center>
  );
};

export default EditGroupModal;
