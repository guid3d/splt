"use client";

import {
  ActionIcon,
  Avatar,
  Button,
  Divider,
  Menu,
  Modal,
  PasswordInput,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { IconUser } from "@tabler/icons-react";
import { useLogin, useRegister } from "@/api";
import { useAuth } from "@/providers/AuthProvider";

type LoginFormValues = {
  email: string;
  password: string;
};

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const LoginModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);
  const isMobile = useMediaQuery("(max-width: 50em)") || false;

  const { user, isLoggedIn, logout } = useAuth();
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const loginForm = useForm<LoginFormValues>({
    initialValues: { email: "", password: "" },
    validate: {
      email: (v) => (/^\S+@\S+$/.test(v) ? null : "Invalid email"),
      password: (v) => (v.length < 1 ? "Password is required" : null),
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    initialValues: { name: "", email: "", password: "", passwordConfirm: "" },
    validate: {
      name: (v) => (v.trim().length < 1 ? "Name is required" : null),
      email: (v) => (/^\S+@\S+$/.test(v) ? null : "Invalid email"),
      password: (v) =>
        v.length < 8 ? "Password must be at least 8 characters" : null,
      passwordConfirm: (v, values) =>
        v !== values.password ? "Passwords do not match" : null,
    },
  });

  const handleClose = () => {
    close();
    setError(null);
    loginForm.reset();
    registerForm.reset();
    setMode("login");
  };

  const handleLogin = loginForm.onSubmit((values) => {
    setError(null);
    loginMutation.mutate(values, {
      onSuccess: () => handleClose(),
      onError: (err: any) => {
        setError(
          err?.response?.message || err?.message || "Login failed",
        );
      },
    });
  });

  const handleRegister = registerForm.onSubmit((values) => {
    setError(null);
    registerMutation.mutate(values, {
      onSuccess: () => handleClose(),
      onError: (err: any) => {
        const data = err?.response?.data;
        if (data?.email) {
          setError("This email is already in use");
        } else {
          setError(err?.response?.message || err?.message || "Registration failed");
        }
      },
    });
  });

  if (isLoggedIn && user) {
    const initials = (user.name || user.email || "?")
      .split(" ")
      .map((w: string) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    return (
      <Menu shadow="md" width={180} position="bottom-end">
        <Menu.Target>
          <ActionIcon variant="subtle" color="gray" radius="xl" size="lg">
            <Avatar size={rem(28)} radius="xl" color="blue">
              {initials}
            </Avatar>
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>{user.name || user.email}</Menu.Label>
          <Divider />
          <Menu.Item color="red" onClick={logout}>
            Log out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  }

  return (
    <>
      <ActionIcon variant="subtle" color="gray" size="lg" onClick={open}>
        <IconUser style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      </ActionIcon>

      <Modal
        opened={opened}
        onClose={handleClose}
        title="Account"
        fullScreen={isMobile}
        centered
        radius={isMobile ? 0 : "lg"}
        transitionProps={{ transition: "slide-up", duration: 200 }}
      >
        <Stack gap="md">
          <SegmentedControl
            fullWidth
            value={mode}
            onChange={(v) => {
              setMode(v as "login" | "register");
              setError(null);
            }}
            data={[
              { label: "Log in", value: "login" },
              { label: "Register", value: "register" },
            ]}
          />

          {mode === "login" ? (
            <form onSubmit={handleLogin}>
              <Stack gap="sm">
                <TextInput
                  label="Email"
                  placeholder="your@email.com"
                  type="email"
                  {...loginForm.getInputProps("email")}
                />
                <PasswordInput
                  label="Password"
                  placeholder="Your password"
                  {...loginForm.getInputProps("password")}
                />
                {error && (
                  <Text size="sm" c="red">
                    {error}
                  </Text>
                )}
                <Button
                  type="submit"
                  fullWidth
                  loading={loginMutation.isPending}
                  mt="xs"
                >
                  Log in
                </Button>
              </Stack>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <Stack gap="sm">
                <TextInput
                  label="Name"
                  placeholder="Your name"
                  {...registerForm.getInputProps("name")}
                />
                <TextInput
                  label="Email"
                  placeholder="your@email.com"
                  type="email"
                  {...registerForm.getInputProps("email")}
                />
                <PasswordInput
                  label="Password"
                  placeholder="At least 8 characters"
                  {...registerForm.getInputProps("password")}
                />
                <PasswordInput
                  label="Confirm password"
                  placeholder="Repeat your password"
                  {...registerForm.getInputProps("passwordConfirm")}
                />
                {error && (
                  <Text size="sm" c="red">
                    {error}
                  </Text>
                )}
                <Button
                  type="submit"
                  fullWidth
                  loading={registerMutation.isPending}
                  mt="xs"
                >
                  Create account
                </Button>
              </Stack>
            </form>
          )}
        </Stack>
      </Modal>
    </>
  );
};

export default LoginModal;
