import EmojiActionButtion from "@/components/EmojiActionButtion";
import { Center, Container, Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Participant } from "@/types";
import BigTextInput from "@/components/BigTextInput";
import PaymentForm from "@/components/PaymentForm";
import { randomPersonEmoji } from "@/utils/randomEmoji";

type PageSetPaymentProps = {
  disabledPreferredPaymentMethod?: boolean;
  form: UseFormReturnType<Participant>;
};

const PageSetPayment = ({
  form,
  disabledPreferredPaymentMethod,
}: PageSetPaymentProps) => {
  return (
    <Container>
      <Stack gap="xs">
        <Center>
          <EmojiActionButtion
            form={form}
            onRandomize={() =>
              form.setFieldValue("avatar", {
                emoji: randomPersonEmoji(),
                unified: "",
              })
            }
          />
        </Center>
        <Center>
          <BigTextInput
            mb={"md"}
            placeholder="Name of Participant"
            maxLength={15}
            {...form.getInputProps("name")}
          />
        </Center>
        <PaymentForm
          form={form}
          disabledPreferredPaymentMethod={disabledPreferredPaymentMethod}
        />
      </Stack>
    </Container>
  );
};

export default PageSetPayment;
