import { useSyncExternalStore, useCallback } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

type Listener = () => void;

let cart: CartItem[] = [];
const listeners = new Set<Listener>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): CartItem[] {
  return cart;
}

export function addToCart(item: { id: string; name: string; price: number }) {
  const existing = cart.find((i) => i.id === item.id);
  if (existing) {
    cart = cart.map((i) =>
      i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
    );
  } else {
    cart = [...cart, { ...item, quantity: 1 }];
  }
  emitChange();
}

export function removeFromCart(id: string) {
  cart = cart.filter((i) => i.id !== id);
  emitChange();
}

export function updateQuantity(id: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(id);
    return;
  }
  cart = cart.map((i) => (i.id === id ? { ...i, quantity } : i));
  emitChange();
}

export function clearCart() {
  cart = [];
  emitChange();
}

export function getCartTotal(): number {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getCartCount(): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function useCart() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const add = useCallback(
    (item: { id: string; name: string; price: number }) => addToCart(item),
    []
  );
  const remove = useCallback((id: string) => removeFromCart(id), []);
  const update = useCallback(
    (id: string, qty: number) => updateQuantity(id, qty),
    []
  );
  const clear = useCallback(() => clearCart(), []);

  return { items, total, count, add, remove, update, clear };
}
