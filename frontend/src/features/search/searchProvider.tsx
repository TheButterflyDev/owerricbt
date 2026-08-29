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

interface SearchApiResponse {
    events: Array<{ id: number; title: string; description: string; event_date: string; event_type: string; href?: string }>
    news: Array<{ id: number; title: string; slug: string; summary: string; category: string; href?: string }>
    resources: Array<{ id: number; title: string; description: string; resource_type: string; href?: string }>
}

interface SearchContextValue {
    open: () => void
}

const staticSearchItems: SearchItem[] = [
    { href: "/about", label: "About Us", group: "Pages" },
    { href: "/events", label: "Events", group: "Pages" },
    { href: "/jamb-news", label: "JAMB News", group: "Pages" },
    { href: "/resources", label: "E-Resources", group: "Pages" },
    { href: "/contact", label: "Contact Us", group: "Pages" },
]

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
    const [query, setQuery] = React.useState("")
    const [liveItems, setLiveItems] = React.useState<SearchItem[]>([])
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()

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

    React.useEffect(() => {
        if (!open) {
            setQuery("")
            setLiveItems([])
            return
        }

        const trimmed = query.trim()
        if (!trimmed) {
            setLiveItems([])
            return
        }

        const controller = new AbortController()
        const timeout = window.setTimeout(async () => {
            try {
                setLoading(true)
                const response = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`, {
                    signal: controller.signal,
                })

                if (!response.ok) {
                    throw new Error("Search request failed")
                }

                const data = (await response.json()) as SearchApiResponse
                const mapped: SearchItem[] = [
                    ...data.events.map((item) => ({ href: item.href ?? "/events", label: item.title, group: "Events" })),
                    ...data.news.map((item) => ({ href: item.href ?? "/jamb-news", label: item.title, group: "JAMB News" })),
                    ...data.resources.map((item) => ({ href: item.href ?? "/resources", label: item.title, group: "Resources" })),
                ]

                setLiveItems(mapped)
            } catch {
                setLiveItems([])
            } finally {
                setLoading(false)
            }
        }, 180)

        return () => {
            controller.abort()
            window.clearTimeout(timeout)
        }
    }, [open, query])

    const allItems = React.useMemo(() => {
        const baseItems = [...staticSearchItems, ...searchItems]
        return query.trim() ? liveItems.length > 0 ? liveItems : [] : baseItems
    }, [liveItems, query, searchItems])

    const groupedItems = React.useMemo(() => {
        const groups: Record<string, SearchItem[]> = {}
        for (const item of allItems) {
            const key = item.group ?? "Pages"
            groups[key] = groups[key] ? [...groups[key], item] : [item]
        }
        return groups
    }, [allItems])

    const runCommand = (fn: () => void) => {
        setOpen(false)
        setQuery("")
        setLiveItems([])
        fn()
    }

    return (
        <SearchContext.Provider value={{ open: () => setOpen(true) }}>
            {children}
            <CommandDialog open={open} onOpenChange={(nextOpen) => {
                setOpen(nextOpen)
                if (!nextOpen) {
                    setQuery("")
                    setLiveItems([])
                }
            }}>
                <CommandInput
                    placeholder="Search events, news, and resources..."
                    value={query}
                    onValueChange={setQuery}
                />
                <CommandList>
                    {loading ? (
                        <CommandEmpty>Searching...</CommandEmpty>
                    ) : Object.keys(groupedItems).length === 0 ? (
                        <CommandEmpty>No results found.</CommandEmpty>
                    ) : null}
                    {Object.entries(groupedItems).map(([group, items]) => (
                        <CommandGroup key={group} heading={group}>
                            {items.map((item) => (
                                <CommandItem
                                    key={`${item.href}-${item.label}`}
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