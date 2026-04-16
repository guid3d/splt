"use client";
import React, { useState } from "react";
import {
  Modal,
  Tabs,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Text,
  Divider,
  Group,
  Alert,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAuth } from "@/providers/AuthProvider";
import { pb } from "@/lib/pb";
import { IconBrandGithub, IconBrandGoogle, IconAlertCircle } from "@tabler/icons-react";

type LoginModalProps = {
  button: React.ReactNode;
};

const LoginModal = ({ button }: LoginModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { login, register } = useAuth();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  const [regEmail, setRegEmail] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regError, setRegError] = useState<string | null>(null);
  const [regLoading, setRegLoading] = useState(false);

  const handleLogin = async () => {
    setLoginError(null);
    setLoginLoading(true);
    try {
      await login(loginEmail, loginPassword);
      close();
    } catch (e: any) {
      setLoginError(e?.message ?? "Login failed");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async () => {
    setRegError(null);
    if (regPassword !== regConfirm) {
      setRegError("Passwords do not match");
      return;
    }
    setRegLoading(true);
    try {
      await register(regEmail, regUsername, regPassword);
      close();
    } catch (e: any) {
      setRegError(e?.message ?? "Registration failed");
    } finally {
      setRegLoading(false);
    }
  };

  const handleOAuth2 = async (provider: string) => {
    try {
      await pb.collection("users").authWithOAuth2({ provider });
      close();
    } catch (e: any) {
      // OAuth2 window closed or failed — silently ignore
    }
  };

  return (
    <>
      <span onClick={open} style={{ cursor: "pointer" }}>
        {button}
      </span>
      <Modal opened={opened} onClose={close} title="Account" centered>
        <Tabs defaultValue="login">
          <Tabs.List>
            <Tabs.Tab value="login">Login</Tabs.Tab>
            <Tabs.Tab value="register">Register</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="login" pt="md">
            <Stack gap="sm">
              <Group grow>
                <Button
                  variant="default"
                  leftSection={<IconBrandGoogle size={16} />}
                  onClick={() => handleOAuth2("google")}
                >
                  Google
                </Button>
                <Button
                  variant="default"
                  leftSection={<IconBrandGithub size={16} />}
                  onClick={() => handleOAuth2("github")}
                >
                  GitHub
                </Button>
              </Group>
              <Divider label="or" labelPosition="center" />
              {loginError && (
                <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
                  {loginError}
                </Alert>
              )}
              <TextInput
                label="Email or username"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.currentTarget.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              <PasswordInput
                label="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.currentTarget.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              <Button onClick={handleLogin} loading={loginLoading}>
                Login
              </Button>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="register" pt="md">
            <Stack gap="sm">
              <Group grow>
                <Button
                  variant="default"
                  leftSection={<IconBrandGoogle size={16} />}
                  onClick={() => handleOAuth2("google")}
                >
                  Google
                </Button>
                <Button
                  variant="default"
                  leftSection={<IconBrandGithub size={16} />}
                  onClick={() => handleOAuth2("github")}
                >
                  GitHub
                </Button>
              </Group>
              <Divider label="or" labelPosition="center" />
              {regError && (
                <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
                  {regError}
                </Alert>
              )}
              <TextInput
                label="Email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.currentTarget.value)}
              />
              <TextInput
                label="Username"
                value={regUsername}
                onChange={(e) => setRegUsername(e.currentTarget.value)}
              />
              <PasswordInput
                label="Password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.currentTarget.value)}
              />
              <PasswordInput
                label="Confirm password"
                value={regConfirm}
                onChange={(e) => setRegConfirm(e.currentTarget.value)}
              />
              <Button onClick={handleRegister} loading={regLoading}>
                Register
              </Button>
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </Modal>
    </>
  );
};

export default LoginModal;
