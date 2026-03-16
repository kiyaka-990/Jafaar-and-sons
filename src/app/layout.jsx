import './globals.css'

export const metadata = {
  title: 'Jaafar And Son Limited | Civil Works & General Supplies',
  description:
    'Jaafar and Son Limited — your trusted partner for road construction, building works, civil infrastructure and general supplies across Kenya. Reg. No. PVT-3QU7PGX7.',
  keywords: 'civil works, road construction, building, general supplies, Nairobi, Kenya',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
