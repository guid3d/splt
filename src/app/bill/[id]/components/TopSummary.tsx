import {
  ActionIcon,
  Avatar,
  AvatarGroup,
  Center,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import React from "react";
import { BillData } from "../page";
import { IconPlus } from "@tabler/icons-react";

type TopSummaryProps = {
  billData: BillData;
};

// TODO: Change any type
const TopSummary = ({ billData }: TopSummaryProps) => {
  return (
    <>
      <Stack gap="xs">
        <Center>
          <ActionIcon disabled variant="default" size={rem(100)} radius={rem(100)}>
            <Title order={1} style={{ fontSize: rem(60) }}>
              {billData.avatar}
            </Title>
          </ActionIcon>
        </Center>
        <Center>
          <Title order={3}>{billData.name}</Title>
        </Center>
        <Center>
          <Text>{billData.description}</Text>
        </Center>
        {/* TODO: Decide later to use this or not
        <Center>
          <AvatarGroup>
            {billData.participant.map((participant, index) => (
              <Avatar key={index}>
                <Title order={2}>{participant.avatar}</Title>
              </Avatar>
            ))}
            <Avatar>
              <IconPlus style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </Avatar>
          </AvatarGroup>
        </Center> */}
      </Stack>
    </>
  );
};

export default TopSummary;
