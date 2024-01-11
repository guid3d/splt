import { Center, Stack, Text } from "@mantine/core";
import { useCounter } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { GroupData, GroupFormValues } from "@/types";
import Modal from "@/components/Modal";
import { Carousel } from "@mantine/carousel";
import { useUpdateGroup } from "@/api";
import PageSetName from "@/components/AddGroupModal/components/PageSetName";
import PageNotifyFinish from "@/components/PageNotifyFinish";
import { useState } from "react";

type EditGroupModalProps = {
  groupInfo: GroupData;
  button: React.ReactNode;
};

const EditGroupModal = ({ groupInfo, button }: EditGroupModalProps) => {
  const [confirmSuccess, setConfirmSuccess] = useState<boolean>(false);

  const updateGroup = useUpdateGroup();
  const maxPage = 1;
  const confirmPage = 0;
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
      password: groupInfo.password,
      currency: groupInfo.currency,
      participants: groupInfo.participants,
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
            // console.log(form.values);
            // const newParticipant: Participant = form.values;
            updateGroup.mutate(form.values, {
              onSuccess: (newGroupData) => {
                // console.log(newGroupData);
                setConfirmSuccess(true);
                // form.setValues(returnNewParticipant);
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
          <Carousel.Slide>
            <PageNotifyFinish title="Group detail is updated" />
          </Carousel.Slide>
        </Modal>
      </form>
    </Center>
  );
};

export default EditGroupModal;
