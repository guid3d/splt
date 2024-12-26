import {
  Center,
  Container,
  Input,
  ScrollArea,
  SegmentedControl,
  Stack,
  Text,
  rem,
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
import { EuroNumberFormatter } from "@/components/NumberFormatter";

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

  const calculateEqualSplit = () => {
    // Amount / number of participants
    return form.values.amount
      ? form.values.amount / form.values.participants.length
      : 0;
  };

  const calculatePartSplit = (part: number) => {
    let totalPart = 0;
    // Amount * (part / total parts)
    splitData.map((split) => {
      totalPart += split.part || 0;
    });

    console.log(totalPart);

    const amount = form.values.amount
      ? form.values.amount * (part / totalPart)
      : 0;

    return amount;
  };

  console.log(splitData);

  return (
    <Container>
      <ScrollArea h={modalHeight}>
        <Stack gap={0}>
          <Center>
            <Text fw={500} mb="sm">
              Split Type
            </Text>
          </Center>

          {/* // TODO: Add split type later iteration */}
          {/* <Group justify="space-between"> */}
          {/* <Text size="sm">Seperated by </Text> */}
          <Center>
            <SegmentedControl
              size="sm"
              value={form.values.splitType}
              onChange={(value) => {
                form.setFieldValue("splitType", value as SplitType);
              }}
              data={[
                { label: "Equal", value: SplitType.Equal },
                { label: "Part", value: SplitType.Part },
                { label: "Amount", value: SplitType.Amount, disabled: true },
              ]}
            />
          </Center>
          <div>
            {form.values.splitType === SplitType.Equal &&
              groupData.expand.participants.map(
                (participant) =>
                  form.values.participants.includes(participant.id!) && (
                    <ParticipantAvatarHorizontal
                      key={participant.id}
                      avatar={participant.avatar}
                      name={participant.name}
                      description={
                        <Text c="dimmed" lineClamp={2} ta="center">
                          {EuroNumberFormatter({
                            value: calculateEqualSplit(),
                          })}
                        </Text>
                      }
                    />
                  )
              )}
          </div>
          <div>
            {/* {splitData.map((split, index) => (
              <div key={index}>{split}</div>
            ))} */}
            {form.values.splitType === SplitType.Part &&
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
                                  {EuroNumberFormatter({
                                    value: calculatePartSplit(split.part || 0),
                                  })}
                                </Text>
                              </div>
                            )
                        )
                        // <>
                        //   <Input value={}></Input>
                        //   <Text c="dimmed" lineClamp={2} ta="center">
                        //     {EuroNumberFormatter({
                        //       value: calculatePartSplit(participant.part),
                        //     })}
                        //   </Text>
                        // </>
                      }
                    />
                  )
              )}
          </div>
          {/* </Group> */}
        </Stack>
      </ScrollArea>
    </Container>
  );
};

export default PageSetSplit;
