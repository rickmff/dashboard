"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const HoverCard = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative">{children}</div>
}

const HoverCardTrigger = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("inline-block", className)} {...props} />,
)
HoverCardTrigger.displayName = "HoverCardTrigger"

const HoverCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false)
    const triggerRef = React.useRef<HTMLDivElement>(null)
    const contentRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      const trigger = triggerRef.current?.parentElement?.querySelector('[data-hover-card-trigger="true"]')

      if (!trigger) return

      const handleMouseEnter = () => setIsVisible(true)
      const handleMouseLeave = () => setIsVisible(false)

      trigger.addEventListener("mouseenter", handleMouseEnter)
      trigger.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        trigger.removeEventListener("mouseenter", handleMouseEnter)
        trigger.removeEventListener("mouseleave", handleMouseLeave)
      }
    }, [])

    if (!isVisible) return null

    return (
      <div
        ref={ref}
        className={cn(
          "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in zoom-in-90",
          className,
        )}
        {...props}
      />
    )
  },
)
HoverCardContent.displayName = "HoverCardContent"

export { HoverCard, HoverCardTrigger, HoverCardContent }

