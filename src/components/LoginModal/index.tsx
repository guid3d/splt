"use client";
import React, { useState } from "react";
import { useCounter } from "@mantine/hooks";
import {
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Divider,
  Group,
  Alert,
  Container,
  Center,
  Affix,
  Text,
  Input,
  SegmentedControl,
  ScrollArea,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Carousel } from "@mantine/carousel";
import { useAuth } from "@/providers/AuthProvider";
import { pb } from "@/lib/pb";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconAlertCircle,
} from "@tabler/icons-react";
import Modal from "@/components/Modal";
import EmojiActionButtion from "@/components/EmojiActionButtion";
import BigTextInput from "@/components/BigTextInput";
import { randomPersonEmoji } from "@/utils/randomEmoji";
import { PaymentMethodType } from "@/types";

type LoginModalProps = {
  button: React.ReactNode;
};

const LoginModal = ({ button }: LoginModalProps) => {
  const { login, register } = useAuth();

  const [mode, setMode] = useState<"login" | "register" | null>(null);

  // Page 0
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  // Page 1 – shared
  const [credError, setCredError] = useState<string | null>(null);
  const [credLoading, setCredLoading] = useState(false);

  // Page 1 – login
  const [password, setPassword] = useState("");

  // Page 1 – register
  const [username, setUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");

  // Page 2 – profile setup (register only)
  const [profileLoading, setProfileLoading] = useState(false);

  // Page 3 – payment method (register only)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodType>(PaymentMethodType.Cash);
  const [paymentIban, setPaymentIban] = useState("");
  const [paymentAccountName, setPaymentAccountName] = useState("");
  const [paymentPaypal, setPaymentPaypal] = useState("");

  const profileForm = useForm({
    initialValues: {
      avatar: { emoji: randomPersonEmoji(), unified: "" },
      name: "",
    },
    validate: {
      name: (v: string) =>
        v.trim().length < 1 ? "Display name is required" : null,
    },
  });

  const maxPage = 2;
  const [page, pageHandler] = useCounter(0, { min: 0, max: maxPage });

  const resetAll = () => {
    setMode(null);
    setEmail("");
    setEmailError(null);
    setPassword("");
    setUsername("");
    setRegPassword("");
    setRegConfirm("");
    setCredError(null);
    setSelectedPaymentMethod(PaymentMethodType.Cash);
    setPaymentIban("");
    setPaymentAccountName("");
    setPaymentPaypal("");
    profileForm.reset();
    profileForm.setFieldValue("avatar", {
      emoji: randomPersonEmoji(),
      unified: "",
    });
  };

  const handleOAuth2 = async (provider: string, close: () => void) => {
    try {
      await pb.collection("users").authWithOAuth2({ provider });
      close();
    } catch {
      // OAuth2 window closed or failed — silently ignore
    }
  };

  const handleChoose = (
    chosen: "login" | "register",
    pageIncrement: () => void
  ) => {
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }
    setEmailError(null);
    setCredError(null);
    setMode(chosen);
    pageIncrement();
  };

  const handleLogin = async (close: () => void) => {
    if (!password) {
      setCredError("Password is required");
      return;
    }
    setCredError(null);
    setCredLoading(true);
    try {
      await login(email, password);
      close();
    } catch (e: any) {
      setCredError(e?.message ?? "Login failed");
    } finally {
      setCredLoading(false);
    }
  };

  const handleRegister = async (pageIncrement: () => void) => {
    if (!username.trim()) {
      setCredError("Username is required");
      return;
    }
    if (!regPassword) {
      setCredError("Password is required");
      return;
    }
    if (regPassword !== regConfirm) {
      setCredError("Passwords do not match");
      return;
    }
    setCredError(null);
    setCredLoading(true);
    try {
      await register(email, username, regPassword);
      pageIncrement();
    } catch (e: any) {
      setCredError(e?.message ?? "Registration failed");
    } finally {
      setCredLoading(false);
    }
  };

  const handlePaymentDone = async (close: () => void) => {
    setProfileLoading(true);
    try {
      await login(email, regPassword);
      const userId = pb.authStore.record?.id;
      if (userId) {
        await pb.collection("users").update(userId, {
          name: profileForm.values.name,
          avatar: profileForm.values.avatar,
          selectedPaymentMethod,
          paymentMethod: { iban: paymentIban, paypal: paymentPaypal },
          accountName: paymentAccountName,
        });
      }
    } catch {
      // best-effort
    } finally {
      setProfileLoading(false);
    }
    close();
  };

  return (
    <Modal
      button={button}
      headerTitle="Account"
      page={page}
      pageHandler={pageHandler}
      maxPage={maxPage}
      onCloseModalClick={resetAll}
      renderFooter={({ page: p, pageIncrement, closeModalHandler, isMobile }) => {
        const content = (
          <Stack gap="xs">
            {p === 0 && (
              <Group grow>
                <Button
                  variant="default"
                  radius="xl"
                  onClick={() => handleChoose("login", pageIncrement)}
                >
                  Login
                </Button>
                <Button
                  radius="xl"
                  onClick={() => handleChoose("register", pageIncrement)}
                >
                  Register
                </Button>
              </Group>
            )}
            {p === 1 && mode === "login" && (
              <Button
                fullWidth
                radius="xl"
                loading={credLoading}
                onClick={() => handleLogin(closeModalHandler)}
              >
                Login
              </Button>
            )}
            {p === 1 && mode === "register" && (
              <Button
                fullWidth
                radius="xl"
                loading={credLoading}
                onClick={() => handleRegister(pageIncrement)}
              >
                Create Account
              </Button>
            )}
            {p === 2 && (
              <Button
                fullWidth
                radius="xl"
                loading={profileLoading}
                onClick={() => handlePaymentDone(closeModalHandler)}
              >
                Done
              </Button>
            )}
          </Stack>
        );

        return isMobile ? (
          <Affix style={{ bottom: 20, left: 20, right: 20 }} zIndex={200}>
            {content}
          </Affix>
        ) : (
          content
        );
      }}
    >
      {(close) => (
        <>
          {/* Page 0 – Email */}
          <Carousel.Slide>
            <Container h="100%">
              <Stack gap="sm" justify="center" h="100%">
                <Group grow>
                  <Button
                    variant="default"
                    leftSection={<IconBrandGoogle size={16} />}
                    onClick={() => handleOAuth2("google", close)}
                  >
                    Google
                  </Button>
                  <Button
                    variant="default"
                    leftSection={<IconBrandGithub size={16} />}
                    onClick={() => handleOAuth2("github", close)}
                  >
                    GitHub
                  </Button>
                </Group>
                <Divider label="or" labelPosition="center" />
                {emailError && (
                  <Alert
                    icon={<IconAlertCircle size={16} />}
                    color="red"
                    variant="light"
                  >
                    {emailError}
                  </Alert>
                )}
                <TextInput
                  variant="unstyled"
                  radius={0}
                  size="md"
                  label="Email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
              </Stack>
            </Container>
          </Carousel.Slide>

          {/* Page 1 – Credentials */}
          <Carousel.Slide>
            <Container h="100%">
              <Stack gap="sm" justify="center" h="100%">
                {credError && (
                  <Alert
                    icon={<IconAlertCircle size={16} />}
                    color="red"
                    variant="light"
                  >
                    {credError}
                  </Alert>
                )}
                {mode === "login" && (
                  <PasswordInput
                    variant="unstyled"
                    radius={0}
                    size="md"
                    label="Password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleLogin(close)
                    }
                  />
                )}
                {mode === "register" && (
                  <>
                    <TextInput
                      variant="unstyled"
                      radius={0}
                      size="md"
                      label="Username"
                      placeholder="Choose a username"
                      value={username}
                      onChange={(e) => setUsername(e.currentTarget.value)}
                    />
                    <PasswordInput
                      variant="unstyled"
                      radius={0}
                      size="md"
                      label="Password"
                      placeholder="Choose a password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.currentTarget.value)}
                    />
                    <PasswordInput
                      variant="unstyled"
                      radius={0}
                      size="md"
                      label="Confirm password"
                      placeholder="Re-enter your password"
                      value={regConfirm}
                      onChange={(e) => setRegConfirm(e.currentTarget.value)}
                    />
                  </>
                )}
              </Stack>
            </Container>
          </Carousel.Slide>

          {/* Page 2 – Profile setup (after register) */}
          <Carousel.Slide>
            <ScrollArea h={rem(500)}>
            <Container>
              <Stack gap="xs">
                <Center>
                  <EmojiActionButtion form={profileForm} />
                </Center>
                <Center>
                  <BigTextInput
                    mb="md"
                    placeholder="Your Name"
                    {...profileForm.getInputProps("name")}
                  />
                </Center>
                <Stack gap={rem(3)}>
                  <Text size="sm">Preferred Payment Method</Text>
                  <SegmentedControl
                    value={selectedPaymentMethod}
                    onChange={(value) => setSelectedPaymentMethod(value as PaymentMethodType)}
                    data={[
                      { label: "IBAN", value: PaymentMethodType.Iban },
                      { label: "Paypal", value: PaymentMethodType.Paypal },
                      { label: "Cash", value: PaymentMethodType.Cash },
                    ]}
                  />
                </Stack>
                {selectedPaymentMethod === PaymentMethodType.Iban && (
                  <>
                    <TextInput
                      variant="unstyled"
                      radius={0}
                      size="md"
                      label="Account Name"
                      placeholder="John Doe"
                      value={paymentAccountName}
                      onChange={(e) => setPaymentAccountName(e.currentTarget.value)}
                    />
                    <Input.Wrapper label="IBAN">
                      <Input
                        variant="unstyled"
                        radius={0}
                        size="md"
                        placeholder="DE00 0000 0000 0000 0000 00"
                        value={paymentIban}
                        onChange={(e) => setPaymentIban(e.currentTarget.value)}
                      />
                    </Input.Wrapper>
                  </>
                )}
                {selectedPaymentMethod === PaymentMethodType.Paypal && (
                  <TextInput
                    variant="unstyled"
                    radius={0}
                    size="md"
                    label="Paypal Email / Account"
                    placeholder="@johndoe"
                    value={paymentPaypal}
                    onChange={(e) => setPaymentPaypal(e.currentTarget.value)}
                  />
                )}
              </Stack>
            </Container>
            </ScrollArea>
          </Carousel.Slide>
        </>
      )}
    </Modal>
  );
};

export default LoginModal;
