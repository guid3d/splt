import { SegmentedControl, VisuallyHidden, rem } from "@mantine/core";
import { IconListLetters, IconChartCandle, IconCoin } from "@tabler/icons-react";
import React from "react";

export enum TabType {
  Transactions = "transactions",
  Overview = "overview",
  TotalSpending = "totalSpending",
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
          value: TabType.TotalSpending,
          label: (
            <>
              <IconCoin {...iconProps} />
              <VisuallyHidden>Total Spending</VisuallyHidden>
            </>
          ),
        },
      ]}
    />
  );
};

export default Tab;
