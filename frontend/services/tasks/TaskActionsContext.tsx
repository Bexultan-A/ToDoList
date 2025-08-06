"use client";

import React, { createContext, useContext, useState } from "react";
import { Task } from "@/types/task";

interface TaskActionsContextProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
}

const TaskActionsContext = createContext<TaskActionsContextProps | undefined>(
  undefined
);

export const TaskActionsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  return (
    <TaskActionsContext.Provider
      value={{
        isCreateModalOpen,
        setIsCreateModalOpen,
        isEditModalOpen,
        setIsEditModalOpen,
        editingTask,
        setEditingTask,
      }}
    >
      {children}
    </TaskActionsContext.Provider>
  );
};

export const useTaskActions = () => {
  const context = useContext(TaskActionsContext);
  if (!context) {
    throw new Error("useTaskActions must be used within a TaskActionsProvider");
  }
  return context;
};
