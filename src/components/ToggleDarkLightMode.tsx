import {
  rem,
  UnstyledButton,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";

const ToggleDarkLightMode = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme();
  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <UnstyledButton lightHidden onClick={() => toggleColorScheme()}>
        <IconMoonFilled style={{ width: rem(16) }} />
      </UnstyledButton>
      <UnstyledButton darkHidden onClick={() => toggleColorScheme()}>
        <IconSunFilled style={{ width: rem(16) }} />
      </UnstyledButton>
    </>
  );
};

export default ToggleDarkLightMode;
