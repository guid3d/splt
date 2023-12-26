import EmojiActionButtion from "@/components/EmojiActionButtion";
import {
  Center,
  Container,
  Group,
  Input,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  Textarea,
  rem,
} from "@mantine/core";
import React from "react";
import { UseFormReturnType } from "@mantine/form";
import { ParticipantFormValues } from "..";
import { IMaskInput } from "react-imask";
import { PaymentMethodType } from "@/types";

type PageSetPaymentProps = {
  disabledPreferredPaymentMethod?: boolean;
  form: UseFormReturnType<ParticipantFormValues>;
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
          <TextInput
            mb={"md"}
            styles={{ input: { textAlign: "center", height: rem(40) } }}
            radius={0}
            variant="unstyled"
            // label="Name"
            placeholder="Elon Musk"
            size={rem(30)}
            {...form.getInputProps("name")}
          />
        </Center>
        {!disabledPreferredPaymentMethod && (
          <>
            <Stack gap={0}>
              <Text size="sm">Preferred Payment By</Text>
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
                  label="Account Name"
                  placeholder="Elon Zuckerberg"
                  {...form.getInputProps("accountName")}
                />
                <Input.Wrapper label="IBAN">
                  <Input
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
