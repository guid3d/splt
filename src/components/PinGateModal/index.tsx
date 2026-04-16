"use client";
import React, { useState } from "react";
import {
  Modal,
  Stack,
  Center,
  Text,
  PinInput,
  Button,
  Alert,
} from "@mantine/core";
import { IconAlertCircle, IconLock } from "@tabler/icons-react";
import { useVerifyGroupPin } from "@/api";

const STORAGE_KEY = "splt_verified_groups";

export const isGroupVerified = (groupId: string): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    const ids: string[] = stored ? JSON.parse(stored) : [];
    return ids.includes(groupId);
  } catch {
    return false;
  }
};

const markGroupVerified = (groupId: string) => {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    const ids: string[] = stored ? JSON.parse(stored) : [];
    if (!ids.includes(groupId)) {
      ids.push(groupId);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    }
  } catch {
    // sessionStorage not available
  }
};

type PinGateModalProps = {
  groupId: string;
  onVerified: () => void;
};

const PinGateModal = ({ groupId, onVerified }: PinGateModalProps) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const verifyPin = useVerifyGroupPin();

  const handleSubmit = () => {
    if (pin.length < 4) {
      setError("Please enter all 4 digits");
      return;
    }
    setError(null);
    verifyPin.mutate(
      { groupId, pin },
      {
        onSuccess: (data) => {
          if (data.valid) {
            markGroupVerified(groupId);
            onVerified();
          } else {
            setError("Incorrect PIN. Please try again.");
            setPin("");
          }
        },
        onError: () => {
          setError("Could not verify PIN. Please try again.");
        },
      }
    );
  };

  return (
    <Modal
      opened={true}
      onClose={() => {}}
      withCloseButton={false}
      centered
      title={
        <Center>
          <IconLock size={20} />
          <Text ml={8} fw={600}>
            This group is private
          </Text>
        </Center>
      }
    >
      <Stack gap="md" align="center">
        <Text size="sm" c="dimmed" ta="center">
          Enter the 4-digit PIN to access this group
        </Text>
        {error && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            color="red"
            variant="light"
            w="100%"
          >
            {error}
          </Alert>
        )}
        <PinInput
          size="xl"
          radius="lg"
          length={4}
          type="number"
          value={pin}
          onChange={setPin}
          onComplete={handleSubmit}
        />
        <Button
          onClick={handleSubmit}
          loading={verifyPin.isPending}
          w="100%"
        >
          Unlock
        </Button>
      </Stack>
    </Modal>
  );
};

export default PinGateModal;
