"use client";

import { Button, Container, Group, Title } from "@mantine/core";
import { useRequireAuth } from "@/hooks/useauth";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskForm } from "@/components/tasks/TaskForm";
import { useAuth } from "@/lib/auth";
import { TaskActionsProvider } from "@/services/tasks/TaskActionsContext";

export default function TasksPage() {
  useRequireAuth();
  const { logout } = useAuth();

  return (
    <TaskActionsProvider>
      <Container size="lg" className="py-8">
        <Group justify="space-between" mb="xl">
          <Title order={1}>To Do App</Title>
          <Button color="red" onClick={logout}>
            Logout
          </Button>
        </Group>
        <TaskList />
        <TaskForm />
      </Container>
    </TaskActionsProvider>
  );
}
