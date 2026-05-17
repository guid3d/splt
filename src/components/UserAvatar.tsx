"use client";
import { Avatar, AvatarProps } from "@mantine/core";

const UserAvatar = ({ style, ...props }: AvatarProps) => {
  return (
    <Avatar
      variant="transparent"
      style={{
        backgroundColor:
          "light-dark(var(--mantine-color-gray-4), var(--mantine-color-dark-8))",
        ...style,
      }}
      {...props}
    />
  );
};

export default UserAvatar;
