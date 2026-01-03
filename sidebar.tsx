"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, X, Settings, Bell, Package, ShoppingCart, LogOut, BarChart3, Plus, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const menuItems = [
    { icon: Home, label: "الرئيسية", href: "/admin/dashboard" },
    { icon: ShoppingCart, label: "الطلبات", href: "/admin/orders" },
    { icon: Package, label: "الشحنات", href: "/admin/shipments" },
    { icon: Plus, label: "منتج جديد", href: "/admin/products/new" },
    { icon: BarChart3, label: "التحليلات", href: "/admin/analytics" },
    { icon: Bell, label: "الإشعارات", href: "/admin/notifications" },
    { icon: Settings, label: "الإعدادات", href: "/admin/settings" },
  ]

  const handleLogout = () => {
    localStorage.removeItem("adminUser")
    router.push("/")
  }

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-primary rounded-lg text-primary-foreground"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative lg:w-64 w-full h-full bg-card border-l border-border transition-all duration-300 z-40 rtl:border-l rtl:border-r-0 ${
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0 rtl:translate-x-full rtl:lg:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold text-primary">Brand Store</h1>
          <p className="text-muted-foreground text-sm mt-1">لوحة التحكم</p>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-md text-foreground/70 hover:bg-primary/10 hover:text-primary transition"
              onClick={() => setIsOpen(false)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 rtl:left-auto rtl:right-4">
          <Button
            onClick={handleLogout}
            className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground flex items-center gap-2"
          >
            <LogOut size={18} />
            تسجيل الخروج
          </Button>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
