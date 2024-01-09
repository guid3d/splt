import {
  ActionIcon,
  Center,
  Title,
  rem,
  Modal as MantineModal,
  Stack,
  Indicator,
  Text,
  ScrollArea,
  SimpleGrid,
  AvatarGroup,
  Avatar,
  UnstyledButton,
  NavLink,
  Group,
  TextProps,
  Container,
} from "@mantine/core";
import React, { useState } from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconChevronLeft } from "@tabler/icons-react";
import { UseFormReturnType, useForm } from "@mantine/form";
import { DebtData, PaymentMethodType } from "@/types";
import { useRouter } from "next/navigation";
import { useViewportSize } from "@mantine/hooks";
import { EuroNumberFormatter } from "../NumberFormatter";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { IconMessage } from "@tabler/icons-react";
import { IconUser } from "@tabler/icons-react";
import { IconCash } from "@tabler/icons-react";
import { IconBrandPaypal } from "@tabler/icons-react";
import { IconBuildingBank } from "@tabler/icons-react";
import { Icon123 } from "@tabler/icons-react";
import CopyButton from "../CopyButton";

const textTypeStyle: TextProps = {
  // w: rem(80),
  // fw: 500,
  c: "dimmed",
  size: "sm",
};

const dataStyle = {
  // fw: 500,
  maw: rem(330),
};

const iconProps = {
  style: {
    width: rem(30),
    height: rem(30),
    marginTop: rem(5),
    marginBottom: rem(10),
    marginLeft: rem(10),
    marginRight: rem(10),
  },
  stroke: 1.25,
};
type ViewDebtModalProps = {
  debt: DebtData;
  // form: UseFormReturnType<any>;
};

const ViewDebtModal = ({ debt }: ViewDebtModalProps) => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 50em)") || false;
  const { height, width } = useViewportSize();
  const modalHeight = isMobile ? rem(height - 100) : rem(700);

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <MantineModal.Root
        opened={opened}
        onClose={close}
        fullScreen={isMobile}
        transitionProps={{ transition: "pop", duration: 200 }}
        centered
        // zIndex={201}
      >
        <MantineModal.Overlay />
        <MantineModal.Content radius={isMobile ? 0 : "l"}>
          <MantineModal.Header>
            <ActionIcon
              variant="transparent"
              color="gray"
              aria-label="Settings"
              onClick={close}
            >
              <IconChevronLeft
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
          </MantineModal.Header>
          <MantineModal.Body>
            <ScrollArea h={modalHeight}>
              <Container>
                <Stack>
                  <Center>
                    <Text fw={500}>Debt</Text>
                  </Center>
                  <Center>
                    <Group>
                      <Stack>
                        <Center>
                          <ActionIcon
                            disabled
                            variant="default"
                            size={rem(100)}
                            radius={rem(100)}
                          >
                            <Title order={1} style={{ fontSize: rem(60) }}>
                              {debt.fromPerson.avatar.emoji}
                            </Title>
                          </ActionIcon>
                        </Center>
                        <Center>
                          <Title fw={500} order={2} pb="md">
                            {debt.fromPerson.name}
                          </Title>
                        </Center>
                      </Stack>
                      <Stack gap={0}>
                        <Center>
                          <IconArrowNarrowRight size="3rem" stroke={1.5} />
                        </Center>
                        <Center>
                          <Text>owes</Text>
                        </Center>
                      </Stack>
                      <Stack>
                        <Center>
                          <ActionIcon
                            disabled
                            variant="default"
                            size={rem(100)}
                            radius={rem(100)}
                          >
                            <Title order={1} style={{ fontSize: rem(60) }}>
                              {debt.toPerson.avatar.emoji}
                            </Title>
                          </ActionIcon>
                        </Center>
                        <Center>
                          <Title fw={500} order={2} pb="md">
                            {debt.toPerson.name}
                          </Title>
                        </Center>
                      </Stack>
                    </Group>
                  </Center>
                  <Center>
                    <Title order={1} style={{ fontSize: rem(40) }}>
                      <EuroNumberFormatter value={debt.amount} />
                    </Title>
                  </Center>
                  <Text fw={500}>Details</Text>

                  <Stack>
                    <Group align="start">
                      {debt.toPerson.selectedPaymentMethod ===
                        PaymentMethodType.Iban && (
                        <IconBuildingBank {...iconProps} />
                      )}
                      {debt.toPerson.selectedPaymentMethod ===
                        PaymentMethodType.Cash && <IconCash {...iconProps} />}
                      {debt.toPerson.selectedPaymentMethod ===
                        PaymentMethodType.Paypal && (
                        <IconBrandPaypal {...iconProps} />
                      )}
                      <Stack gap={0}>
                        <Text {...textTypeStyle}>Preferred Payment Method</Text>
                        <Text {...dataStyle}>
                          {debt.toPerson.selectedPaymentMethod ===
                          PaymentMethodType.Iban
                            ? "IBAN"
                            : debt.toPerson.selectedPaymentMethod ===
                              PaymentMethodType.Cash
                            ? "Cash"
                            : "Paypal"}
                        </Text>
                      </Stack>
                    </Group>
                    {debt.toPerson.selectedPaymentMethod ===
                      PaymentMethodType.Iban && (
                      <>
                        <Group align="start">
                          <IconUser {...iconProps} />
                          <Stack gap={0}>
                            <Text {...textTypeStyle}>Account Name</Text>
                            <Group gap={0}>
                              <Text {...dataStyle}>
                                {debt.toPerson.accountName
                                  ? debt.toPerson.accountName
                                  : "-"}
                              </Text>
                              <CopyButton value={debt.toPerson.accountName} />
                            </Group>
                          </Stack>
                        </Group>
                        <Group align="start">
                          <Icon123 {...iconProps} />
                          <Stack gap={0}>
                            <Text {...textTypeStyle}>IBAN</Text>
                            <Group gap={0}>
                              <Text {...dataStyle}>
                                {debt.toPerson.paymentMethod.iban
                                  ? debt.toPerson.paymentMethod.iban
                                  : "-"}
                              </Text>
                              <CopyButton
                                value={debt.toPerson.paymentMethod.iban}
                              />
                            </Group>
                          </Stack>
                        </Group>
                      </>
                    )}
                    {debt.toPerson.selectedPaymentMethod ===
                      PaymentMethodType.Paypal && (
                      <>
                        <Group align="start">
                          <IconUser {...iconProps} />
                          <Stack gap={0}>
                            <Text {...textTypeStyle}>
                              Paypal Email / Account
                            </Text>
                            <Group gap={0}>
                              <Text {...dataStyle}>
                                {debt.toPerson.paymentMethod.paypal
                                  ? debt.toPerson.paymentMethod.paypal
                                  : "-"}
                              </Text>
                              <CopyButton
                                value={debt.toPerson.paymentMethod.paypal}
                              />
                            </Group>
                          </Stack>
                        </Group>
                      </>
                    )}
                  </Stack>
                </Stack>
              </Container>
            </ScrollArea>
          </MantineModal.Body>
        </MantineModal.Content>
      </MantineModal.Root>

      <UnstyledButton onClick={open}>
        <NavLink
          // href="#required-for-focus"
          label={`${debt.fromPerson.name} → ${debt.toPerson.name}`}
          leftSection={
            <AvatarGroup>
              <Avatar>
                <Title order={2}>{debt.fromPerson.avatar.emoji}</Title>
              </Avatar>
              <Avatar>
                <Title order={2}>{debt.toPerson.avatar.emoji}</Title>
              </Avatar>
            </AvatarGroup>
          }
          rightSection={
            <Title order={5}>
              <EuroNumberFormatter value={debt.amount} />
            </Title>
          }
        ></NavLink>
      </UnstyledButton>
    </>
  );
};

export default ViewDebtModal;
