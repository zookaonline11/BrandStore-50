import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Brand Store - المصادقة",
  description: "تسجيل الدخول والتسجيل",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">{children}</div>
    </div>
  )
}
