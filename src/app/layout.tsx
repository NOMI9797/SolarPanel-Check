import type { Metadata } from 'next'
import './globals.css'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'

export const metadata: Metadata = {
  title: 'Solar Panel Hub - Authentication & Information Center',
  description: 'Find and verify your solar panel brand with instant authentication. Access official verification systems for major solar panel manufacturers worldwide.',
  keywords: 'solar panel, authentication, verification, brand detection, serial number, solar energy, renewable energy',
  authors: [{ name: 'Solar Panel Hub Team' }],
  creator: 'Solar Panel Hub',
  publisher: 'Solar Panel Hub',
  robots: 'index, follow',
  openGraph: {
    title: 'Solar Panel Hub - Authentication & Information Center',
    description: 'Find and verify your solar panel brand with instant authentication',
    url: 'https://solarpanelhub.com',
    siteName: 'Solar Panel Hub',
    images: [
      {
        url: '/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Solar Panel Hub Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solar Panel Hub - Authentication & Information Center',
    description: 'Find and verify your solar panel brand with instant authentication',
    images: ['/icons/icon-512x512.png'],
  },
  manifest: '/manifest.json',
  themeColor: '#10b981',
  colorScheme: 'light',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Solar Panel Hub',
  },
  applicationName: 'Solar Panel Hub',
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Solar Panel Hub" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#10b981" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#10b981" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
      </head>
      <body>
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}
