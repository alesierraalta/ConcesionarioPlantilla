import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'AutoPremium - Gana Premios Todos los Días | Concesionario de Carros y Motos',
  description: 'Gana premios diarios al interactuar con nuestro concesionario. Rifas diarias de vehículos, accesorios y sorpresas. Participa en segundos.',
  keywords: [
    'concesionario',
    'carros',
    'motos',
    'rifas',
    'premios',
    'sorteos',
    'vehículos',
    'promociones',
    'autopremium'
  ],
  authors: [{ name: 'AutoPremium' }],
  creator: 'AutoPremium',
  publisher: 'AutoPremium',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://autopremium.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AutoPremium - Gana Premios Todos los Días',
    description: 'Rifas diarias de vehículos, accesorios y sorpresas. Participa en segundos.',
    url: 'https://autopremium.com',
    siteName: 'AutoPremium',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AutoPremium - Concesionario con Rifas Diarias',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutoPremium - Gana Premios Todos los Días',
    description: 'Rifas diarias de vehículos, accesorios y sorpresas. Participa en segundos.',
    images: ['/og-image.jpg'],
    creator: '@autopremium',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={cn('scroll-smooth', inter.variable)}>
      <head>
        {/* Preconnect para mejorar rendimiento */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme color para móviles */}
        <meta name="theme-color" content="#1e40af" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        
        {/* Viewport optimizado */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        
        {/* DNS prefetch para recursos externos */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoDealer",
              "name": "AutoPremium",
              "description": "Concesionario de carros y motos con rifas diarias de premios",
              "url": "https://autopremium.com",
              "logo": "https://autopremium.com/logo.png",
              "image": "https://autopremium.com/og-image.jpg",
              "telephone": "+1-555-123-4567",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Av. Principal 123",
                "addressLocality": "Ciudad",
                "addressCountry": "ES"
              },
              "openingHours": [
                "Mo-Fr 08:00-18:00",
                "Sa 09:00-17:00",
                "Su 10:00-15:00"
              ],
              "priceRange": "$$",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Vehículos y Promociones",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Car",
                      "name": "Vehículos Nuevos y Seminuevos"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Motorcycle",
                      "name": "Motocicletas"
                    }
                  }
                ]
              },
              "sameAs": [
                "https://facebook.com/autopremium",
                "https://instagram.com/autopremium",
                "https://twitter.com/autopremium"
              ]
            })
          }}
        />
      </head>
      <body 
        className={cn(
          'min-h-screen bg-gray-50 font-sans antialiased',
          inter.className
        )}
        suppressHydrationWarning
      >
        {/* Skip to main content para accesibilidad */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-lg z-50"
        >
          Saltar al contenido principal
        </a>
        
        {/* Contenido principal */}
        <div id="main-content">
          {children}
        </div>
        
        {/* Scripts de analytics (placeholder) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Google Analytics placeholder
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              // gtag('config', 'GA_MEASUREMENT_ID');
              
              // Performance monitoring
              if ('performance' in window) {
                window.addEventListener('load', function() {
                  setTimeout(function() {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                      console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                    }
                  }, 0);
                });
              }
            `
          }}
        />
      </body>
    </html>
  )
}