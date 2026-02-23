"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart"
import type { MenuCategory, MenuItem } from "@/lib/poster"

interface MenuSectionProps {
  categories: MenuCategory[]
  products: MenuItem[]
}

export function MenuSection({ categories, products }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const { items: cartItems, add, update } = useCart()

  const filteredProducts = activeCategory
    ? products.filter((p) => p.categoryId === activeCategory)
    : products

  const getCartQuantity = (productId: string) => {
    const item = cartItems.find((i) => i.id === productId)
    return item?.quantity || 0
  }

  return (
    <section id="menu" className="bg-background py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Меню
          </p>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-balance">Оберіть страву</span>
          </h2>
        </div>

        {/* Category tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === null
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Все
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products grid */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-lg text-muted-foreground">
              Наразі меню завантажується...
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => {
              const qty = getCartQuantity(product.id)
              return (
                <article
                  key={product.id}
                  className={`group flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg ${
                    product.outOfStock
                      ? "border-border opacity-50"
                      : "border-border"
                  }`}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    {product.photo ? (
                      <Image
                        src={product.photo}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="text-4xl text-muted-foreground/30">
                          ?
                        </span>
                      </div>
                    )}
                    {product.outOfStock && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/60">
                        <span className="rounded-full bg-destructive px-3 py-1 text-xs font-semibold text-primary-foreground">
                          Немає в наявності
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-4">
                    <p className="mb-0.5 text-xs text-muted-foreground">
                      {product.categoryName}
                    </p>
                    <h3 className="mb-3 text-sm font-semibold text-card-foreground leading-snug">
                      {product.name}
                    </h3>

                    <div className="mt-auto flex items-center justify-between">
                      <p className="text-lg font-bold text-foreground">
                        {product.price.toFixed(0)}{" "}
                        <span className="text-xs font-normal text-muted-foreground">
                          грн
                        </span>
                      </p>

                      {product.outOfStock ? (
                        <span className="text-xs text-muted-foreground">
                          Недоступно
                        </span>
                      ) : qty > 0 ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              update(product.id, qty - 1)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/80"
                            aria-label="Зменшити кількість"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-[1.5rem] text-center text-sm font-semibold text-foreground">
                            {qty}
                          </span>
                          <button
                            onClick={() =>
                              add({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                              })
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
                            aria-label="Збільшити кількість"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1.5"
                          onClick={() =>
                            add({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                            })
                          }
                        >
                          <Plus className="h-4 w-4" />
                          <span className="sr-only sm:not-sr-only">
                            Додати
                          </span>
                        </Button>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
