"use client";

import { useTasks } from "@/hooks/use-tasks";
import { useTaskStats } from "@/hooks/use-tasks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, Clock, AlertCircle } from "lucide-react";

export function TaskStats() {
  const { stats, isLoading } = useTaskStats();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-20 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Tasks",
      value: stats?.total || 0,
      icon: Circle,
      color: "text-blue-500",
    },
    {
      title: "In Progress",
      value: stats?.inProgress || 0,
      icon: Clock,
      color: "text-yellow-500",
    },
    {
      title: "Completed",
      value: stats?.completed || 0,
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      title: "High Priority",
      value: stats?.highPriority || 0,
      icon: AlertCircle,
      color: "text-red-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map(({ title, value, icon: Icon, color }) => (
        <Card key={title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className={`size-4 ${color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
