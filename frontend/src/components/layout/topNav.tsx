"use client"

import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { SearchIcon, MoonIcon, SunIcon } from "lucide-react"
import { Kbd, KbdGroup } from '../ui/kbd'

import { cn } from "../../lib/utils"
import { buttonVariants } from "../ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"

interface TopNavProps {
  brand?: string
  links?: { href: string; label: string }[]
  searchItems?: { href: string; label: string; group?: string }[]
}

const DEFAULT_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/jamb-news", label: "Jamb News" },
  { href: "/events", label: "Events" },
  { href: "/resources", label: "E-Resources" },
  { href: "/contact", label: "Contact Us" },
]

type IconProps = React.HTMLAttributes<SVGElement>
type Platform = 'mac' | 'win'

const WhatsappIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
    />
    <path
      fill="currentColor"
      d="M12.031 0h-.062C5.393 0 0 5.394 0 12.031c0 2.72.877 5.243 2.365 7.291L.789 24l4.828-1.545a11.94 11.94 0 005.414 1.294h.062C18.607 23.749 24 18.353 24 11.719 24 5.393 18.607.019 12.031 0zm7.166 18.812a9.855 9.855 0 01-7.166 3.006 9.885 9.885 0 01-5.032-1.375l-.362-.215-3.756 1.203 1.219-3.66-.235-.375A9.833 9.833 0 012.163 12.03c0-5.442 4.428-9.87 9.876-9.87 2.637 0 5.113 1.028 6.976 2.895a9.788 9.788 0 012.891 6.977c0 5.442-4.428 9.87-9.869 9.78z"
    />
  </svg>
)

function detectPlatform(): Platform {
  // Modern approach (Chromium browsers)
  const uaData = (navigator as any).userAgentData
  if (uaData?.platform) {
    return uaData.platform.toLowerCase().includes('mac') ? 'mac' : 'win'
  }

  // Fallback: userAgent string (works everywhere, including Safari/Firefox)
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('mac')) return 'mac'
  if (ua.includes('win')) return 'win'

  // Fallback: deprecated but still functional
  const platform = navigator.platform?.toLowerCase() ?? ''
  return platform.includes('mac') ? 'mac' : 'win'
}

export default function TopNav({
  brand = "Your Brand",
  links = DEFAULT_LINKS,
  searchItems = [],
}: TopNavProps) {
  const [theme, setTheme] = React.useState<"light" | "dark">("light") // wire to your theme provider
  const [open, setOpen] = React.useState(false)
  const [platform, setPlatform] = React.useState<Platform>('mac')
  const isMac = platform === 'mac'
  const navigate = useNavigate()

  // ⌘K / Ctrl+K opens the palette from anywhere on the page
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
  setPlatform(detectPlatform())
}, [])

  const groupedItems = React.useMemo(() => {
    const groups: Record<string, typeof searchItems> = {}
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
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="flex size-7 items-center justify-center rounded-full bg-linear-to-br from-beige to-orange-400 text-sm text-white">
              /
            </span>
            {brand}
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            {links.map((link) => (
              <Link key={link.href} to={link.href} className="transition-colors hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="relative hidden cursor-text w-56 items-center rounded-md border bg-muted/40 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted md:flex"
            >
              <SearchIcon className="mr-2 size-4" />
              <span className="flex-1 text-left">Search ...</span>
              <KbdGroup className="pointer-events-none select-none rounded border bg-background px-1.5 text-[10px] font-medium">
                <Kbd>{isMac ? '⌘' : 'Ctrl'} K</Kbd>
                {/* <Kbd>K</Kbd> */}
              </KbdGroup>
              
            </button>

            <button
              aria-label="Search"
              onClick={() => setOpen(true)}
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "md:hidden")}
            >
              <SearchIcon className="size-4" />
            </button>

            <button
              aria-label="Toggle theme"
              onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
            >
              {theme === "light" ? <MoonIcon className="size-4" /> : <SunIcon className="size-4" />}
            </button>

            <a
              href="https://wa.link/ijor10"
              target="_blank"
              rel="noreferrer"
              className="gap-1.5"
            >
              <WhatsappIcon className="size-4" />
            </a>
          </div>
        </div>
      </header>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search ..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {Object.entries(groupedItems).map(([group, items]) => (
            <CommandGroup key={group} heading={group}>
              {items.map((item) => (
                <CommandItem key={item.href} value={item.label} onSelect={() => runCommand(() => navigate(item.href))}>
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}