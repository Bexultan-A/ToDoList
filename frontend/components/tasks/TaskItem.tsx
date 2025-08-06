"use client";

import { Card, Group, Badge, ActionIcon, Flex, Text } from "@mantine/core";
import { IconTrash, IconEdit, IconCheck } from "@tabler/icons-react";
import { Task } from "@/types/task";
import { modals } from "@mantine/modals";
import { useDeleteTask, useToggleTaskCompletion } from "@/services/tasks/hooks";
import { useTaskActions } from "@/services/tasks/TaskActionsContext";

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: toggleCompletion } = useToggleTaskCompletion();
  const { setEditingTask, setIsEditModalOpen } = useTaskActions();

  const handleDelete = () => {
    modals.openConfirmModal({
      title: "Delete task",
      children: (
        <Text size="sm">Are you sure you want to delete this task?</Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => deleteTask(task.id),
    });
  };

  const handleEdit = () => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleToggleComplete = () => {
    toggleCompletion(task);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between">
        <Flex direction="column" gap="sm">
          <Text fw={500} td={task.is_completed ? "line-through" : undefined}>
            {task.title}
          </Text>
          {task.description && (
            <Text size="sm" c="dimmed">
              {task.description}
            </Text>
          )}
        </Flex>
        <Group>
          <Badge color={task.is_completed ? "green" : "gray"}>
            {task.is_completed ? "Completed" : "Pending"}
          </Badge>
          <ActionIcon
            variant="light"
            color={task.is_completed ? "green" : "gray"}
            onClick={handleToggleComplete}
          >
            <IconCheck size={16} />
          </ActionIcon>
          <ActionIcon variant="light" color="blue" onClick={handleEdit}>
            <IconEdit size={16} />
          </ActionIcon>
          <ActionIcon variant="light" color="red" onClick={handleDelete}>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
}
