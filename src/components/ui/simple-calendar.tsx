"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns"
import { cn } from "@/lib/utils"

export interface SimpleCalendarProps {
  mode?: "single"
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  className?: string
  modifiers?: {
    hasBill?: Date[]
  }
  modifiersClassNames?: {
    hasBill?: string
  }
}

export function SimpleCalendar({
  mode = "single",
  selected,
  onSelect,
  className,
  modifiers,
  modifiersClassNames,
}: SimpleCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())

  // Get days in current month
  const firstDayOfMonth = startOfMonth(currentMonth)
  const lastDayOfMonth = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth })

  // Get day names
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  // Handle month navigation
  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  // Check if a date has a bill
  const dateHasBill = (date: Date) => {
    if (!modifiers?.hasBill) return false
    return modifiers.hasBill.some((billDate) => isSameDay(billDate, date))
  }

  return (
    <div className={cn("p-3", className)}>
      <div className="flex justify-center pt-1 relative items-center mb-4">
        <button
          onClick={handlePreviousMonth}
          className="absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 rounded-md border border-input"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="text-sm font-medium">{format(currentMonth, "MMMM yyyy")}</div>
        <button
          onClick={handleNextMonth}
          className="absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 rounded-md border border-input"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] h-9 flex items-center justify-center"
          >
            {day}
          </div>
        ))}

        {/* Empty cells for days before the first day of month */}
        {Array.from({ length: firstDayOfMonth.getDay() }).map((_, index) => (
          <div key={`empty-start-${index}`} className="h-9 w-9" />
        ))}

        {/* Days of the month */}
        {daysInMonth.map((day) => {
          const hasBill = dateHasBill(day)

          return (
            <button
              key={day.toString()}
              onClick={() => onSelect?.(day)}
              className={cn(
                "h-9 w-9 p-0 font-normal rounded-md flex items-center justify-center text-sm",
                isSameDay(day, selected || new Date(0)) &&
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                isToday(day) && !isSameDay(day, selected || new Date(0)) && "bg-accent text-accent-foreground",
                hasBill && modifiersClassNames?.hasBill,
                "hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {format(day, "d")}
            </button>
          )
        })}
      </div>
    </div>
  )
}

