import api from "@/lib/api";
import { Task, TaskFormValues, PaginatedTasks } from "@/types/task";

export const fetchTasks = async (
  page: number = 1,
  completed?: boolean
): Promise<PaginatedTasks> => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("per_page", "4");
  if (completed !== undefined) params.append("completed", completed.toString());

  const response = await api.get("/tasks", { params });
  return response.data;
};

export const createTask = async (taskData: TaskFormValues): Promise<Task> => {
  const response = await api.post("/tasks", taskData);
  return response.data;
};

export const updateTask = async (
  taskId: number,
  taskData: Partial<TaskFormValues>
): Promise<Task> => {
  const response = await api.put(`/tasks/${taskId}`, taskData);
  return response.data;
};

export const deleteTask = async (taskId: number): Promise<void> => {
  await api.delete(`/tasks/${taskId}`);
};

export const toggleTaskCompletion = async (task: Task): Promise<Task> => {
  return await api.put(`/tasks/${task.id}`, {
    is_completed: !task.is_completed,
  });
};
