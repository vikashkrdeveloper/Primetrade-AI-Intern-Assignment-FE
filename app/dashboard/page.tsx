"use client";

import { useEffect, useState } from "react";
import { useTasks } from "@/hooks/use-tasks";
import { Task } from "@/types";
import { CreateTaskInput, UpdateTaskInput } from "@/lib/validations";
import { ProtectedRoute } from "@/components/protected-route";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {  FilterProvider, useFilters } from "@/contexts/filter-context";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { TaskStats } from "@/components/dashboard/task-stats";
import { TaskList } from "@/components/dashboard/task-list";
import { CreateTaskDialog } from "@/components/dashboard/create-task-dialog";
import { EditTaskDialog } from "@/components/dashboard/edit-task-dialog";
import { DeleteTaskDialog } from "@/components/dashboard/delete-task-dialog";

function DashboardContent() {
  const { tasks, isLoading, createTask, updateTask, deleteTask, updateFilters, fetchTasks } = useTasks();
  const { searchQuery, statusFilter, priorityFilter, createDialogOpen, setCreateDialogOpen } = useFilters();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    updateFilters({
      search: searchQuery || undefined,
      status: statusFilter !== "all" ? (statusFilter as "pending" | "in-progress" | "completed") : undefined,
      priority: priorityFilter !== "all" ? (priorityFilter as "low" | "medium" | "high") : undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, statusFilter, priorityFilter]);

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setEditDialogOpen(true);
  };

  const handleDelete = (task: Task) => {
    setSelectedTask(task);
    setDeleteDialogOpen(true);
  };

  // Wrapper functions to match dialog prop types
  const handleTaskCreated = async (data: CreateTaskInput): Promise<void> => {
    await createTask(data);
  };

  const handleTaskUpdated = async (id: string, data: UpdateTaskInput): Promise<void> => {
    // Convert nullable dueDate to undefined for the API
    const apiData = {
      ...data,
      dueDate: data.dueDate === null ? undefined : data.dueDate,
    };
    await updateTask(id, apiData);
  };

  const handleTaskDeleted = async (id: string): Promise<void> => {
    await deleteTask(id);
  };

  return (
    <ProtectedRoute>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
                <TaskStats />

                <TaskList
                  tasks={tasks}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onRefresh={() => fetchTasks()}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>

      <CreateTaskDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onTaskCreated={handleTaskCreated}
      />

      <EditTaskDialog
        task={selectedTask}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onTaskUpdated={handleTaskUpdated}
      />

      <DeleteTaskDialog
        task={selectedTask}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onTaskDeleted={handleTaskDeleted}
      />
    </ProtectedRoute>
  );
}

export default function Page() {
  return (
    <FilterProvider>
      <DashboardContent />
    </FilterProvider>
  );
}
