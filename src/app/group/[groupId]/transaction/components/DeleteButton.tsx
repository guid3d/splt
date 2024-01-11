import { Button, Group, rem } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { UseMutationResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type DeleteButtonProps = {
  id: string;
  deleteMutation: UseMutationResult<boolean, Error, string, unknown>;
};

const DeleteButton = ({ id, deleteMutation }: DeleteButtonProps) => {
  const [deletePressed, setDeletePressed] = useState(false);
  const router = useRouter();
  return (
    <>
      {!deletePressed ? (
        <Button
          w={rem(150)}
          leftSection={<IconTrash stroke={1.5} style={{ width: rem(20) }} />}
          variant="light"
          color="red"
          onClick={() => setDeletePressed(true)}
        >
          Delete
        </Button>
      ) : (
        <Group>
          <Button
            w={rem(90)}
            // leftSection={<IconTrash stroke={1.5} style={{ width: rem(20) }} />}
            variant="light"
            color="gray"
            onClick={() => setDeletePressed(false)}
          >
            Cancel
          </Button>
          <Button
            w={rem(140)}
            leftSection={<IconTrash stroke={1.5} style={{ width: rem(20) }} />}
            variant="light"
            color="red"
            loaderProps={{ type: "dots" }}
            loading={deleteMutation.isPending}
            onClick={() => {
              deleteMutation.mutate(id, {
                onSuccess: () => {
                  setDeletePressed(false);
                  router.back();
                },
              });
              // setDeletePressed(false);
            }}
          >
            Confirm
          </Button>
        </Group>
      )}
    </>
  );
};

export default DeleteButton;
