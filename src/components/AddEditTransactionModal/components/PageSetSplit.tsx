import {
  Center, Container, ScrollArea,
  SegmentedControl, Stack, Text, rem
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { GroupData, SplitType, TransactionFormValues } from "@/types";
import { useMediaQuery, useViewportSize } from "@mantine/hooks";
import ParticipantAvatarHorizontal from "@/components/ParticipantAvatarHorizontal";
import { EuroNumberFormatter } from "@/components/NumberFormatter";

type PageSetSplitProps = {
  groupData: GroupData;
  form: UseFormReturnType<TransactionFormValues>;
};

const PageSetSplit = ({ groupData, form }: PageSetSplitProps) => {
  const isMobile = useMediaQuery("(max-width: 50em)") || false;
  const { height, width } = useViewportSize();
  const modalHeight = isMobile ? rem(height - 100) : rem(500);

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
              groupData.expand.participants.map((participant) => (
                <ParticipantAvatarHorizontal
                  key={participant.id}
                  avatar={participant.avatar}
                  name={participant.name}
                  description={
                    <Text c="dimmed" lineClamp={2} ta="center">
                      {EuroNumberFormatter({
                        value: form.values.amount
                          ? form.values.amount /
                            groupData.expand.participants.length
                          : 0,
                      })}
                    </Text>
                  }
                />
              ))}
          </div>
          <div>
            {/* {form.values.splitType === SplitType.Part &&
              groupData.expand.participants.map((participant) => (
                <ParticipantAvatarHorizontal
                  key={participant.id}
                  avatar={participant.avatar}
                  name={participant.name}
                  value={1}
                  isEditableValue
                />
              ))} */}
          </div>
          {/* </Group> */}
        </Stack>
      </ScrollArea>
    </Container>
  );
};

export default PageSetSplit;
