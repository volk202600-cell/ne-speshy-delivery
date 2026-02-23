"use client"

import { useState } from "react"
import { ShoppingBag, X, Plus, Minus, Trash2, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart"

export function CartSidebar() {
  const { items, total, count, update, remove, clear } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    comment: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.address) {
      setError("Заповніть всі обов'язкові поля")
      return
    }
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Помилка")
      }

      setSuccess(true)
      clear()
      setForm({ name: "", phone: "", address: "", comment: "" })
      setTimeout(() => {
        setSuccess(false)
        setShowForm(false)
        setIsOpen(false)
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Помилка надсилання")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating cart button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
        aria-label="Відкрити кошик"
      >
        <ShoppingBag className="h-5 w-5" />
        {count > 0 && (
          <span className="text-sm font-bold">{count}</span>
        )}
        {total > 0 && (
          <span className="text-sm font-medium">
            {total.toFixed(0)} грн
          </span>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-bold text-foreground">
            Кошик {count > 0 && `(${count})`}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Закрити кошик"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {success ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Send className="h-8 w-8 text-primary" />
              </div>
              <p className="text-center text-lg font-semibold text-foreground">
                Замовлення надіслано!
              </p>
              <p className="text-center text-sm text-muted-foreground">
                {"Ми зв'яжемося з вами найближчим часом"}
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/30" />
              <p className="text-muted-foreground">Кошик порожній</p>
            </div>
          ) : showForm ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="mb-2 text-left text-sm text-primary hover:underline"
              >
                {"< Назад до кошику"}
              </button>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  {"Ім'я *"}
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
                  placeholder="Ваше ім'я"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Телефон *
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
                  placeholder="+380..."
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Адреса доставки *
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
                  placeholder="Вулиця, будинок, квартира"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Коментар
                </label>
                <textarea
                  value={form.comment}
                  onChange={(e) =>
                    setForm({ ...form, comment: e.target.value })
                  }
                  rows={3}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring resize-none"
                  placeholder="Побажання до замовлення"
                />
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              {/* Order summary */}
              <div className="rounded-lg bg-secondary p-4">
                <p className="mb-2 text-sm font-medium text-secondary-foreground">
                  Ваше замовлення:
                </p>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-muted-foreground"
                  >
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>
                      {(item.price * item.quantity).toFixed(0)} грн
                    </span>
                  </div>
                ))}
                <div className="mt-2 border-t border-border pt-2 flex justify-between text-sm font-bold text-foreground">
                  <span>Разом:</span>
                  <span>{total.toFixed(0)} грн</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full gap-2"
                size="lg"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {loading ? "Надсилаємо..." : "Замовити"}
              </Button>
            </form>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-card-foreground">
                      {item.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.price.toFixed(0)} грн
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => update(item.id, item.quantity - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      aria-label="Зменшити"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="min-w-[1.25rem] text-center text-sm font-semibold text-foreground">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => update(item.id, item.quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                      aria-label="Збільшити"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => remove(item.id)}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    aria-label="Видалити"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && !showForm && !success && (
          <div className="border-t border-border px-6 py-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Разом:</span>
              <span className="text-xl font-bold text-foreground">
                {total.toFixed(0)} грн
              </span>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="w-full gap-2"
              size="lg"
            >
              Оформити замовлення
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
