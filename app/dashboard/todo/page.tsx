"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { DndContext, type DragEndEvent, closestCorners } from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

import { KanbanColumn } from "./kanban-column"
import { KanbanItem } from "./kanban-item"
import { ListView } from "./list-view"
import type { Task } from "./types"

export default function DailyChecklistPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Review new loan applications", status: "todo" },
    { id: "2", title: "Update client profiles", status: "inProgress" },
    { id: "3", title: "Schedule follow-up calls", status: "completed" },
    { id: "4", title: "Prepare weekly report", status: "todo" },
    { id: "5", title: "Check and respond to emails", status: "inProgress" },
  ])
  const [isKanbanView, setIsKanbanView] = useState(true)

  const columns = [
    { id: "todo", title: "To Do" },
    { id: "inProgress", title: "In Progress" },
    { id: "completed", title: "Completed" },
  ]

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex((task) => task.id === active.id)
        const newIndex = tasks.findIndex((task) => task.id === over?.id)

        const newTasks = arrayMove(tasks, oldIndex, newIndex)
        newTasks[newIndex].status = over?.data.current?.column as "todo" | "inProgress" | "completed"

        return newTasks
      })
    }
  }

  const onTaskStatusChange = (taskId: string, completed: boolean) => {
    setTasks((tasks) =>
      tasks.map((task) => (task.id === taskId ? { ...task, status: completed ? "completed" : "todo" } : task)),
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Daily Checklist</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Task
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <div className="h-4 w-4 rounded-full bg-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasks.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <div className="h-4 w-4 rounded-full bg-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasks.filter((task) => task.status === "completed").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <div className="h-4 w-4 rounded-full bg-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasks.filter((task) => task.status === "inProgress").length}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Task Board</CardTitle>
              <CardDescription>Manage your tasks using this board</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="view-toggle" className="text-sm">
                List
              </Label>
              <Switch id="view-toggle" checked={isKanbanView} onCheckedChange={setIsKanbanView} />
              <Label htmlFor="view-toggle" className="text-sm">
                Kanban
              </Label>
            </div>
          </CardHeader>
          <CardContent>
            {isKanbanView ? (
              <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd}>
                <div className="grid gap-4 md:grid-cols-3">
                  {columns.map((column) => (
                    <KanbanColumn key={column.id} id={column.id} title={column.title}>
                      <SortableContext items={tasks.filter((task) => task.status === column.id)}>
                        {tasks
                          .filter((task) => task.status === column.id)
                          .map((task) => (
                            <KanbanItem key={task.id} id={task.id} title={task.title} column={column.id} />
                          ))}
                      </SortableContext>
                    </KanbanColumn>
                  ))}
                </div>
              </DndContext>
            ) : (
              <ListView tasks={tasks} onTaskStatusChange={onTaskStatusChange} />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

