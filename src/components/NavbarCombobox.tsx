"use client"

import * as React from "react"
import { Dot, ChevronsUpDown, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Link, useLocation } from 'react-router-dom';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { navbarItems } from '@/components/Providers/navbar-provider';


export function NavbarCombobox() {
  const [open, setOpen] = React.useState(false)
  const location = useLocation();
  const currentPage = "/" + location.pathname.split('/')[1];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-[36px]"
          size="icon"
        >
          <Menu className="self-center" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {navbarItems.map((navbarItem) => (
                <a
                  href={navbarItem.value}
                  className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    setOpen(false)
                  }}
                >                  
                  <p className="w-full h-full">
                    {navbarItem.label !== "ProcessM.NET" ? navbarItem.label : "Home"} 
                  </p>
                  <Dot
                    className={cn(
                      "ml-auto size-8",
                      currentPage === navbarItem.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </a>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
