"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart"

const navLinks = [
  { label: "Меню", href: "#menu" },
  { label: "Про нас", href: "#about" },
  { label: "Контакти", href: "#contact" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { count, total } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.jpg"
            alt="Ne Speshi Bar"
            width={120}
            height={50}
            className="h-8 w-auto md:h-10"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <a href="#menu">
            <Button size="sm" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              Замовити
              {count > 0 && (
                <span className="ml-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary-foreground/20 px-1.5 text-xs font-bold">
                  {count}
                </span>
              )}
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-3 md:hidden">
          {count > 0 && (
            <span className="text-sm font-semibold text-primary">
              {total.toFixed(0)} грн
            </span>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Закрити меню" : "Відкрити меню"}
          >
            {mobileOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-border bg-background px-4 pb-6 pt-4 md:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a href="#menu" onClick={() => setMobileOpen(false)}>
              <Button className="mt-2 w-full gap-2">
                <ShoppingBag className="h-4 w-4" />
                Замовити
              </Button>
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
