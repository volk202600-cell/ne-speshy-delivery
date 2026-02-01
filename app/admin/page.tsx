'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

type MenuItem = {
  id: string
  title: string
  description: string
  price: number
}

export default function AdminPage() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  const loadMenu = async () => {
    const { data } = await supabase.from('menu').select('*').order('created_at')
    setItems(data || [])
  }

  useEffect(() => {
    loadMenu()
  }, [])

  const addItem = async () => {
    if (!title || !price) return alert('Заповни назву і ціну')

    await supabase.from('menu').insert({
      title,
      description,
      price: Number(price),
    })

    setTitle('')
    setDescription('')
    setPrice('')
    loadMenu()
  }

  const deleteItem = async (id: string) => {
    await supabase.from('menu').delete().eq('id', id)
    loadMenu()
  }

  return (
    <div style={{ padding: 20, maxWidth: 500 }}>
      <h1>Адмінка меню</h1>

      <input
        placeholder="Назва"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />

      <input
        placeholder="Опис"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />

      <input
        placeholder="Ціна"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />

      <button onClick={addItem}>➕ Додати</button>

      <hr />

      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: 10 }}>
          <b>{item.title}</b> — {item.price} грн
          <br />
          <small>{item.description}</small>
          <br />
          <button onClick={() => deleteItem(item.id)}>❌ Видалити</button>
        </div>
      ))}
    </div>
  )
}
