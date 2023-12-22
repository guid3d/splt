import {
  Avatar,
  Center,
  Container,
  NavLink,
  SegmentedControl,
  Stack,
} from "@mantine/core";
import React from "react";
import Tab from "./components/Tab";

const debts = [
  {
    from: { name: "Sarah", avatar: "👩🏻‍💼" },
    to: { name: "John", avatar: "🧑🏻‍💻" },
    amount: 100,
  },
  {
    from: { name: "John", avatar: "👩🏻‍💼" },
    to: { name: "Adam", avatar: "🧑🏻‍💻" },
    amount: 100,
  },
  {
    from: { name: "Tim", avatar: "👩🏻‍💼" },
    to: { name: "John", avatar: "🧑🏻‍💻" },
    amount: 100,
  },
];

const BillPage = () => {
  return (
    <Container>
      <Stack>
        <Center>
          <Tab />
        </Center>
      </Stack>
      <Stack mb={100} gap="xs">
        {/* {debts.map((bill) => (
          <NavLink
            key={bill.id}
            href="#required-for-focus"
            label={bill.name}
            leftSection={<Avatar>{bill.icon}</Avatar>}
            // rightSection={
            //   <IconChevronRight
            //     size="0.8rem"
            //     stroke={1.5}
            //     className="mantine-rotate-rtl"
            //   />
            // }
          ></NavLink>
        ))} */}
      </Stack>
    </Container>
  );
};

export default BillPage;
