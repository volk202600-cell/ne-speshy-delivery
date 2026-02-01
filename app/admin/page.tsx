'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AdminPage() {
  const [items, setItems] = useState<any[]>([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadMenu()
  }, [])

  async function loadMenu() {
    const { data } = await supabase.from('menu').select('*').order('created_at')
    setItems(data || [])
  }

  async function addItem() {
    if (!name || !price || !file) return alert('Заповни все')

    setLoading(true)

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('menu')
      .upload(fileName, file)

    if (uploadError) {
      setLoading(false)
      return alert(uploadError.message)
    }

    const { data: urlData } = supabase.storage
      .from('menu')
      .getPublicUrl(fileName)

    await supabase.from('menu').insert({
      name,
      price: Number(price),
      description,
      image_url: urlData.publicUrl
    })

    setName('')
    setPrice('')
    setDescription('')
    setFile(null)
    setLoading(false)
    loadMenu()
  }

  async function removeItem(id: string) {
    await supabase.from('menu').delete().eq('id', id)
    loadMenu()
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Адмінка меню</h1>

      <div style={{ marginBottom: 20 }}>
        <input placeholder="Назва" value={name} onChange={e => setName(e.target.value)} /><br/>
        <input placeholder="Ціна" value={price} onChange={e => setPrice(e.target.value)} /><br/>
        <textarea placeholder="Опис" value={description} onChange={e => setDescription(e.target.value)} /><br/>
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} /><br/>
        <button onClick={addItem} disabled={loading}>
          {loading ? 'Загрузка...' : 'Додати'}
        </button>
      </div>

      <hr />

      {items.map(item => (
        <div key={item.id} style={{ marginBottom: 15 }}>
          <b>{item.name}</b> — {item.price} грн
          <br />
          <img src={item.image_url} width={120} />
          <br />
          <button onClick={() => removeItem(item.id)}>❌ Видалити</button>
        </div>
      ))}
    </div>
  )
}
