import React from "react"
import { Link } from "react-router-dom"
import { CalendarIcon, HomeIcon, MailIcon, InfoIcon, Newspaper, SearchIcon } from "lucide-react"
import TopNav from "./topNav"
import { SearchProvider, useSearch, type SearchItem } from "../../features/search/searchProvider"

import { cn } from "../../lib/utils"
import { buttonVariants } from "../ui/button"
import { Separator } from "../ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import { Dock, DockIcon } from "../ui/dock"

export type IconProps = React.HTMLAttributes<SVGElement>

const Icons = {
  calendar: (props: IconProps) => <CalendarIcon {...props} />,
  contact: (props: IconProps) => <MailIcon {...props} />,
  news: (props: IconProps) => <Newspaper {...props} />,
  search: (props: IconProps) => <SearchIcon {...props} />,
  whatsapp: (props: IconProps) => (
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
  ),
}

const DATA = {
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/about", icon: InfoIcon, label: "About Us" },
  ],
  contact: {
    social: {
      Whatsapp: {
        name: "Whatsapp",
        url: "https://wa.link/ijor10",
        icon: Icons.whatsapp,
      },
      News: {
        name: "Jamb News",
        url: "/jamb-news",
        icon: Icons.news,
      },
      contact: {
        name: "Contact Us",
        url: "/contact",
        icon: Icons.contact,
      },
    },
  },
}

function MobileDock() {
  const { open: openSearch } = useSearch()

  return (
    <div className="flex flex-col items-center justify-center">
      <TooltipProvider>
        <Dock direction="middle">
          {DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Link
                      to={item.href}
                      aria-label={item.label}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12 rounded-full"
                      )}
                    >
                      <item.icon className="size-4" />
                    </Link>
                  }
                />
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

          <DockIcon>
            <Tooltip>
              <TooltipTrigger
                render={
                  <button
                    type="button"
                    aria-label="Search"
                    onClick={openSearch}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full"
                    )}
                  >
                    <Icons.search className="size-4" />
                  </button>
                }
              />
              <TooltipContent>
                <p>Search</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          <Separator orientation="vertical" className="h-full" />
          {Object.entries(DATA.contact.social).map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Link
                      to={social.url}
                      aria-label={social.name}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12 rounded-full"
                      )}
                    >
                      <social.icon className="size-4" />
                    </Link>
                  }
                />
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        </Dock>
      </TooltipProvider>
    </div>
  )
}

export default function NavBar({ searchItems = [] as SearchItem[] }) {
  return (
    <SearchProvider searchItems={searchItems}>
      <div className="hidden md:block">
        <TopNav brand="Home" />
      </div>
      <div className="fixed z-50 top-2 left-0 right-0 md:hidden">
        <MobileDock />
      </div>
    </SearchProvider>
  )
}