import EmojiActionButtion from "@/components/EmojiActionButtion";
import {
  Center,
  CheckIcon,
  Combobox,
  Container,
  Group,
  ScrollArea,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  TextInput,
  rem,
  useCombobox,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { UseFormReturnType } from "@mantine/form";
import ParticipantAvatar from "@/components/ParticipantAvatar";
import { GroupData, SplitType, TransactionFormValues } from "@/types";
import { useMediaQuery, useViewportSize } from "@mantine/hooks";

type PageSelectParticipantProps = {
  groupData: GroupData;
  form: UseFormReturnType<TransactionFormValues>;
};

const PageSelectParticipant = ({
  groupData,
  form,
}: PageSelectParticipantProps) => {
  const isMobile = useMediaQuery("(max-width: 50em)") || false;
  const { height, width } = useViewportSize();
  const modalHeight = isMobile ? rem(height - 100) : rem(500);
  useEffect(() => {
    // Select all participant when toggle on
    if (form.values.everyoneIsParticipant) {
      selectAllParticipant();
    }
  }, []);

  const combobox = useCombobox();
  // const [value, setValue] = useState<string[]>([...form.values.participant]);

  const selectAllParticipant = () => {
    // console.log(groupData);
    const allParticipant = groupData.expand.participants.map(
      (participant) => participant.id
    ) as string[];
    form.setFieldValue("participants", allParticipant);
  };

  const handleValueSelect = (val: string) => {
    // setValue((current) =>
    //   current.includes(val)
    //     ? current.filter((v) => v !== val)
    //     : [...current, val]
    // );
    const currentParticipants = form.values.participants;
    form.setFieldValue(
      "participants",
      currentParticipants.includes(val)
        ? currentParticipants.filter((v) => v !== val)
        : [...currentParticipants, val]
    );

    form.setFieldValue("everyoneIsParticipant", false);
  };

  // const handleValueRemove = (val: string) =>
  //   setValue((current) => current.filter((v) => v !== val));

  return (
    <Container>
      <ScrollArea h={modalHeight}>
        <Stack gap="s">
          <Center>
            <Text fw={500} mb="sm">
              Participant
            </Text>
          </Center>
          {/* 
        // TODO: Add split type later iteration
        <Group justify="space-between">
          <Text size="sm">Seperated by </Text>
          <SegmentedControl
            size="sm"
            value={form.values.splitType}
            onChange={(value) => {
              form.setFieldValue("split", value);
            }}
            data={[
              { label: "Equal", value: SplitType.Equal },
              { label: "Percent", value: SplitType.Percent, disabled: true },
              { label: "Amount", value: SplitType.Amount, disabled: true },
            ]}
          />
        </Group> */}
          <Center>
            {/* <Text size="sm" pr="xl">Everyone</Text> */}
            <Switch
              // size="md"
              // {...form.getInputProps("everyoneIsParticipant")}
              maw={rem(300)}
              checked={form.values.everyoneIsParticipant}
              onChange={(event) => {
                form.setFieldValue(
                  "everyoneIsParticipant",
                  event.currentTarget.checked
                );
                // Select all participant when toggle on
                selectAllParticipant();
              }}
              label="Everyone in the group"
              description="When new participant is later added, he/she will also be included"
            />
          </Center>
          {form.errors.participants && (
            <Center>
              <Text c="red" size="sm">
                {form.errors.participants}
              </Text>
            </Center>
          )}
          <Center>
            <Combobox
              store={combobox}
              onOptionSubmit={handleValueSelect}
              withinPortal={false}
              // disabled={form.values.everyoneIsParticipant}
            >
              <Stack>
                {/* <Combobox.EventsTarget>
                <TextInput
                  placeholder="Pick value"
                  value={form.values.participants}
                  // onChange={(event) => {setValue(event.currentTarget.value)}}
                />
              </Combobox.EventsTarget> */}
                {/* <ScrollArea.Autosize mah={isMobile ? 800 : 400}> */}
                <Combobox.Options>
                  <SimpleGrid cols={3} spacing={0} pb="xl">
                    {groupData.expand.participants.map((item, index) => (
                      <Combobox.Option
                        key={item.id}
                        value={item.id!}
                        active={form.values.participants.includes(item.id!)}
                        // m={0}
                        // p={0}
                        style={{ backgroundColor: "transparent" }} // disable hover effect
                      >
                        {form.values.participants.includes(item.id!) ? (
                          <ParticipantAvatar
                            key={item.id}
                            avatar={item.avatar}
                            name={item.name}
                            isSelected
                          />
                        ) : (
                          <ParticipantAvatar
                            key={item.id}
                            avatar={item.avatar}
                            name={item.name}
                          />
                        )}
                      </Combobox.Option>
                    ))}
                  </SimpleGrid>
                </Combobox.Options>
                {/* </ScrollArea.Autosize> */}
              </Stack>
            </Combobox>
          </Center>
        </Stack>
      </ScrollArea>
    </Container>
  );
};

export default PageSelectParticipant;
