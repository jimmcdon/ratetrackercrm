import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardContent } from "@/components/ui/card"
import type { Task } from "./types"

interface KanbanItemProps extends Task {
  column: string
}

export function KanbanItem({ id, title, column }: KanbanItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id, data: { column } })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-2 cursor-grab active:cursor-grabbing"
    >
      <CardContent className="p-2">
        <p className="text-sm">{title}</p>
      </CardContent>
    </Card>
  )
}

