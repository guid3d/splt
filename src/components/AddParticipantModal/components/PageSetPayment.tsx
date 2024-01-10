import EmojiActionButtion from "@/components/EmojiActionButtion";
import {
  Center,
  Container,
  Input,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Participant, PaymentMethodType } from "@/types";
import BigTextInput from "@/components/BigTextInput";

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
          <EmojiActionButtion form={form} />
        </Center>
        <Center>
          <BigTextInput
            mb={"md"}
            placeholder="Elon Musk"
            maxLength={15}
            {...form.getInputProps("name")}
          />
        </Center>
        {!disabledPreferredPaymentMethod && (
          <>
            <Stack gap={rem(3)} mb="xs">
              <Text>Preferred Payment By</Text>
              <SegmentedControl
                value={form.values.selectedPaymentMethod}
                onChange={(value) => {
                  form.setFieldValue(
                    "selectedPaymentMethod",
                    value as PaymentMethodType
                  );
                }}
                data={[
                  { label: "IBAN", value: PaymentMethodType.Iban },
                  {
                    label: "Paypal",
                    value: PaymentMethodType.Paypal,
                  },
                  { label: "Cash", value: PaymentMethodType.Cash },
                ]}
              />
            </Stack>
            {form.values.selectedPaymentMethod === PaymentMethodType.Iban && (
              <>
                <TextInput
                  radius={0}
                  variant="unstyled"
                  size="md"
                  label="Account Name"
                  placeholder="Elon Zuckerberg"
                  {...form.getInputProps("accountName")}
                />
                <Input.Wrapper label="IBAN">
                  <Input
                    radius={0}
                    variant="unstyled"
                    size="md"
                    placeholder="DE00 0000 0000 0000 0000 00"
                    // TODO: Fix masking doesn't work with autofill
                    // component={IMaskInput}
                    // mask="aa00 0000 0000 0000 0000 00"
                    // value={form.values.paymentMethod.iban}
                    // onChange={(event) => {
                    //   form.setFieldValue("paymentMethod.iban", event);
                    // }}
                    {...form.getInputProps("paymentMethod.iban")}
                  />
                </Input.Wrapper>
              </>
            )}
            {form.values.selectedPaymentMethod === PaymentMethodType.Paypal && (
              <>
                <TextInput
                  radius={0}
                  variant="unstyled"
                  size="md"
                  label="Paypal Email / Account"
                  placeholder="@elonmusk"
                  {...form.getInputProps("paymentMethod.paypal")}
                />
              </>
            )}
          </>
        )}
      </Stack>
    </Container>
  );
};

export default PageSetPayment;
