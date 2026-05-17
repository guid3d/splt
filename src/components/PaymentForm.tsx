import { SegmentedControl, Stack, Text, TextInput, rem } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Participant, PaymentMethodType } from "@/types";
import IbanInput from "@/components/IbanInput";

type PaymentFormProps = {
  form: UseFormReturnType<Participant>;
  disabledPreferredPaymentMethod?: boolean;
};

const PaymentForm = ({ form, disabledPreferredPaymentMethod }: PaymentFormProps) => {
  if (disabledPreferredPaymentMethod) return null;

  return (
    <Stack gap="xs">
      <Stack gap={rem(3)}>
        <Text size="sm">Preferred Payment By</Text>
        <SegmentedControl
          value={form.values.selectedPaymentMethod}
          onChange={(value) =>
            form.setFieldValue("selectedPaymentMethod", value as PaymentMethodType)
          }
          data={[
            { label: "IBAN", value: PaymentMethodType.Iban },
            { label: "Paypal", value: PaymentMethodType.Paypal },
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
            placeholder="John Doe"
            {...form.getInputProps("accountName")}
          />
          <IbanInput
            value={form.values.paymentMethod.iban}
            onChange={(v) => form.setFieldValue("paymentMethod.iban", v)}
            error={form.errors["paymentMethod.iban"]}
          />
        </>
      )}

      {form.values.selectedPaymentMethod === PaymentMethodType.Paypal && (
        <TextInput
          radius={0}
          variant="unstyled"
          size="md"
          label="Paypal Email / Account"
          placeholder="@johndoe"
          {...form.getInputProps("paymentMethod.paypal")}
        />
      )}
    </Stack>
  );
};

export default PaymentForm;
