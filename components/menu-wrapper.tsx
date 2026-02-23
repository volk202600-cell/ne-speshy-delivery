"use client"

import { MenuSection } from "@/components/menu-section"
import type { MenuCategory, MenuItem } from "@/lib/poster"

interface MenuWrapperProps {
  categories: MenuCategory[]
  products: MenuItem[]
}

export function MenuWrapper({ categories, products }: MenuWrapperProps) {
  return <MenuSection categories={categories} products={products} />
}
