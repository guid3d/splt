import React from "react";
import {
  ActionIcon,
  Avatar,
  Button,
  Center,
  Flex,
  Group,
  NumberFormatter,
  Skeleton,
  Stack,
  Text,
  TextProps,
  Title,
  rem,
} from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { useExpense } from "@/api";
import dayjs from "dayjs";
import { IconMessage, IconPencil } from "@tabler/icons-react";
import { IconCash } from "@tabler/icons-react";
import { IconUser } from "@tabler/icons-react";
import { IconShare } from "@tabler/icons-react";
import ParticipantAvatar from "@/components/ParticipantAvatar";
import { EuroNumberFormatter } from "@/components/NumberFormatter";
import { IconTrash } from "@tabler/icons-react";
import DeleteButton from "./DeleteButton";
import { useDeleteExpense } from "@/api";
import AddEditTransactionModal from "@/components/AddEditTransactionModal";
import ParticipantAvatarHorizontal from "@/components/ParticipantAvatarHorizontal";

const textTypeStyle: TextProps = {
  // w: rem(80),
  // fw: 500,
  c: "dimmed",
  size: "sm",
};

const dataStyle = {
  // fw: 500,
  w: rem(250),
};

const descriptionStyle: React.CSSProperties = {
  whiteSpace: "break-spaces",
  overflowWrap: "break-word",
};

const iconProps = {
  style: {
    width: rem(30),
    height: rem(30),
    marginTop: rem(5),
    marginBottom: rem(10),
    // marginLeft: rem(10),
    // marginRight: rem(10),
  },
  stroke: 1.25,
};

const ExpensePage = () => {
  const searchParams = useSearchParams();
  const expenseId = searchParams.get("e")!;
  const { data, isPending, error } = useExpense(expenseId);
  const deleteExpenseMutation = useDeleteExpense();

  // console.log(data);
  if (isPending) {
    return (
      <Stack gap={0}>
        <Skeleton height={rem(100)} circle mb="md" mt="xl" />
        <Skeleton height={rem(30)} radius="xl" mb="xl" />
        <Skeleton height={rem(50)} radius="xl" mb="md" />
        <Skeleton height={rem(20)} radius="xl" mb="sm" />
      </Stack>
    );
  }
  if (data) {
    return (
      <Stack gap="xs" pb="xl">
        <Flex justify={"end"}>
          <AddEditTransactionModal
            groupData={data.expand.groupInfo}
            button={
              // <ActionIcon variant="transparent" color="gray" aria-label="Back">
              <IconPencil
                // style={{ width: "120%", height: "120%" }}
                stroke={1.5}
              />
              // </ActionIcon>
            }
            isEdit
            expenseData={data}
          />
        </Flex>
        <Avatar variant="light" size={rem(100)} radius={rem(100)}>
          <Title order={1} style={{ fontSize: rem(60) }}>
            {data.avatar.emoji}
          </Title>
        </Avatar>
        <Title order={2} pb="md">
          {data.name}
        </Title>
        <Title order={1} style={{ fontSize: rem(40) }}>
          <EuroNumberFormatter value={data.amount} />
        </Title>
        <Text c="dimmed" pb="xl">
          {dayjs(data.transactionDateTime).format("dddd, MMMM D, YYYY HH:mm")}
        </Text>
        <Text fw={500}>Details</Text>
        <Stack>
          {data.description && (
            <Group align="start" wrap="nowrap">
              <IconMessage {...iconProps} />

              <Stack gap={0}>
                <Text {...textTypeStyle}>Description</Text>
                <Text {...dataStyle} style={descriptionStyle}>
                  {data.description ? data.description : "-"}
                </Text>
              </Stack>
            </Group>
          )}
          <Group align="start" wrap="nowrap">
            <IconCash {...iconProps} />
            <Stack gap={0}>
              <Text {...textTypeStyle}>Type</Text>
              <Text {...dataStyle}>Expense</Text>
            </Stack>
          </Group>
          <Group align="start" wrap="nowrap">
            <IconUser {...iconProps} />
            <Stack gap={0}>
              <Text {...textTypeStyle}>Paid By</Text>
              <Stack gap={0} {...dataStyle} align="stretch">
                <ParticipantAvatarHorizontal
                  avatar={data.expand.paidBy.avatar}
                  name={data.expand.paidBy.name}
                />
              </Stack>
            </Stack>
          </Group>
          <Group align="start" wrap="nowrap">
            <IconShare {...iconProps} />
            <Stack gap={0}>
              <Text {...textTypeStyle}>Participants</Text>
              <Stack gap={0} {...dataStyle} align="stretch">
                {!data.everyoneIsParticipant
                  ? data.expand.participants.map((participant, index) => (
                      <ParticipantAvatarHorizontal
                        key={participant.id}
                        avatar={participant.avatar}
                        name={participant.name}
                        description={
                          <EuroNumberFormatter value={data.amountPerPerson} />
                        }
                      />
                    ))
                  : data.expand.groupInfo.expand.participants.map(
                      (participant, index) => (
                        <ParticipantAvatarHorizontal
                          key={participant.id}
                          avatar={participant.avatar}
                          name={participant.name}
                          description={
                            <EuroNumberFormatter value={data.amountPerPerson} />
                          }
                        />
                      )
                    )}
                {
                  // To include participants who are not included in the expense but exist in the group
                  !data.everyoneIsParticipant
                    ? data.expand.groupInfo.expand.participants
                        .filter(
                          (participant) =>
                            !data.participants.includes(participant.id!)
                        )
                        .map((participant, index) => (
                          <ParticipantAvatarHorizontal
                            key={participant.id}
                            avatar={participant.avatar}
                            name={participant.name}
                            description={<EuroNumberFormatter value={0} />}
                          />
                        ))
                    : null
                }
              </Stack>
            </Stack>
          </Group>
          <Center>
            <DeleteButton
              id={expenseId}
              deleteMutation={deleteExpenseMutation}
            />
          </Center>
        </Stack>
      </Stack>
    );
  }
};

export default ExpensePage;
