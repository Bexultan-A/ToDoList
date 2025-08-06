"use client";

import {
  TextInput,
  Textarea,
  Button,
  Group,
  Modal,
  Checkbox,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { TaskFormValues } from "@/types/task";
import { useCreateTask, useUpdateTask } from "@/services/tasks/hooks";
import { useTaskActions } from "@/services/tasks/TaskActionsContext";
import { useEffect } from "react";
import { error } from "console";

export function TaskForm() {
  const {
    isCreateModalOpen,
    setIsCreateModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    editingTask,
  } = useTaskActions();

  const form = useForm<TaskFormValues>({
    initialValues: {
      title: "",
      description: "",
      is_completed: false,
    },
    validate: {
      title: (value) => (value.length < 3 ? "Title is too short" : null),
    },
  });

  useEffect(() => {
    if (editingTask) {
      form.setValues({
        title: editingTask.title,
        description: editingTask.description || "",
        is_completed: editingTask.is_completed,
      });
    } else {
      form.reset();
    }
  }, [editingTask]);

  const { mutate: createTask } = useCreateTask();
  const { mutate: updateTask } = useUpdateTask();

  const handleCreate = (values: TaskFormValues) => {
    createTask(values);
    form.reset();
    setIsCreateModalOpen(false);
  };

  const handleEdit = (values: TaskFormValues) => {
    if (editingTask) {
      updateTask({ id: editingTask.id, data: values });
    } else {
      throw new Error("Error updating task");
    }
    form.reset();
    setIsEditModalOpen(false);
  };

  return (
    <>
      <Modal
        opened={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          form.reset();
        }}
        title="Create New Task"
      >
        <form onSubmit={form.onSubmit(handleCreate)}>
          <TextInput
            label="Title"
            placeholder="Task title"
            {...form.getInputProps("title")}
            required
          />
          <Textarea
            label="Description"
            placeholder="Task description"
            {...form.getInputProps("description")}
            mt="md"
          />
          <Group justify="flex-end" mt="md">
            <Button type="submit">Create Task</Button>
          </Group>
        </form>
      </Modal>

      <Modal
        opened={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          form.reset();
        }}
        title="Edit Task"
      >
        <form
          onSubmit={form.onSubmit(handleEdit)}
          onReset={() => {
            setIsEditModalOpen(false);
            form.reset();
          }}
        >
          <TextInput
            label="Title"
            placeholder="Task title"
            {...form.getInputProps("title")}
            required
          />
          <Textarea
            label="Description"
            placeholder="Task description"
            {...form.getInputProps("description")}
            mt="md"
          />
          <Checkbox
            label="Completed"
            {...form.getInputProps("is_completed", { type: "checkbox" })}
            mt="md"
          />
          <Group justify="flex-end" mt="md">
            <Button type="reset" variant="default">
              Cancel
            </Button>
            <Button type="submit">Update Task</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
