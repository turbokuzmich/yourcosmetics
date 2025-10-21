import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import CookieConsent from "./components/cookie-consent";
import Script from "next/script";
import { METRIKA_ID } from "./constants";

const roboto = Roboto_Flex({
  subsets: ["cyrillic-ext", "latin"],
  variable: "--font-roboto-flex",
});

export const metadata: Metadata = {
  title: "Твоя Косметика",
  description: "Твоя Косметика",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <Script>
        {`(function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}', 'ym');

    ym(${METRIKA_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});`}
      </Script>
      <body className={`${roboto.variable} antialiased`}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
