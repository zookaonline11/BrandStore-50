"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { CustomerNavbar } from "@/components/customer/navbar"

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const userSession = localStorage.getItem("userSession")
    if (!userSession) {
      router.push("/")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-background">
      <CustomerNavbar />
      <main className="pt-20">{children}</main>
    </div>
  )
}
