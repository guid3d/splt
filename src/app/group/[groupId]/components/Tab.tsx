import { SegmentedControl, VisuallyHidden, rem } from "@mantine/core";
import { IconListLetters } from "@tabler/icons-react";
import { IconChartCandle } from "@tabler/icons-react";
import { IconUsers } from "@tabler/icons-react";
import React from "react";

export enum TabType {
  Transactions = "transactions",
  Overview = "overview",
  Summary = "summary",
}

type TabProps = {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<TabType>>;
};

const Tab = ({ selectedTab, setSelectedTab }: TabProps) => {
  const iconProps = {
    style: { width: rem(20), height: rem(20), display: "block" },
    stroke: 1.5,
  };

  return (
    <SegmentedControl
      value={selectedTab}
      onChange={(e) => setSelectedTab(e as TabType)}
      size="xl"
      data={[
        {
          value: TabType.Transactions,
          label: (
            <>
              <IconListLetters {...iconProps} />
              <VisuallyHidden>Transactions</VisuallyHidden>
            </>
          ),
        },
        {
          value: TabType.Overview,
          label: (
            <>
              <IconChartCandle {...iconProps} />
              <VisuallyHidden>Overview</VisuallyHidden>
            </>
          ),
        },
        {
          value: TabType.Summary,
          label: (
            <>
              <IconUsers {...iconProps} />
              <VisuallyHidden>Summary</VisuallyHidden>
            </>
          ),
        },
      ]}
    />
  );
};

export default Tab;
