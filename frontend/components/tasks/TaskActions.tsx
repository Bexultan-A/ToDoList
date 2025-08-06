"use client";

import { Button, Group, SegmentedControl } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { TaskFilter } from "@/types/task";
import { useTaskActions } from "@/services/tasks/TaskActionsContext";

interface TaskActionsProps {
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}

export function TaskActions({ filter, onFilterChange }: TaskActionsProps) {
  const { setIsCreateModalOpen } = useTaskActions();

  return (
    <Group justify="space-between" mb="md">
      <SegmentedControl
        value={filter}
        onChange={(value) => onFilterChange(value as TaskFilter)}
        data={[
          { label: "All", value: "all" },
          { label: "Completed", value: "completed" },
          { label: "Pending", value: "pending" },
        ]}
      />
      <Button
        leftSection={<IconPlus size={16} />}
        onClick={() => setIsCreateModalOpen(true)}
      >
        New Task
      </Button>
    </Group>
  );
}
