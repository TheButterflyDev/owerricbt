"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { SearchIcon } from "lucide-react"

import { cn } from "../../lib/utils"
import { Dialog, DialogContent } from "./dialog"

function Command({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof CommandPrimitive> & {
  ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive>>
}) {
  return (
    <CommandPrimitive
      ref={ref}
      className={cn("flex h-full w-full flex-col bg-paper text-navy", className)}
      {...props}
    />
  )
}

function CommandDialog({
  children,
  ...props
}: React.ComponentProps<typeof Dialog> & { children: React.ReactNode }) {
  return (
    <Dialog {...props}>
      <DialogContent
        showCloseButton={true}
        className="max-w-[calc(100%-2rem)] rounded-large border-2 border-navy bg-paper p-0 shadow-elevated sm:max-w-lg"
      >
        <Command>{children}</Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input> & {
  ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.Input>>
}) {
  return (
    <div>
      <div className="flex items-center justify-between pt-3">
        {/* <p className="font-mono text-caption uppercase tracking-caption text-navy/60">
          Search
        </p> */}
        <div className="flex items-center gap-2 px-5 " cmdk-input-wrapper="">
          <SearchIcon className="h-4 w-4 shrink-0 text-navy/50" />
          <CommandPrimitive.Input
            ref={ref}
            className={cn(
              "flex h-11 w-full bg-transparent font-mono text-body text-navy outline-none placeholder:text-navy/40 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            {...props}
          />
        </div>
        {/* <span className="rounded-tag bg-lemon px-2 py-1 font-mono text-caption font-semibold text-navy">
          ⌘K
        </span> */}
      </div>

      <div className="relative mx-5 my-2 h-0 border-t-2 border-dashed border-navy/25">
        {/* <span className="ticket-punch -left-8 -top-2" />
        <span className="ticket-punch -right-8 -top-2" /> */}
      </div>

      
    </div>
  )
}

function CommandList({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List> & {
  ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.List>>
}) {
  return (
    <CommandPrimitive.List
      ref={ref}
      className={cn("max-h-100 overflow-y-auto overflow-x-hidden px-5 pb-5", className)}
      {...props}
    />
  )
}

function CommandEmpty({
  ref,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty> & {
  ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.Empty>>
}) {
  return (
    <CommandPrimitive.Empty
      ref={ref}
      className="py-8 text-center font-mono text-caption uppercase tracking-caption text-navy/50"
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group> & {
  ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.Group>>
}) {
  return (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        "overflow-hidden p-1 text-navy **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:font-mono **:[[cmdk-group-heading]]:text-caption **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:tracking-caption **:[[cmdk-group-heading]]:text-navy/50",
        className
      )}
      {...props}
    />
  )
}

function CommandItem({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item> & {
  ref?: React.Ref<React.ComponentRef<typeof CommandPrimitive.Item>>
}) {
  return (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-tag px-3 py-2 font-mono text-body text-navy/80 outline-none data-[selected=true]:bg-lemon data-[selected=true]:text-navy data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem }