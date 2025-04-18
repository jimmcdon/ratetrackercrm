"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"
import { Trash2, GripVertical, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import dynamic from "next/dynamic"

const QRCode = dynamic(() => import("qrcode.react"), { ssr: false })

type FormField = {
  id: string
  type: "text" | "email" | "number" | "select"
  label: string
  options?: string[]
}

export function LeadFormBuilder() {
  const [fields, setFields] = useState<FormField[]>([])
  const [isFormComplete, setIsFormComplete] = useState(false)
  const [formUrl, setFormUrl] = useState("")

  const addField = (type: FormField["type"]) => {
    const newField: FormField = {
      id: Date.now().toString(),
      type,
      label: `New ${type} field`,
    }
    if (type === "select") {
      newField.options = ["Option 1", "Option 2"]
    }
    setFields([...fields, newField])
  }

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, ...updates } : field)))
  }

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id))
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(fields)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setFields(items)
  }

  const generateFormUrl = () => {
    // In a real application, you would generate a unique URL for the form
    // For this example, we'll use a placeholder URL
    const url = `https://example.com/lead-form/${Date.now()}`
    setFormUrl(url)
    setIsFormComplete(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Button onClick={() => addField("text")}>Add Text Field</Button>
        <Button onClick={() => addField("email")}>Add Email Field</Button>
        <Button onClick={() => addField("number")}>Add Number Field</Button>
        <Button onClick={() => addField("select")}>Add Select Field</Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="fields">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {fields.map((field, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided) => (
                    <Card ref={provided.innerRef} {...provided.draggableProps}>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div {...provided.dragHandleProps}>
                          <GripVertical className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-lg">
                          {field.type.charAt(0).toUpperCase() + field.type.slice(1)} Field
                        </CardTitle>
                        <Button variant="ghost" size="icon" onClick={() => removeField(field.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div>
                          <Label htmlFor={`label-${field.id}`}>Label</Label>
                          <Input
                            id={`label-${field.id}`}
                            value={field.label}
                            onChange={(e) => updateField(field.id, { label: e.target.value })}
                          />
                        </div>
                        {field.type === "select" && (
                          <div>
                            <Label htmlFor={`options-${field.id}`}>Options (comma-separated)</Label>
                            <Input
                              id={`options-${field.id}`}
                              value={field.options?.join(", ")}
                              onChange={(e) =>
                                updateField(field.id, { options: e.target.value.split(",").map((s) => s.trim()) })
                              }
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {fields.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field) => (
              <div key={field.id}>
                <Label htmlFor={`preview-${field.id}`}>{field.label}</Label>
                {field.type === "select" ? (
                  <Select>
                    <SelectTrigger id={`preview-${field.id}`}>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={`preview-${field.id}`}
                    type={field.type}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {fields.length > 0 && !isFormComplete && (
        <Button onClick={generateFormUrl} className="mt-4">
          Finalize Form and Generate QR Code
        </Button>
      )}

      {isFormComplete && (
        <Card>
          <CardHeader>
            <CardTitle>Form QR Code</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <QRCode value={formUrl} size={256} />
            <p className="text-sm text-muted-foreground">Scan this QR code to access the lead form</p>
            <Input value={formUrl} readOnly />
            <Button onClick={() => navigator.clipboard.writeText(formUrl)}>
              <Copy className="mr-2 h-4 w-4" />
              Copy Form URL
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

