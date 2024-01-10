import { Center } from "@mantine/core";
import { useCounter } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { Participant } from "@/types";
import PageSetPayment from "../AddParticipantModal/components/PageSetPayment";
import Modal from "../Modal";
import { Carousel } from "@mantine/carousel";
import { useUpdateParticipant } from "@/api";

type ViewParticipantModalProps = {
  participant: Participant;
  button: React.ReactNode;
};

const ViewParticipantModal = ({
  participant,
  button,
}: ViewParticipantModalProps) => {
  const updateParticipant = useUpdateParticipant();
  const maxPage = 0;
  const confirmPage = 0;
  const [page, pageHandler] = useCounter(0, {
    min: 0,
    max: maxPage,
  });
  const form = useForm({
    initialValues: participant,
    validate: (values) => {
      if (page === 0) {
        return {
          name:
            values.name.trim().length < 1
              ? "Person name must include at least 1 character"
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
            console.log(form.values);
            // const newParticipant: Participant = form.values;
            updateParticipant.mutate(form.values, {
              onSuccess: (returnNewParticipant) => {
                form.setValues(returnNewParticipant);
              },
            });
          }}
          onCloseModalClick={() => {
            form.reset();
          }}
          button={button}
        >
          <Carousel.Slide>
            <PageSetPayment
              form={form}
              // disabledPreferredPaymentMethod={false}
            />
          </Carousel.Slide>
        </Modal>
      </form>
    </Center>
  );
};

export default ViewParticipantModal;
