'use client'

export const dynamic = 'force-dynamic'
export const revalidate = 0

import AdminClient from './AdminClient'

export default function AdminPage() {
  return <AdminClient />
}
