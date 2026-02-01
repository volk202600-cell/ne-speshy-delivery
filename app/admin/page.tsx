'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const SECRET_KEY = 'NESPESHY2026'; // ← можеш змінити

export default function AdminPage() {
  const [allowed, setAllowed] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [menu, setMenu] = useState<any[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('key') === SECRET_KEY) {
      setAllowed(true);
      loadMenu();
    }
  }, []);

  const loadMenu = async () => {
    const { data } = await supabase.from('menu').select('*').order('created_at', { ascending: false });
    if (data) setMenu(data);
  };

  const addItem = async () => {
    if (!file) return alert('Додай фото');

    const fileName = `${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from('menu')
      .upload(fileName, file);

    if (uploadError) {
      alert('Помилка загрузки фото');
      return;
    }

    const { data } = supabase.storage.from('menu').getPublicUrl(fileName);

    await supabase.from('menu').insert({
      name,
      price: Number(price),
      description,
      image_url: data.publicUrl,
    });

    setName('');
    setPrice('');
    setDescription('');
    setFile(null);
    loadMenu();
  };

  const removeItem = async (id: string) => {
    await supabase.from('menu').delete().eq('id', id);
    loadMenu();
  };

  if (!allowed) {
    return <h2 style={{ padding: 20 }}>❌ Нема доступу</h2>;
  }

  return (
    <div style={{ padding: 20, maxWidth: 500 }}>
      <h2>🍔 Адмінка меню</h2>

      <input placeholder="Назва" value={name} onChange={e => setName(e.target.value)} /><br /><br />
      <input placeholder="Ціна" type="number" value={price} onChange={e => setPrice(e.target.value)} /><br /><br />
      <textarea placeholder="Опис" value={description} onChange={e => setDescription(e.target.value)} /><br /><br />
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} /><br /><br />

      <button onClick={addItem}>➕ Додати</button>

      <hr />

      {menu.map(item => (
        <div key={item.id} style={{ marginBottom: 15 }}>
          <img src={item.image_url} style={{ width: '100%', borderRadius: 8 }} />
          <b>{item.name}</b> — {item.price} грн
          <p>{item.description}</p>
          <button onClick={() => removeItem(item.id)}>❌ Видалити</button>
        </div>
      ))}
    </div>
  );
}
