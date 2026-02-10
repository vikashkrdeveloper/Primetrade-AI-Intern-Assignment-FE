"use client";

import { useState } from "react";
import { Task } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, CheckCircle2, Circle, Clock, RefreshCw, ListTodo } from "lucide-react";
import { format } from "date-fns";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onRefresh: () => void;
  isLoading?: boolean;
}

const statusConfig = {
  pending: { label: "Pending", icon: Circle, color: "bg-gray-500" },
  "in-progress": { label: "In Progress", icon: Clock, color: "bg-yellow-500" },
  completed: { label: "Completed", icon: CheckCircle2, color: "bg-green-500" },
};

const priorityConfig = {
  low: { label: "Low", color: "bg-blue-500" },
  medium: { label: "Medium", color: "bg-orange-500" },
  high: { label: "High", color: "bg-red-500" },
};

export function TaskList({ tasks, onEdit, onDelete, onRefresh, isLoading }: TaskListProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
                <div className="h-4 w-full bg-muted animate-pulse rounded" />
                <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Circle className="size-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
          <p className="text-sm text-muted-foreground">
            Create your first task to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary">
            <ListTodo className="size-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              All Tasks
            </h2>
            <p className="text-sm text-muted-foreground">
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} found
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="gap-2"
        >
          <RefreshCw className={`size-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Refresh</span>
        </Button>
      </div>

      {/* Task Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => {
        const status = statusConfig[task.status];
        const priority = priorityConfig[task.priority];
        const StatusIcon = status.icon;

        return (
          <Card 
            key={task._id} 
            className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header with actions */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                      {task.title}
                    </h3>
                  </div>
                  <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 hover:bg-primary/10 hover:text-primary"
                      onClick={() => onEdit(task)}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 hover:bg-destructive/10 text-destructive hover:text-destructive"
                      onClick={() => onDelete(task)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>

                {task.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {task.description}
                  </p>
                )}

                {/* Status and Priority Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge 
                    variant="secondary" 
                    className="text-xs font-medium px-2.5 py-1 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20"
                  >
                    <StatusIcon className="size-3 mr-1.5" />
                    {status.label}
                  </Badge>
                  <Badge 
                    variant="secondary" 
                    className="text-xs font-medium px-2.5 py-1"
                  >
                    <div className={`size-2 rounded-full mr-1.5 ${priority.color} shadow-md`} />
                    {priority.label}
                  </Badge>
                </div>

                {task.dueDate && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-2 border-t">
                    <Clock className="size-3" />
                    <span>Due: {format(new Date(task.dueDate), "MMM dd, yyyy")}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
      </div>
    </div>
  );
}
