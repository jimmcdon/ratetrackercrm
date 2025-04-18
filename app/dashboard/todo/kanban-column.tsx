import type React from "react"
import { useDroppable } from "@dnd-kit/core"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface KanbanColumnProps {
  id: string
  title: string
  children: React.ReactNode
}

export function KanbanColumn({ id, title, children }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent ref={setNodeRef} className="min-h-[300px]">
        {children}
      </CardContent>
    </Card>
  )
}

