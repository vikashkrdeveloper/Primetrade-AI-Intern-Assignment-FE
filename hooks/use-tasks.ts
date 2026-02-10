import { useState, useEffect, useCallback } from "react";
import { taskService } from "@/services/task.service";
import type {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  TasksQueryParams,
  TaskStats,
} from "@/types";

export const useTasks = (initialParams?: TasksQueryParams) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState<TasksQueryParams | undefined>(initialParams);

  const fetchTasks = useCallback(async (queryParams?: TasksQueryParams) => {
    setIsLoading(true);
    try {
      const result = await taskService.getTasks(queryParams);
      setTasks(result.tasks);
      setCount(result.count);
      return result;
    } catch (error) {
      setTasks([]);
      setCount(0);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTask = async (data: CreateTaskRequest): Promise<Task | null> => {
    setIsLoading(true);
    try {
      const newTask = await taskService.createTask(data);
      await fetchTasks(params);
      return newTask;
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (id: string, data: UpdateTaskRequest): Promise<Task | null> => {
    setIsLoading(true);
    try {
      const updatedTask = await taskService.updateTask(id, data);
      await fetchTasks(params);
      return updatedTask;
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await taskService.deleteTask(id);
      await fetchTasks(params);
      return true;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateFilters = useCallback((newParams: TasksQueryParams) => {
    setParams(newParams);
  }, []);

  useEffect(() => {
    fetchTasks(params);
  }, [params, fetchTasks]);

  return {
    tasks,
    count,
    isLoading,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    updateFilters,
    params,
  };
};

export const useTaskStats = () => {
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const result = await taskService.getTaskStats();
      setStats(result);
      return result;
    } catch (error) {
      setStats(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    isLoading,
    fetchStats,
  };
};
