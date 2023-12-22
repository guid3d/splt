import { SegmentedControl, VisuallyHidden, rem } from "@mantine/core";
import { IconListLetters } from "@tabler/icons-react";
import { IconChartCandle } from "@tabler/icons-react";
import React from "react";

const Tab = () => {
  const iconProps = {
    style: { width: rem(20), height: rem(20), display: "block" },
    stroke: 1.5,
  };

  return (
    <SegmentedControl
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
