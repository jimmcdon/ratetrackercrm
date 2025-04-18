"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CollapsibleContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
  disabled?: boolean
}

const CollapsibleContext = React.createContext<CollapsibleContextValue>({
  open: false,
  onOpenChange: () => {},
  disabled: false,
})

interface CollapsibleProps {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  children: React.ReactNode
}

const Collapsible: React.FC<CollapsibleProps> = ({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  disabled = false,
  children,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      setUncontrolledOpen(newOpen)
      onOpenChange?.(newOpen)
    },
    [onOpenChange]
  )

  return (
    <CollapsibleContext.Provider value={{ open, onOpenChange: handleOpenChange, disabled }}>
      {children}
    </CollapsibleContext.Provider>
  )
}

interface CollapsibleTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({ className, asChild, ...props }, ref) => {
    const { open, onOpenChange, disabled } = React.useContext(CollapsibleContext)
    const Comp = asChild ? "div" : "button"

    return (
      <Comp
        ref={ref}
        aria-expanded={open}
        disabled={disabled}
        onClick={() => onOpenChange(!open)}
        className={cn(className)}
        {...props}
      />
    )
  }
)

interface CollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {
  forceMount?: boolean
}

const CollapsibleContent = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ className, forceMount, ...props }, ref) => {
    const { open } = React.useContext(CollapsibleContext)

    if (!forceMount && !open) {
      return null
    }

    return (
      <div
        ref={ref}
        data-state={open ? "open" : "closed"}
        className={cn(
          "overflow-hidden",
          open ? "animate-collapsible-down" : "animate-collapsible-up",
          className
        )}
        {...props}
      />
    )
  }
)

CollapsibleTrigger.displayName = "CollapsibleTrigger"
CollapsibleContent.displayName = "CollapsibleContent"

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
