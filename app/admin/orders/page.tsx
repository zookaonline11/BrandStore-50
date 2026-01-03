"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Eye } from "lucide-react"

export default function OrdersPage() {
  const orders = [
    {
      id: "ORD-001",
      customer: "أحمد محمد",
      amount: "500 EGP",
      status: "قيد التنفيذ",
      date: "2025-01-15",
      items: 3,
    },
    {
      id: "ORD-002",
      customer: "فاطمة أحمد",
      amount: "1,200 EGP",
      status: "في الطريق",
      date: "2025-01-14",
      items: 5,
    },
    {
      id: "ORD-003",
      customer: "محمود علي",
      amount: "800 EGP",
      status: "تم التسليم",
      date: "2025-01-13",
      items: 2,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "قيد التنفيذ":
        return "bg-yellow-500/20 text-yellow-400"
      case "في الطريق":
        return "bg-blue-500/20 text-blue-400"
      case "تم التسليم":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-slate-500/20 text-slate-400"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">الطلبات</h1>
          <p className="text-slate-400 mt-1">إدارة جميع الطلبات</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <Input
            placeholder="ابحث عن طلب..."
            className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 pl-10"
          />
        </div>
        <Button className="bg-slate-700 hover:bg-slate-600 text-white gap-2">
          <Filter size={18} /> تصفية
        </Button>
      </div>

      {/* Orders Table */}
      <Card className="border-slate-700 bg-slate-800">
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-slate-300">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-right py-3 px-4">رقم الطلب</th>
                  <th className="text-right py-3 px-4">العميل</th>
                  <th className="text-right py-3 px-4">المبلغ</th>
                  <th className="text-right py-3 px-4">عدد المنتجات</th>
                  <th className="text-right py-3 px-4">الحالة</th>
                  <th className="text-right py-3 px-4">التاريخ</th>
                  <th className="text-right py-3 px-4">الإجراء</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                    <td className="py-3 px-4 font-semibold">{order.id}</td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4">{order.amount}</td>
                    <td className="py-3 px-4">{order.items}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-lg text-sm ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{order.date}</td>
                    <td className="py-3 px-4">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                        <Eye size={16} /> عرض
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
