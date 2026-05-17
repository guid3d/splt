import {
  rem,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconBrightnessAutoFilled,
  IconMoonFilled,
  IconSunFilled,
} from "@tabler/icons-react";

const ToggleDarkLightMode = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const cycleColorScheme = () => {
    if (colorScheme === "light") setColorScheme("dark");
    else if (colorScheme === "dark") setColorScheme("auto");
    else setColorScheme("light");
  };

  return (
    <UnstyledButton onClick={cycleColorScheme}>
      {colorScheme === "light" && <IconSunFilled style={{ width: rem(16) }} />}
      {colorScheme === "dark" && <IconMoonFilled style={{ width: rem(16) }} />}
      {colorScheme === "auto" && <IconBrightnessAutoFilled style={{ width: rem(16) }} />}
    </UnstyledButton>
  );
};

export default ToggleDarkLightMode;
