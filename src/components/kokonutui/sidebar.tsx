"use client"

import * as Icons from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useI18n } from "@/i18n/client"

// Add type for navigation item
type NavigationItem = {
  name: string
  nameKey: string
  icon: keyof typeof Icons
  href: string
  bgColor: string
  hoverColor: string
}

// Add type for navigation section
type NavigationSection = {
  title?: string
  titleKey?: string
  items: NavigationItem[]
}

// Navigation configuration
const navigationConfig: Record<string, NavigationSection> = {
  overview: {
    title: "Overview",
    titleKey: "navigation.overview",
    items: [
      {
        name: "Dashboard",
        nameKey: "navigation.dashboard",
        icon: "Home",
        href: "/dashboard",
        bgColor: "bg-nav-dashboard-light",
        hoverColor: "hover:bg-nav-dashboard-hover"
      },
      {
        name: "Analytics",
        nameKey: "navigation.analytics",
        icon: "BarChart2",
        href: "#",
        bgColor: "bg-nav-analytics-light",
        hoverColor: "hover:bg-nav-analytics-hover"
      },
      {
        name: "Organization",
        nameKey: "navigation.organization",
        icon: "Building2",
        href: "#",
        bgColor: "bg-nav-organization-light",
        hoverColor: "hover:bg-nav-organization-hover"
      },
      {
        name: "Projects",
        nameKey: "navigation.projects",
        icon: "Folder",
        href: "#",
        bgColor: "bg-nav-projects-light",
        hoverColor: "hover:bg-nav-projects-hover"
      },
    ],
  },
  finance: {
    title: "Finance",
    titleKey: "navigation.finance",
    items: [
      {
        name: "Transactions",
        nameKey: "navigation.transactions",
        icon: "Wallet",
        href: "#",
        bgColor: "bg-nav-transactions-light",
        hoverColor: "hover:bg-nav-transactions-hover"
      },
      {
        name: "Invoices",
        nameKey: "navigation.invoices",
        icon: "Receipt",
        href: "#",
        bgColor: "bg-nav-invoices-light",
        hoverColor: "hover:bg-nav-invoices-hover"
      },
      {
        name: "Payments",
        nameKey: "navigation.payments",
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
        nameKey: "navigation.settings",
        icon: "Settings",
        href: "#",
        bgColor: "bg-nav-settings-light",
        hoverColor: "hover:bg-nav-settings-hover"
      },
      {
        name: "Help",
        nameKey: "navigation.help",
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
  nameKey,
  children,
  onNavigate,
  bgColor,
  hoverColor,
}: {
  href: string
  icon: keyof typeof Icons
  nameKey: string
  children: React.ReactNode
  onNavigate: () => void
  bgColor: string
  hoverColor: string
}) {
  const { locale, t } = useI18n();
  const IconComponent = Icons[icon] as React.ElementType

  // Add locale prefix to href if it's a valid path and not just a placeholder
  const localizedHref = href.startsWith('/') && href !== '#'
    ? `/${locale}${href}`
    : href;

  return (
    <Link
      href={localizedHref}
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
  const { locale, t } = useI18n();

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
            href={`/${locale}`}
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
                      {section.titleKey ? t(section.titleKey) : section.title}
                    </div>
                    <div className="space-y-1">
                      {section.items.map((item) => (
                        <NavItem
                          key={item.name}
                          href={item.href}
                          icon={item.icon}
                          nameKey={item.nameKey}
                          onNavigate={handleNavigation}
                          bgColor={item.bgColor}
                          hoverColor={item.hoverColor}
                        >
                          {item.nameKey ? t(item.nameKey) : item.name}
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
                  nameKey={item.nameKey}
                  onNavigate={handleNavigation}
                  bgColor={item.bgColor}
                  hoverColor={item.hoverColor}
                >
                  {item.nameKey ? t(item.nameKey) : item.name}
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

