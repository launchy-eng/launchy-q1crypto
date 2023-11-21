import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Launchy',
  description: 'Official Launchy Website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Facebook Pixel Script */}
      {/* <Script strategy="beforeInteractive">
        {`
          !function (f, b, e, v, n, t, s) {
            if (f.fbq) return; n = f.fbq = function () {
              n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
            n.queue = []; t = b.createElement(e); t.async = !0;
            t.src = v; s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)
          }(window, document, 'script',
            'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1300812337127101');
          fbq('track', 'PageView');
        `}
      </Script> */}
      <noscript>
        <img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=1300812337127101&ev=PageView&noscript=1" />
      </noscript>
      <meta name="facebook-domain-verification" content="azyztwopqvvb0n1ssb3fs0za8aax7f" />
      {/* End Facebook Pixel Code */}

      {/* Google Tag Manager Script */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=UA-251307142-1" />
      <Script strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', 'UA-251307142-1');
        `}
      </Script>
      {/* End Google Tag Manager Code */}
      <body className={inter.className}>{children}</body>
    </html>
  )
}
