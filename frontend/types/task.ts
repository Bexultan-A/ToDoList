export interface Task {
  id: number;
  title: string;
  description?: string;
  is_completed: boolean;
  created_at: string;
  updated_at?: string;
  user_id: number;
}

export interface TaskFormValues {
  title: string;
  description?: string;
  is_completed?: boolean;
}

export interface PaginatedTasks {
  items: Task[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export type TaskFilter = "all" | "completed" | "pending";
