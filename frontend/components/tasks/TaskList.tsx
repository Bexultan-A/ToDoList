"use client";

import { Card, Text, Flex, Pagination } from "@mantine/core";
import { useTasks } from "@/services/tasks/hooks";
import { TaskItem } from "./TaskItem";
import { TaskActions } from "./TaskActions";
import { TaskFilter } from "@/types/task";
import { useState } from "react";

export function TaskList() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const { data, isLoading, isError } = useTasks(page, filter);

  if (isLoading) return <Text>Loading tasks...</Text>;
  if (isError) return <Text>Failed to load tasks</Text>;

  const onFilterChange = (filter: TaskFilter) => {
    setFilter(filter);
    setPage(1);
  };

  const onCompletedCheck = () => {
    if (data!.items.length === 1 && page !== 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="space-y-4">
      <TaskActions filter={filter} onFilterChange={onFilterChange} />

      {data!.items.length === 0 ? (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text>No tasks found. Create your first task!</Text>
        </Card>
      ) : (
        <>
          <div className="space-y-4">
            {data!.items.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onCompletedCheck={onCompletedCheck}
              />
            ))}
          </div>

          {data!.total_pages > 1 && (
            <Flex justify="center" mt="xl">
              <Pagination
                value={page}
                onChange={setPage}
                total={data!.total_pages}
                color="rgba(0, 0, 0, 1)"
              />
            </Flex>
          )}
        </>
      )}
    </div>
  );
}
