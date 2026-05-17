"use client";
import {
  Menu,
  rem,
  Stack,
  Text,
  Title,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import UserAvatar from "@/components/UserAvatar";
import {
  IconCreditCard,
  IconMoonFilled,
  IconSunFilled,
  IconUserCircle,
  IconUsers,
} from "@tabler/icons-react";
import { Participant } from "@/types";
import { useDisclosure } from "@mantine/hooks";
import UserSelectionModal from "./UserSelectionModal";
import PaymentDetailsModal from "./PaymentDetailsModal";

type UserDropdownProps = {
  currentUser: Participant | null;
  participants: Participant[];
  onSelectUser: (participantId: string) => void;
};

const UserDropdown = ({
  currentUser,
  participants,
  onSelectUser,
}: UserDropdownProps) => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme();
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [paymentModalOpened, { open: openPaymentModal, close: closePaymentModal }] = useDisclosure(false);

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };

  const handleSelectUser = (participantId: string) => {
    onSelectUser(participantId);
    closeModal();
  };

  return (
    <>
      <UserSelectionModal
        opened={modalOpened}
        participants={participants}
        onSelect={handleSelectUser}
        onClose={closeModal}
      />
      {currentUser && (
        <PaymentDetailsModal
          opened={paymentModalOpened}
          participant={currentUser}
          onClose={closePaymentModal}
        />
      )}
      <Menu
        width={200}
        position="bottom-end"
        radius="lg"
      >
        <Menu.Target>
          <UserAvatar size="md" style={{ cursor: "pointer" }}>
            {currentUser ? <Title order={3}>{currentUser.avatar.emoji}</Title> : <IconUserCircle size={16} />}
          </UserAvatar>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>
            <Stack gap={0}>
              <Text size="xs" c="dimmed" lh={1}>
                Hello,
              </Text>
              <Text size="sm" fw={600} lh={1.4} c="var(--mantine-color-text)">
                {currentUser ? currentUser.name : "Choose user"}
              </Text>
            </Stack>
          </Menu.Label>

          <Menu.Divider />

          <Menu.Item
            leftSection={<IconUsers style={{ width: rem(14) }} />}
            onClick={openModal}
          >
            Switch user
          </Menu.Item>

          <Menu.Item
            leftSection={<IconCreditCard style={{ width: rem(14) }} />}
            onClick={openPaymentModal}
            disabled={!currentUser}
          >
            Payment details
          </Menu.Item>

          <Menu.Item
            leftSection={
              computedColorScheme === "dark" ? (
                <IconSunFilled style={{ width: rem(14) }} />
              ) : (
                <IconMoonFilled style={{ width: rem(14) }} />
              )
            }
            onClick={toggleColorScheme}
          >
            {computedColorScheme === "dark" ? "Light mode" : "Dark mode"}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default UserDropdown;
