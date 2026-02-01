'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AdminPage() {
  const [menu, setMenu] = useState<any[]>([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadMenu()
  }, [])

  async function loadMenu() {
    const { data } = await supabase.from('menu').select('*').order('created_at', { ascending: false })
    setMenu(data || [])
  }

  async function addItem() {
    if (!file) return alert('Вибери картинку')

    setLoading(true)

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase
      .storage
      .from('menu')
      .upload(fileName, file)

    if (uploadError) {
      alert('Помилка загрузки картинки')
      setLoading(false)
      return
    }

    const { data: image } = supabase
      .storage
      .from('menu')
      .getPublicUrl(fileName)

    await supabase.from('menu').insert({
      name,
      price: Number(price),
      description,
      image_url: image.publicUrl
    })

    setName('')
    setPrice('')
    setDescription('')
    setFile(null)

    await loadMenu()
    setLoading(false)
  }

  async function removeItem(id: string) {
    await supabase.from('menu').delete().eq('id', id)
    loadMenu()
  }

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: '0 auto' }}>
      <h2>Адмінка меню</h2>

      <input
        placeholder="Назва"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Ціна"
        type="number"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />

      <textarea
        placeholder="Опис"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={e => setFile(e.target.files?.[0] || null)}
      />

      <button onClick={addItem} disabled={loading}>
        {loading ? 'Загрузка...' : 'Додати'}
      </button>

      <hr />

      {menu.map(item => (
        <div key={item.id} style={{ marginBottom: 20 }}>
          <img src={item.image_url} width={120} />
          <div><b>{item.name}</b></div>
          <div>{item.price} грн</div>
          <button onClick={() => removeItem(item.id)}>Видалити</button>
        </div>
      ))}
    </div>
  )
}
