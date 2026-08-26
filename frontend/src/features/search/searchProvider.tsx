"use client"

import * as React from "react"
import { useNavigate } from "react-router-dom"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../../components/ui/command"

export interface SearchItem {
    href: string
    label: string
    group?: string
}

interface SearchContextValue {
    open: () => void
}

const SearchContext = React.createContext<SearchContextValue | null>(null)

export function useSearch() {
    const ctx = React.useContext(SearchContext)
    if (!ctx) {
        throw new Error("useSearch must be used within a SearchProvider")
    }
    return ctx
}

export function SearchProvider({
    searchItems = [],
    children,
}: {
    searchItems?: SearchItem[]
    children: React.ReactNode
}) {
    const [open, setOpen] = React.useState(false)
    const navigate = useNavigate()

    // ⌘K / Ctrl+K opens the palette from anywhere — registered once, globally
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((prev) => !prev)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const groupedItems = React.useMemo(() => {
        const groups: Record<string, SearchItem[]> = {}
        for (const item of searchItems) {
            const key = item.group ?? "Pages"
            groups[key] = groups[key] ? [...groups[key], item] : [item]
        }
        return groups
    }, [searchItems])

    const runCommand = (fn: () => void) => {
        setOpen(false)
        fn()
    }

    return (
        <SearchContext.Provider value={{ open: () => setOpen(true) }}>
            {children}
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search ..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {Object.entries(groupedItems).map(([group, items]) => (
                        <CommandGroup key={group} heading={group}>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.href}
                                    value={item.label}
                                    onSelect={() => runCommand(() => navigate(item.href))}
                                >
                                    {item.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    ))}
                </CommandList>
            </CommandDialog>
        </SearchContext.Provider>
    )
}