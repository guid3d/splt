import {
  Button,
  Center,
  Combobox,
  Container,
  Group,
  Input,
  NumberInput,
  ScrollArea,
  SegmentedControl,
  Stack,
  Switch,
  Text,
  rem,
  useCombobox,
  useComputedColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import {
  GroupData,
  SplitData,
  SplitType,
  TransactionFormValues,
} from "@/types";
import { useMediaQuery, useViewportSize } from "@mantine/hooks";
import ParticipantAvatarHorizontal from "@/components/ParticipantAvatarHorizontal";
import { CurrencyFormatter } from "@/components/NumberFormatter";
import { currencyFormat } from "@/utils/currency";
import { useEffect } from "react";

type PageSetSplitProps = {
  groupData: GroupData;
  form: UseFormReturnType<TransactionFormValues>;
  splitData: SplitData[];
  setSplitData: (splitData: SplitData[]) => void;
};

const PageSetSplit = ({
  groupData,
  form,
  splitData,
  setSplitData,
}: PageSetSplitProps) => {
  const isMobile = useMediaQuery("(max-width: 50em)") || false;
  const { height, width } = useViewportSize();
  const modalHeight = isMobile ? rem(height - 100) : rem(500);
  const { symbol, decimalSeparator, thousandSeparator } = currencyFormat(groupData.currency);
  const theme = useMantineTheme();
  const computedColorScheme = useComputedColorScheme();

  const renderInputBackgroundColor = () => {
    if (computedColorScheme === "dark") {
      return theme.colors.dark[6];
    }
    return theme.colors.gray[2];
  };

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

    const allParticipantInSplitDataFormat = groupData.expand.participants.map(
      (participant) => ({
        expenseId: "",
        participantId: participant.id!,
        part: 1,
        amount: form.values.amount
          ? form.values.amount / groupData.expand.participants.length
          : 0,
      })
    );
    setSplitData(allParticipantInSplitDataFormat);
  };

  const handleValueSelect = (val: string) => {
    // setValue((current) =>
    //   current.includes(val)
    //     ? current.filter((v) => v !== val)
    //     : [...current, val]
    // );
    const currentParticipants = form.values.participants;
    // Filter out the selected participant if already selected
    form.setFieldValue(
      "participants",
      currentParticipants.includes(val)
        ? currentParticipants.filter((v) => v !== val)
        : [...currentParticipants, val]
    );
    form.setFieldValue("everyoneIsParticipant", false);
    // -------------------------

    // Update split data
    const newSplitData = currentParticipants.includes(val)
      ? splitData.filter((v) => v.participantId !== val)
      : [
          ...splitData,
          {
            expenseId: "",
            participantId: val,
            part: 1,
            amount: 0,
          },
        ];
    setSplitData(newSplitData);
    // -------------------------
  };

  const calculateEqualSplit = () => {
    // Amount / number of participants
    return form.values.amount
      ? form.values.amount / form.values.participants.length
      : 0;
  };

  const calculateRemainingAmount = () => {
    const totalEntered = splitData.reduce(
      (sum, split) => sum + (split.amount || 0),
      0
    );
    return (form.values.amount || 0) - totalEntered;
  };

  const calculatePartSplit = (part: number) => {
    let totalPart = 0;
    // Amount * (part / total parts)
    splitData.map((split) => {
      totalPart += split.part || 0;
    });

    const amount = form.values.amount
      ? form.values.amount * (part / totalPart)
      : 0;

    return amount;
  };

  return (
    <Container>
      <ScrollArea h={modalHeight} type="never">
        <Stack gap={0}>
          <Center>
            <Text fw={500} mb="sm">
              Participant
            </Text>
          </Center>
          {form.errors.participants && (
            <Center>
              <Text pb={10} c="red" size="sm">
                {form.errors.participants}
              </Text>
            </Center>
          )}
          <Center>
            {/* <Text size="sm" pr="xl">Everyone</Text> */}
            <Switch
              // size="md"
              // {...form.getInputProps("everyoneIsParticipant")}
              // maw={rem(300)}
              checked={form.values.everyoneIsParticipant}
              onChange={(event) => {
                form.setFieldValue(
                  "everyoneIsParticipant",
                  event.currentTarget.checked
                );
                if (event.currentTarget.checked) {
                  selectAllParticipant();
                  form.setFieldValue("splitType", SplitType.Equal);
                }
              }}
              label="Everyone in the group"
              description="When new participant is later added, he/she will also be included"
            />
          </Center>

          {/* <Center> */}
          <Group mt={20} mb={10} justify="space-between">
            <Text size="sm">Split Type</Text>
            <SegmentedControl
              size="sm"
              value={form.values.splitType}
              onChange={(value) => {
                form.setFieldValue("splitType", value as SplitType);
              }}
              data={[
                { label: "Equal", value: SplitType.Equal },
                { label: "Part", value: SplitType.Part, disabled: form.values.everyoneIsParticipant },
                { label: "Amount", value: SplitType.Amount, disabled: form.values.everyoneIsParticipant},
              ]}
            />
          </Group>
          {/* </Center> */}

          <Combobox
            store={combobox}
            onOptionSubmit={handleValueSelect}
            withinPortal={false}
          >
            <Stack gap={8}>
              {/* <Combobox.EventsTarget>
                <TextInput
                  placeholder="Pick value"
                  value={form.values.participants}
                  // onChange={(event) => {setValue(event.currentTarget.value)}}
                />
              </Combobox.EventsTarget> */}
              {/* <ScrollArea.Autosize mah={isMobile ? 800 : 400}> */}
              {/* <Combobox.Options> */}
              {groupData.expand.participants.map((participant) => (
                <div key={participant.id}>
                  {form.values.participants.includes(participant.id!) ? (
                    <div>
                      {(form.values.splitType === SplitType.Equal && (
                        <Combobox.Option
                          value={participant.id!}
                          active={form.values.participants.includes(
                            participant.id!
                          )}
                          style={{ backgroundColor: "transparent" }} // disable hover effect
                        >
                          <ParticipantAvatarHorizontal
                            key={participant.id}
                            avatar={participant.avatar}
                            name={participant.name}
                            description={
                              <Text lineClamp={2} ta="center">
                                {CurrencyFormatter({
                                  value: calculateEqualSplit(),
                                  currency: groupData.currency,
                                })}
                              </Text>
                            }
                            isSelected
                          />
                        </Combobox.Option>
                      )) ||
                        (form.values.splitType === SplitType.Part &&
                          splitData.map(
                            (split, index) =>
                              split.participantId === participant.id && (
                                <Group
                                  grow
                                  key={index}
                                  preventGrowOverflow={false}
                                  wrap="nowrap"
                                  gap={1}
                                  bg={renderInputBackgroundColor()}
                                  style={{
                                    borderRadius: 16,
                                  }}
                                >
                                  <Combobox.Option
                                    value={participant.id!}
                                    active={form.values.participants.includes(
                                      participant.id!
                                    )}
                                    // style={{ backgroundColor: "transparent" }} // disable hover effect
                                  >
                                    <ParticipantAvatarHorizontal
                                      key={participant.id}
                                      avatar={participant.avatar}
                                      name={participant.name}
                                      description={
                                        <Text
                                          c="dimmed"
                                          lineClamp={2}
                                          ta="center"
                                        >
                                          {CurrencyFormatter({
                                            value: calculatePartSplit(
                                              split.part || 0
                                            ),
                                            currency: groupData.currency,
                                          })}
                                        </Text>
                                      }
                                      isSelected
                                    />
                                  </Combobox.Option>
                                  <Group gap={0} maw={rem(109)}>
                                    <Button
                                      disabled={split.part === 1}
                                      variant="subtle"
                                      size="compact-xl"
                                      // radius="md"
                                      color="gray"
                                      onClick={() => {
                                        const newSplitData = splitData.map(
                                          (v) =>
                                            v.participantId === participant.id
                                              ? {
                                                  ...v,
                                                  part: v.part ? v.part - 1 : 0,
                                                }
                                              : v
                                        );
                                        setSplitData(newSplitData);
                                      }}
                                    >
                                      -
                                    </Button>
                                    <Input
                                      maw={rem(22)}
                                      type="number"
                                      variant="unstyled"
                                      radius={0}
                                      styles={{
                                        input: {
                                          textAlign: "center",
                                          fontSize: rem(20),
                                        },
                                      }}
                                      value={split.part ? split.part : ""}
                                      onChange={(e) => {
                                        const parseInputValue = e.currentTarget
                                          .value
                                          ? parseInt(e.currentTarget.value)
                                          : null;
                                        const newSplitData = splitData.map(
                                          (v) =>
                                            v.participantId === participant.id
                                              ? {
                                                  ...v,
                                                  part: parseInputValue,
                                                }
                                              : v
                                        );
                                        setSplitData(newSplitData);
                                      }}
                                    ></Input>
                                    <Button
                                      variant="subtle"
                                      size="compact-xl"
                                      // radius="md"
                                      color="gray"
                                      onClick={() => {
                                        const newSplitData = splitData.map(
                                          (v) =>
                                            v.participantId === participant.id
                                              ? {
                                                  ...v,
                                                  part: v.part ? v.part + 1 : 0,
                                                }
                                              : v
                                        );
                                        setSplitData(newSplitData);
                                      }}
                                    >
                                      +
                                    </Button>
                                  </Group>
                                </Group>
                              )
                          )) ||
                        // TODO: Add helper when amount change amount, suggest the recommendation amount
                        (form.values.splitType === SplitType.Amount &&
                          splitData.map(
                            (split, index) =>
                              split.participantId === participant.id && (
                                <Group
                                  grow
                                  key={index}
                                  preventGrowOverflow={false}
                                  wrap="nowrap"
                                  gap={1}
                                  bg={renderInputBackgroundColor()}
                                  style={{
                                    borderRadius: 16,
                                  }}
                                >
                                  <Combobox.Option
                                    value={participant.id!}
                                    active={form.values.participants.includes(
                                      participant.id!
                                    )}
                                  >
                                    <ParticipantAvatarHorizontal
                                      key={participant.id}
                                      avatar={participant.avatar}
                                      name={participant.name}
                                      isSelected
                                    />
                                  </Combobox.Option>
                                  <NumberInput
                                    styles={{
                                      input: {
                                        textAlign: "end",
                                      },
                                    }}
                                    maw={rem(200)}
                                    radius={0}
                                    size="md"
                                    min={0}
                                    max={9999999}
                                    clampBehavior="strict"
                                    placeholder={`0${decimalSeparator}00${symbol}`}
                                    suffix={symbol}
                                    variant="unstyled"
                                    decimalScale={2}
                                    decimalSeparator={decimalSeparator}
                                    thousandSeparator={thousandSeparator}
                                    allowNegative={false}
                                    value={split.amount ?? ""}
                                    onChange={(e) => {
                                      const newSplitData = splitData.map((v) =>
                                        v.participantId === participant.id
                                          ? {
                                              ...v,
                                              amount: typeof e === "number" ? e : parseFloat(e) || null,
                                            }
                                          : v
                                      );
                                      setSplitData(newSplitData);
                                    }}
                                  />
                                </Group>
                              )
                          ))}
                    </div>
                  ) : (
                    <Combobox.Option
                      // px={0}
                      // py={0}
                      key={participant.id}
                      value={participant.id!}
                      active={form.values.participants.includes(
                        participant.id!
                      )}
                      // m={0}
                      // p={0}
                      style={{ backgroundColor: "transparent" }} // disable hover effect
                    >
                      <ParticipantAvatarHorizontal
                        key={participant.id}
                        avatar={participant.avatar}
                        name={participant.name}
                        // description={
                        //   <Text c="dimmed" lineClamp={2} ta="center">
                        //     {CurrencyFormatter({
                        //       value: calculateEqualSplit(),
                        //     })}
                        //   </Text>
                        // }
                      />
                    </Combobox.Option>
                  )}
                </div>
              ))}
              {/* {form.values.splitType === SplitType.Part &&
                groupData.expand.participants.map(
                  (participant) =>
                    form.values.participants.includes(participant.id!) && (
                      <ParticipantAvatarHorizontal
                        key={participant.id}
                        avatar={participant.avatar}
                        name={participant.name}
                        description={
                          splitData.map(
                            (split, index) =>
                              split.participantId === participant.id && (
                                <div key={index}>
                                  <Input
                                    type="number"
                                    variant="unstyled"
                                    radius={0}
                                    value={split.part ? split.part : ""}
                                    onChange={(e) => {
                                      const parseInputValue = e.currentTarget
                                        .value
                                        ? parseInt(e.currentTarget.value)
                                        : null;
                                      const newSplitData = splitData.map((v) =>
                                        v.participantId === participant.id
                                          ? {
                                              ...v,
                                              part: parseInputValue,
                                            }
                                          : v
                                      );
                                      setSplitData(newSplitData);
                                    }}
                                  ></Input>
                                  <Text c="dimmed" lineClamp={2} ta="center">
                                    {CurrencyFormatter({
                                      value: calculatePartSplit(
                                        split.part || 0
                                      ),
                                    })}
                                  </Text>
                                </div>
                              )
                          )
                          // <>
                          //   <Input value={}></Input>
                          //   <Text c="dimmed" lineClamp={2} ta="center">
                          //     {CurrencyFormatter({
                          //       value: calculatePartSplit(participant.part),
                          //     })}
                          //   </Text>
                          // </>
                        }
                      />
                    )
                )} */}
              {/* </Combobox.Options> */}
              {/* </ScrollArea.Autosize> */}
            </Stack>
          </Combobox>

          {form.values.splitType === SplitType.Amount && (
            <>
              <Group justify="space-between" mt={12} px={4}>
                <Text size="sm" c="dimmed">Remaining</Text>
                <Text
                  size="sm"
                  fw={500}
                  c={calculateRemainingAmount() < -0.001 ? "red" : calculateRemainingAmount() < 0.001 ? "green" : undefined}
                >
                  {CurrencyFormatter({ value: calculateRemainingAmount(), currency: groupData.currency })}
                </Text>
              </Group>
              {form.errors.splitAmountError && (
                <Center mt={4}>
                  <Text c="red" size="sm">
                    {form.errors.splitAmountError}
                  </Text>
                </Center>
              )}
            </>
          )}
        </Stack>
      </ScrollArea>
    </Container>
  );
};

export default PageSetSplit;
