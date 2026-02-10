import apiClient from "@/lib/api-client";
import type {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  TasksQueryParams,
  TaskStats,
  ApiSuccessResponse,
} from "@/types";

export const taskService = {
  // Get all tasks with optional filters
  getTasks: async (
    params?: TasksQueryParams
  ): Promise<{ count: number; tasks: Task[] }> => {
    const response = await apiClient.get<
      ApiSuccessResponse<{ count: number; tasks: Task[] }>
    >("/tasks", { params });
    return response.data.data!;
  },

  // Get single task by ID
  getTaskById: async (id: string): Promise<Task> => {
    const response = await apiClient.get<ApiSuccessResponse<{ task: Task }>>(
      `/tasks/${id}`
    );
    return response.data.data!.task;
  },

  // Create a new task
  createTask: async (data: CreateTaskRequest): Promise<Task> => {
    const response = await apiClient.post<ApiSuccessResponse<{ task: Task }>>(
      "/tasks",
      data
    );
    return response.data.data!.task;
  },

  // Update an existing task
  updateTask: async (id: string, data: UpdateTaskRequest): Promise<Task> => {
    const response = await apiClient.put<ApiSuccessResponse<{ task: Task }>>(
      `/tasks/${id}`,
      data
    );
    return response.data.data!.task;
  },

  // Delete a task
  deleteTask: async (id: string): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`);
  },

  // Get task statistics
  getTaskStats: async (): Promise<TaskStats> => {
    const response = await apiClient.get<
      ApiSuccessResponse<{ stats: TaskStats }>
    >("/tasks/stats");
    return response.data.data!.stats;
  },
};
