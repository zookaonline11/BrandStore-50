"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Truck } from "lucide-react"

export default function MapViewPage() {
  const orders = [
    {
      id: "ORD-001",
      customer: "أحمد محمد",
      location: "القاهرة - المعادي",
      status: "قيد التوصيل",
      lat: 30.0044,
      lng: 31.3157,
      progress: 45,
    },
    {
      id: "ORD-002",
      customer: "فاطمة علي",
      location: "الجيزة - الهرم",
      status: "في الطريق",
      lat: 29.9773,
      lng: 31.1325,
      progress: 65,
    },
    {
      id: "ORD-003",
      customer: "محمود حسن",
      location: "الإسكندرية",
      status: "قيد التنفيذ",
      lat: 31.2001,
      lng: 29.9187,
      progress: 25,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">عرض الخريطة</h1>
        <p className="text-slate-400 mt-1">تتبع جميع الطلبات على الخريطة</p>
      </div>

      {/* Map placeholder */}
      <Card className="border-slate-700 bg-slate-800">
        <CardContent className="pt-6">
          <div className="w-full h-96 bg-slate-700 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-600">
            <div className="text-center">
              <MapPin size={48} className="text-slate-400 mx-auto mb-4" />
              <p className="text-slate-400">خريطة تفاعلية ستظهر هنا</p>
              <p className="text-slate-500 text-sm mt-2">تقريباً {orders.length} طلبات على الخريطة</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {orders.map((order) => (
          <Card key={order.id} className="border-slate-700 bg-slate-800">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-white">{order.id}</CardTitle>
                  <p className="text-slate-400 text-sm mt-1">{order.customer}</p>
                </div>
                <Badge className="bg-blue-500/20 text-blue-400 flex items-center gap-2">
                  <Truck size={14} />
                  {order.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin size={16} className="text-red-400" />
                {order.location}
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>التقدم</span>
                  <span>{order.progress}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${order.progress}%` }}
                  ></div>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                الموقع: {order.lat.toFixed(4)}, {order.lng.toFixed(4)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
