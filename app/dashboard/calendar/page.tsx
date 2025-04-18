"use client"

import { useState } from "react"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import enUS from "date-fns/locale/en-US"
import "react-big-calendar/lib/css/react-big-calendar.css"

import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const locales = {
  "en-US": enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface Event {
  id: number
  title: string
  start: Date
  end: Date
}

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Client Meeting - John Doe",
      start: new Date(2023, 5, 15, 10, 0),
      end: new Date(2023, 5, 15, 11, 0),
    },
    {
      id: 2,
      title: "Loan Review - Smith Family",
      start: new Date(2023, 5, 16, 14, 0),
      end: new Date(2023, 5, 16, 15, 30),
    },
    {
      id: 3,
      title: "Team Sync",
      start: new Date(2023, 5, 17, 9, 0),
      end: new Date(2023, 5, 17, 10, 0),
    },
  ])

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt("New Event name")
    if (title) {
      setEvents([
        ...events,
        {
          id: events.length + 1,
          title,
          start,
          end,
        },
      ])
    }
  }

  const handleSelectEvent = (event: Event) => {
    window.alert(event.title)
  }

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Event
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <div className="h-4 w-4 rounded-full bg-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{events.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <div className="h-4 w-4 rounded-full bg-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{events.filter((event) => event.start > new Date()).length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <div className="h-4 w-4 rounded-full bg-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  events.filter((event) => {
                    const now = new Date()
                    const weekStart = startOfWeek(now)
                    const weekEnd = new Date(weekStart)
                    weekEnd.setDate(weekEnd.getDate() + 7)
                    return event.start >= weekStart && event.start < weekEnd
                  }).length
                }
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <div className="h-4 w-4 rounded-full bg-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  events.filter((event) => {
                    const now = new Date()
                    return event.start.getMonth() === now.getMonth() && event.start.getFullYear() === now.getFullYear()
                  }).length
                }
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Event Calendar</CardTitle>
            <CardDescription>Manage your schedule and appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[600px]">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                selectable
                style={{ height: "100%" }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

