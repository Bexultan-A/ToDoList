"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
} from "./api";
import { notifications } from "@mantine/notifications";
import { Task, TaskFormValues, TaskFilter } from "@/types/task";

export const useTasks = (page: number, filter: TaskFilter) => {
  return useQuery({
    queryKey: ["tasks", page, filter],
    queryFn: () =>
      fetchTasks(
        page,
        filter === "completed" ? true : filter === "pending" ? false : undefined
      ),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Task created successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to create task",
        color: "red",
      });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<TaskFormValues> }) =>
      updateTask(id, data),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Task updated successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to update task",
        color: "red",
      });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Task deleted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete task",
        color: "red",
      });
    },
  });
};

export const useToggleTaskCompletion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleTaskCompletion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
