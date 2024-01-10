import { useDeleteExpense } from "@/api";
import { Button, Group, rem } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type DeleteButtonProps = {
  id: string;
};

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const [deletePressed, setDeletePressed] = useState(false);
  const deleteExpenseMutation = useDeleteExpense();
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
            w={rem(150)}
            // leftSection={<IconTrash stroke={1.5} style={{ width: rem(20) }} />}
            variant="light"
            color="gray"
            onClick={() => setDeletePressed(false)}
          >
            Cancel
          </Button>
          <Button
            w={rem(150)}
            leftSection={<IconTrash stroke={1.5} style={{ width: rem(20) }} />}
            variant="light"
            color="red"
            loaderProps={{ type: "dots" }}
            loading={deleteExpenseMutation.isPending}
            onClick={() => {
              deleteExpenseMutation.mutate(id, {
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
