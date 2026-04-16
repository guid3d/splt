"use client";
import { useState } from "react";
import {
  ActionIcon,
  Alert,
  Center,
  Container,
  Input,
  Modal as MantineModal,
  ScrollArea,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { useCounter, useMediaQuery } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { Carousel } from "@mantine/carousel";
import { IconAlertCircle, IconChevronLeft, IconInfoCircle } from "@tabler/icons-react";
import { pb } from "@/lib/pb";
import { useAuth } from "@/providers/AuthProvider";
import { PaymentMethodType } from "@/types";
import EmojiActionButtion from "@/components/EmojiActionButtion";
import BigTextInput from "@/components/BigTextInput";
import ModalFooterButton from "@/components/ModalFooterButton";

type EditProfileModalProps = {
  opened: boolean;
  onClose: () => void;
};

const EditProfileModal = ({ opened, onClose }: EditProfileModalProps) => {
  const { currentUser } = useAuth();
  const isMobile = useMediaQuery("(max-width: 50em)") || false;
  const maxPage = 0;
  const confirmPage = 0;
  const [page, pageHandler] = useCounter(0, { min: 0, max: maxPage });

  const [saveError, setSaveError] = useState<string | null>(null);
  const [emailChangeRequested, setEmailChangeRequested] = useState(false);

  const form = useForm({
    initialValues: {
      avatar: currentUser?.avatar ?? { emoji: "👤", unified: "" },
      name: currentUser?.name ?? "",
      username: currentUser?.username ?? "",
      email: currentUser?.email ?? "",
      selectedPaymentMethod: currentUser?.selectedPaymentMethod ?? PaymentMethodType.Cash,
      paymentMethod: {
        iban: currentUser?.paymentMethod?.iban ?? "",
        paypal: currentUser?.paymentMethod?.paypal ?? "",
      },
      accountName: "",
    },
    validate: {
      name: (v: string) => v.trim().length < 1 ? "Name is required" : null,
      username: (v: string) => v.trim().length < 1 ? "Username is required" : null,
      email: (v: string) => /^\S+@\S+\.\S+$/.test(v) ? null : "Valid email required",
    },
  });

  const handleClose = () => {
    form.setValues({
      avatar: currentUser?.avatar ?? { emoji: "👤", unified: "" },
      name: currentUser?.name ?? "",
      username: currentUser?.username ?? "",
      email: currentUser?.email ?? "",
      selectedPaymentMethod: currentUser?.selectedPaymentMethod ?? PaymentMethodType.Cash,
      paymentMethod: {
        iban: currentUser?.paymentMethod?.iban ?? "",
        paypal: currentUser?.paymentMethod?.paypal ?? "",
      },
      accountName: "",
    });
    setSaveError(null);
    setEmailChangeRequested(false);
    pageHandler.set(0);
    onClose();
  };

  const handleSave = async () => {
    if (form.validate().hasErrors) return;
    setSaveError(null);
    const userId = pb.authStore.record?.id;
    if (!userId) return;
    try {
      await pb.collection("users").update(userId, {
        name: form.values.name,
        avatar: form.values.avatar,
        username: form.values.username,
        selectedPaymentMethod: form.values.selectedPaymentMethod,
        paymentMethod: form.values.paymentMethod,
      });
      if (form.values.email !== currentUser?.email) {
        await pb.collection("users").requestEmailChange(form.values.email);
        setEmailChangeRequested(true);
      }
      // Sync payment method to all linked participant records
      const linkedParticipants = await pb.collection("participants").getFullList({
        filter: `userId="${userId}"`,
      });
      await Promise.all(
        linkedParticipants.map((p) =>
          pb.collection("participants").update(p.id, {
            selectedPaymentMethod: form.values.selectedPaymentMethod,
            paymentMethod: form.values.paymentMethod,
            accountName: form.values.username,
          })
        )
      );
      await pb.collection("users").authRefresh();
    } catch (e: any) {
      setSaveError(e?.message ?? "Save failed");
    }
  };

  return (
    <MantineModal.Root
      opened={opened}
      onClose={handleClose}
      fullScreen={isMobile}
      transitionProps={{ transition: "slide-up", duration: 200 }}
      centered
    >
      <MantineModal.Overlay />
      <MantineModal.Content radius={isMobile ? 0 : "lg"}>
        <MantineModal.Header>
          <ActionIcon
            variant="transparent"
            color="gray"
            aria-label="Back"
            onClick={handleClose}
          >
            <IconChevronLeft style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </MantineModal.Header>
        <MantineModal.Body>
          <Stack gap="xs" h={rem(550)} justify="space-between">
            <Carousel
              draggable={false}
              withControls={false}
              withKeyboardEvents={false}
              height={rem(500)}
            >
              <Carousel.Slide>
                <ScrollArea h={rem(500)}>
                <Container>
                  <Stack gap="xs">
                    <Center>
                      <EmojiActionButtion form={form} />
                    </Center>
                    <Center>
                      <BigTextInput
                        mb="md"
                        placeholder="Your Name"
                        maxLength={30}
                        {...form.getInputProps("name")}
                      />
                    </Center>
                    <TextInput
                      radius={0}
                      variant="unstyled"
                      size="md"
                      label="Username"
                      placeholder="Your username"
                      {...form.getInputProps("username")}
                    />
                    <TextInput
                      radius={0}
                      variant="unstyled"
                      size="md"
                      label="Email"
                      placeholder="you@example.com"
                      {...form.getInputProps("email")}
                    />
                    <Stack gap={rem(3)}>
                      <Text size="sm">Preferred Payment Method</Text>
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
                        <Input.Wrapper label="IBAN">
                          <Input
                            radius={0}
                            variant="unstyled"
                            size="md"
                            placeholder="DE00 0000 0000 0000 0000 00"
                            {...form.getInputProps("paymentMethod.iban")}
                          />
                        </Input.Wrapper>
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
                    {saveError && (
                      <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
                        {saveError}
                      </Alert>
                    )}
                    {emailChangeRequested && (
                      <Alert icon={<IconInfoCircle size={16} />} color="blue" variant="light">
                        Check your new email inbox to confirm the change.
                      </Alert>
                    )}
                  </Stack>
                </Container>
                </ScrollArea>
              </Carousel.Slide>
            </Carousel>
            <ModalFooterButton
              isMobile={isMobile}
              isModalOpened={opened}
              page={page}
              maxPage={maxPage}
              confirmPage={confirmPage}
              pageIncrement={() => {}}
              confirmFunction={handleSave}
              closeModalHandler={handleClose}
            />
          </Stack>
        </MantineModal.Body>
      </MantineModal.Content>
    </MantineModal.Root>
  );
};

export default EditProfileModal;
