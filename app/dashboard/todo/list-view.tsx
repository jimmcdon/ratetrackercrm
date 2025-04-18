import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import type { Task } from "./types"

interface ListViewProps {
  tasks: Task[]
  onTaskStatusChange: (taskId: string, completed: boolean) => void
}

export function ListView({ tasks, onTaskStatusChange }: ListViewProps) {
  const columns = [
    { id: "todo", title: "To Do" },
    { id: "inProgress", title: "In Progress" },
    { id: "completed", title: "Completed" },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {columns.map((column) => (
        <Card key={column.id}>
          <CardHeader>
            <CardTitle>{column.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks
                .filter((task) => task.status === column.id)
                .map((task) => (
                  <div key={task.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.status === "completed"}
                      onCheckedChange={(checked) => onTaskStatusChange(task.id, checked as boolean)}
                    />
                    <label
                      htmlFor={`task-${task.id}`}
                      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                        task.status === "completed" ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {task.title}
                    </label>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

