"use client";
import { Avatar, AvatarProps, useComputedColorScheme } from "@mantine/core";

const UserAvatar = ({ style, ...props }: AvatarProps) => {
  const colorScheme = useComputedColorScheme();
  return (
    <Avatar
      variant="transparent"
      style={{
        backgroundColor:
          colorScheme === "dark"
            ? "var(--mantine-color-dark-8)"
            : "var(--mantine-color-gray-4)",
        ...style,
      }}
      {...props}
    />
  );
};

export default UserAvatar;
