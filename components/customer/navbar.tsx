"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, Menu, X, Home, Send, Wallet, ShoppingBag, User, LogOut, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CustomerNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("userSession")
    router.push("/")
  }

  return (
    <nav className="fixed top-0 right-0 left-0 bg-card border-b border-border z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between rtl:flex-row-reverse">
        {/* Logo */}
        <Link href="/customer/dashboard" className="text-2xl font-bold text-primary">
          Brand Store
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 rtl:gap-6">
          <Link
            href="/customer/dashboard"
            className="text-foreground/70 hover:text-foreground transition flex items-center gap-2"
          >
            <Home size={20} />
            الرئيسية
          </Link>
          <Link
            href="/customer/services"
            className="text-foreground/70 hover:text-foreground transition flex items-center gap-2"
          >
            <Send size={20} />
            الخدمات
          </Link>
          <Link
            href="/customer/store"
            className="text-foreground/70 hover:text-foreground transition flex items-center gap-2"
          >
            <ShoppingBag size={20} />
            المتجر
          </Link>
          <Link
            href="/customer/wallet"
            className="text-foreground/70 hover:text-foreground transition flex items-center gap-2"
          >
            <Wallet size={20} />
            المحفظة
          </Link>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4 rtl:gap-4">
          {/* Notifications */}
          <Button size="icon" className="relative bg-transparent hover:bg-primary/10 text-foreground">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </Button>

          {/* Support Chat */}
          <Button size="icon" className="bg-transparent hover:bg-primary/10 text-foreground" asChild>
            <Link href="/customer/support">
              <MessageSquare size={20} />
            </Link>
          </Button>

          {/* Profile */}
          <Button size="icon" className="bg-transparent hover:bg-primary/10 text-foreground" asChild>
            <Link href="/customer/profile">
              <User size={20} />
            </Link>
          </Button>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            {isOpen ? <X size={24} className="text-foreground" /> : <Menu size={24} className="text-foreground" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border p-4 space-y-2 bg-card">
          <Link
            href="/customer/dashboard"
            className="block px-4 py-2 text-foreground/70 hover:bg-primary/10 rounded-md transition"
          >
            الرئيسية
          </Link>
          <Link
            href="/customer/services"
            className="block px-4 py-2 text-foreground/70 hover:bg-primary/10 rounded-md transition"
          >
            الخدمات
          </Link>
          <Link
            href="/customer/store"
            className="block px-4 py-2 text-foreground/70 hover:bg-primary/10 rounded-md transition"
          >
            المتجر
          </Link>
          <Link
            href="/customer/wallet"
            className="block px-4 py-2 text-foreground/70 hover:bg-primary/10 rounded-md transition"
          >
            المحفظة
          </Link>
          <Button
            onClick={handleLogout}
            className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground gap-2 mt-2"
          >
            <LogOut size={18} />
            تسجيل الخروج
          </Button>
        </div>
      )}
    </nav>
  )
}
