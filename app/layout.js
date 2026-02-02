// app/layout.js

export const metadata = {
  title: 'Private Telegram Mini App',
  description: 'Exclusive content access',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
