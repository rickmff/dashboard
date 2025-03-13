"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const Toolbar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center space-x-1 rounded-md border bg-background p-1", className)}
      {...props}
    />
  ),
)
Toolbar.displayName = "Toolbar"

const ToolbarButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "rounded-md border border-transparent bg-transparent p-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
)
ToolbarButton.displayName = "ToolbarButton"

const ToolbarSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("h-full w-px bg-border", className)} {...props} />,
)
ToolbarSeparator.displayName = "ToolbarSeparator"

const ToolbarToggleGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center", className)} role="group" {...props} />
  ),
)
ToolbarToggleGroup.displayName = "ToolbarToggleGroup"

const ToolbarToggleItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string
    active?: boolean
  }
>(({ className, value, active, ...props }, ref) => (
  <button
    ref={ref}
    data-state={active ? "on" : "off"}
    className={cn(
      "rounded-md border border-transparent bg-transparent p-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
      className,
    )}
    value={value}
    {...props}
  />
))
ToolbarToggleItem.displayName = "ToolbarToggleItem"

export { Toolbar, ToolbarButton, ToolbarSeparator, ToolbarToggleGroup, ToolbarToggleItem }

