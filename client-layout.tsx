"use client"

import type React from "react"

import { Analytics } from "@vercel/analytics/next"
import { useState } from "react"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<"ar" | "en">("ar")

  return (
    <>
      <html lang={language} dir={language === "ar" ? "rtl" : "ltr"}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        </head>
        <body>
          <div className="fixed top-4 right-4 z-50 space-y-2">
            <button
              onClick={() => setLanguage("ar")}
              className={`px-3 py-1 rounded text-sm ${language === "ar" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300"}`}
            >
              عربي
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-3 py-1 rounded text-sm ${language === "en" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300"}`}
            >
              English
            </button>
          </div>
          {children}
          <Analytics />
        </body>
      </html>
    </>
  )
}
