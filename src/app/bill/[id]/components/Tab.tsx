import { SegmentedControl, VisuallyHidden, rem } from "@mantine/core";
import { IconListLetters } from "@tabler/icons-react";
import { IconChartCandle } from "@tabler/icons-react";
import React from "react";

type TabProps = {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
};

const Tab = ({ selectedTab, setSelectedTab }: TabProps) => {
  const iconProps = {
    style: { width: rem(20), height: rem(20), display: "block" },
    stroke: 1.5,
  };

  return (
    <SegmentedControl
      value={selectedTab}
      onChange={setSelectedTab}
      size="xl"
      data={[
        {
          value: "overview",
          label: (
            <>
              <IconChartCandle {...iconProps} />
              <VisuallyHidden>Overview</VisuallyHidden>
            </>
          ),
        },
        {
          value: "transactions",
          label: (
            <>
              <IconListLetters {...iconProps} />
              <VisuallyHidden>Transactions</VisuallyHidden>
            </>
          ),
        },
      ]}
    />
  );
};

export default Tab;
