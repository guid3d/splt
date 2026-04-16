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

  const handleProfileDone = async (close: () => void) => {
    if (profileForm.validate().hasErrors) return;
    setProfileLoading(true);
    try {
      // Login first so we have auth context to update the profile
      await login(email, regPassword);
      const userId = pb.authStore.record?.id;
      if (userId) {
        await pb.collection("users").update(userId, {
          name: profileForm.values.name,
          avatar: profileForm.values.avatar,
        });
      }
    } catch {
      // profile update is best-effort
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
                onClick={() => handleProfileDone(closeModalHandler)}
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
            <Container h="100%">
              <Stack gap="xs" justify="center" align="center" h="100%">
                <Center>
                  <EmojiActionButtion form={profileForm} />
                </Center>
                <BigTextInput
                  placeholder="Your Name"
                  {...profileForm.getInputProps("name")}
                />
                <Text size="xs" c="dimmed" ta="center">
                  Used as your name when creating groups
                </Text>
              </Stack>
            </Container>
          </Carousel.Slide>
        </>
      )}
    </Modal>
  );
};

export default LoginModal;
