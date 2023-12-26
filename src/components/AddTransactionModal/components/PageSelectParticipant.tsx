import EmojiActionButtion from "@/components/EmojiActionButtion";
import {
  Center,
  CheckIcon,
  Combobox,
  Container,
  Group,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  useCombobox,
} from "@mantine/core";
import React, { useState } from "react";
import { SplitType, TransactionFormValues } from "..";
import { UseFormReturnType } from "@mantine/form";
import ParticipantAvatar from "@/components/ParticipantAvatar";
import { BillData } from "@/types";

type PageSelectParticipantProps = {
  billData: BillData;
  form: UseFormReturnType<TransactionFormValues>;
};

const PageSelectParticipant = ({
  billData,
  form,
}: PageSelectParticipantProps) => {
  const combobox = useCombobox();
  const [value, setValue] = useState<string[]>([]);

  const handleValueSelect = (val: string) => {
    setValue((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val]
    );
    // const currentParticipant = form.values.participant;
    // form.setFieldValue(
    //   "participant",
    //   currentParticipant.includes(val)
    //     ? currentParticipant.filter((v) => v !== val)
    //     : [...currentParticipant, val]
    // );
  };

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));
  return (
    <Container>
      <Stack gap="s">
        <Center>
          <Text fw={500} mb="sm">
            Participants
          </Text>
        </Center>
        {/* <Group justify="space-between">
          <Text size="sm">Seperated by </Text>
          <SegmentedControl
            size="sm"
            value={form.values.splitType}
            onChange={(value) => {
              form.setFieldValue("split", value);
            }}
            data={[
              { label: "Equally", value: SplitType.Equally },
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
            checked={form.values.everyoneIsParticipant}
            onChange={(event) => {
              form.setFieldValue(
                "everyoneIsParticipant",
                event.currentTarget.checked
              );
              // form.setFieldValue("participant", [])
            }}
            label="Everyone in the group"
            // description="When new participant is later added, he/she will also be included  "
            // defaultChecked
          />
        </Center>
        <Center>
          {!form.values.everyoneIsParticipant && (
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
                  value={value}
                  // onChange={(event) => setValue(event.currentTarget.value)}
                />
              </Combobox.EventsTarget> */}
                <Combobox.Options>
                  <SimpleGrid cols={3} spacing={0}>
                    {billData.participant.map((item, index) => (
                      <Combobox.Option
                        key={index}
                        value={item.name}
                        active={value.includes(item.name)}
                        // m={0}
                        // p={0}
                      >
                        {value.includes(item.name) ? (
                          <ParticipantAvatar
                            key={index}
                            avatar={item.avatar}
                            name={item.name}
                            isSelected
                          />
                        ) : (
                          <ParticipantAvatar
                            key={index}
                            avatar={item.avatar}
                            name={item.name}
                          />
                        )}
                      </Combobox.Option>
                    ))}
                  </SimpleGrid>
                </Combobox.Options>
              </Stack>
            </Combobox>
          )}
        </Center>
      </Stack>
    </Container>
  );
};

export default PageSelectParticipant;
