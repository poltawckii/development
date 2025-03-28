"use client"
import Navbar from '@components/UI/Navbar/Navbar';
import Footer from "@components/UI/Footer/Footer";
import {Metadata} from "next";
import {ReactNode} from "react";
import Providers from "./providers";
// export const metadata: Metadata = {
//   title: 'Next.js',
//   description: 'Generated by Next.js',
// }

export default function RootLayout({children} : { children: ReactNode }) {
  return (
      <html lang="en">
      <head>
        <meta charSet="utf-8"/>
        <link rel="icon" href="/logo.png" type="image/x-icon"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Cozy Evening - Онлайн-Кинотеатр</title>
      </head>
      <body style={{
          margin: 0,
          padding: 0,
          boxSizing: "border-box", }}>
      <div id="root"/>
      <Providers>
          <Navbar/>
          {children}
          <Footer/>
      </Providers>
      </body>
      </html>
  )
}
