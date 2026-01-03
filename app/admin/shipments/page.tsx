"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Eye, CheckCircle2, AlertCircle } from "lucide-react"

export default function ShipmentsPage() {
  const shipments = [
    {
      id: "SHIP-001",
      user: "أحمد محمد",
      service: "شحن فودافون",
      amount: "100 EGP",
      status: "قيد التنفيذ",
      date: "2025-01-15",
      reference: "123456789",
    },
    {
      id: "SHIP-002",
      user: "فاطمة أحمد",
      service: "محفظة أورانج",
      amount: "500 EGP",
      status: "تم التنفيذ",
      date: "2025-01-14",
      reference: "987654321",
    },
    {
      id: "SHIP-003",
      user: "محمود علي",
      service: "شحن إتصالات",
      amount: "200 EGP",
      status: "معلق",
      date: "2025-01-13",
      reference: "555666777",
    },
  ]

  const getStatusIcon = (status: string) => {
    if (status === "تم التنفيذ") return <CheckCircle2 className="text-green-400" size={18} />
    return <AlertCircle className="text-yellow-400" size={18} />
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">الشحنات</h1>
          <p className="text-slate-400 mt-1">متابعة جميع الشحنات والعمليات المالية</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <Input
            placeholder="ابحث عن شحنة..."
            className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 pl-10"
          />
        </div>
        <Button className="bg-slate-700 hover:bg-slate-600 text-white gap-2">
          <Filter size={18} /> تصفية
        </Button>
      </div>

      {/* Shipments Table */}
      <Card className="border-slate-700 bg-slate-800">
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-slate-300 text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-right py-3 px-4">رقم الشحنة</th>
                  <th className="text-right py-3 px-4">المستخدم</th>
                  <th className="text-right py-3 px-4">الخدمة</th>
                  <th className="text-right py-3 px-4">المبلغ</th>
                  <th className="text-right py-3 px-4">رقم المرجع</th>
                  <th className="text-right py-3 px-4">الحالة</th>
                  <th className="text-right py-3 px-4">التاريخ</th>
                  <th className="text-right py-3 px-4">الإجراء</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((shipment) => (
                  <tr key={shipment.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                    <td className="py-3 px-4 font-semibold">{shipment.id}</td>
                    <td className="py-3 px-4">{shipment.user}</td>
                    <td className="py-3 px-4">{shipment.service}</td>
                    <td className="py-3 px-4">{shipment.amount}</td>
                    <td className="py-3 px-4 font-mono text-xs">{shipment.reference}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(shipment.status)}
                        <span>{shipment.status}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{shipment.date}</td>
                    <td className="py-3 px-4">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                        <Eye size={16} />
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
