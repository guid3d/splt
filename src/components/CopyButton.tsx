import {
  CopyButton as MantineCopyButton,
  ActionIcon,
  Tooltip,
  rem,
} from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";

type CopyButtonProps = {
  value: string;
};

const CopyButton = ({ value }: CopyButtonProps) => {
  return (
    <MantineCopyButton value={value} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
          <ActionIcon
            color={copied ? "teal" : "gray"}
            variant="subtle"
            onClick={copy}
          >
            {copied ? (
              <IconCheck style={{ width: rem(16) }} />
            ) : (
              <IconCopy style={{ width: rem(16) }} />
            )}
          </ActionIcon>
        </Tooltip>
      )}
    </MantineCopyButton>
  );
};

export default CopyButton;
