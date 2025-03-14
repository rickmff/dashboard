"use client"

import * as Icons from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"

// Add type for navigation item
type NavigationItem = {
  name: string
  icon: keyof typeof Icons
  href: string
  bgColor: string
  hoverColor: string
}

// Add type for navigation section
type NavigationSection = {
  title?: string
  items: NavigationItem[]
}

// Navigation configuration
const navigationConfig: Record<string, NavigationSection> = {
  overview: {
    title: "Overview",
    items: [
      {
        name: "Dashboard",
        icon: "Home",
        href: "/dashboard",
        bgColor: "bg-nav-dashboard-light",
        hoverColor: "hover:bg-nav-dashboard-hover"
      },
      {
        name: "Analytics",
        icon: "BarChart2",
        href: "#",
        bgColor: "bg-nav-analytics-light",
        hoverColor: "hover:bg-nav-analytics-hover"
      },
      {
        name: "Organization",
        icon: "Building2",
        href: "#",
        bgColor: "bg-nav-organization-light",
        hoverColor: "hover:bg-nav-organization-hover"
      },
      {
        name: "Projects",
        icon: "Folder",
        href: "#",
        bgColor: "bg-nav-projects-light",
        hoverColor: "hover:bg-nav-projects-hover"
      },
    ],
  },
  finance: {
    title: "Finance",
    items: [
      {
        name: "Transactions",
        icon: "Wallet",
        href: "#",
        bgColor: "bg-nav-transactions-light",
        hoverColor: "hover:bg-nav-transactions-hover"
      },
      {
        name: "Invoices",
        icon: "Receipt",
        href: "#",
        bgColor: "bg-nav-invoices-light",
        hoverColor: "hover:bg-nav-invoices-hover"
      },
      {
        name: "Payments",
        icon: "CreditCard",
        href: "#",
        bgColor: "bg-nav-payments-light",
        hoverColor: "hover:bg-nav-payments-hover"
      },
    ],
  },
  footer: {
    items: [
      {
        name: "Settings",
        icon: "Settings",
        href: "#",
        bgColor: "bg-nav-settings-light",
        hoverColor: "hover:bg-nav-settings-hover"
      },
      {
        name: "Help",
        icon: "HelpCircle",
        href: "#",
        bgColor: "bg-nav-help-light",
        hoverColor: "hover:bg-nav-help-hover"
      },
    ],
  },
}

// Add proper types to NavItem
function NavItem({
  href,
  icon,
  children,
  onNavigate,
  bgColor,
  hoverColor,
}: {
  href: string
  icon: keyof typeof Icons
  children: React.ReactNode
  onNavigate: () => void
  bgColor: string
  hoverColor: string
}) {
  const IconComponent = Icons[icon] as React.ElementType
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "group flex items-center pr-3 pl-1 py-1 text-sm rounded-md transition-all opacity-70 hover:opacity-100 duration-300",
        hoverColor
      )}
    >
      <div className={cn("mr-3 p-2 rounded-md", bgColor)}>
        <IconComponent className="h-4 w-4 flex-shrink-0" />
      </div>
        {children}
    </Link>
  )
}

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-background shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Icons.Menu className="h-5 w-5" />
      </button>
      <nav
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-background transform transition-transform duration-200 ease-in-out
          lg:translate-x-0 lg:static lg:w-64
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col">
          <Link
            href="/"
            className="h-16 px-6 flex items-center"
          >
            <span className="text-lg font-semibold hover:cursor-pointer">
              Crazy Dash
            </span>
          </Link>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              {Object.entries(navigationConfig)
                .filter(([key]) => key !== "footer")
                .map(([key, section]) => (
                  <div key={key}>
                    <div className="px-1 mb-2 text-xs font-semibold uppercase tracking-wider opacity-30">
                      {section.title}
                    </div>
                    <div className="space-y-1">
                      {section.items.map((item) => (
                        <NavItem
                          key={item.name}
                          href={item.href}
                          icon={item.icon}
                          onNavigate={handleNavigation}
                          bgColor={item.bgColor}
                          hoverColor={item.hoverColor}
                        >
                          {item.name}
                        </NavItem>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="px-4 py-4">
            <div className="space-y-1">
              {navigationConfig.footer.items.map((item) => (
                <NavItem
                  key={item.name}
                  href={item.href}
                  icon={item.icon}
                  onNavigate={handleNavigation}
                  bgColor={item.bgColor}
                  hoverColor={item.hoverColor}
                >
                  {item.name}
                </NavItem>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

