"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Users, ShoppingCart, DollarSign, Star } from "lucide-react"

export default function AnalyticsPage() {
  const chartData = [
    { name: "يناير", sales: 4000, orders: 24, users: 240 },
    { name: "فبراير", sales: 3000, orders: 13, users: 221 },
    { name: "مارس", sales: 2000, orders: 9, users: 229 },
    { name: "أبريل", sales: 2780, orders: 39, users: 200 },
    { name: "مايو", sales: 1890, orders: 48, users: 221 },
  ]

  const stats = [
    {
      icon: Users,
      label: "إجمالي المستخدمين",
      value: "2,543",
      change: "+12.5%",
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      icon: ShoppingCart,
      label: "الطلبات الكلية",
      value: "1,245",
      change: "+8.2%",
      color: "bg-green-500/20 text-green-400",
    },
    {
      icon: DollarSign,
      label: "إجمالي المبيعات",
      value: "425,600 EGP",
      change: "+23.1%",
      color: "bg-purple-500/20 text-purple-400",
    },
    {
      icon: Star,
      label: "تقييم الموقع",
      value: "4.8/5",
      change: "+0.3",
      color: "bg-yellow-500/20 text-yellow-400",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">تحليلات الأداء</h1>
        <p className="text-slate-400 mt-1">مراقبة أداء الموقع والمبيعات</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-slate-700 bg-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                  <p className="text-green-400 text-sm mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="text-white">المبيعات الشهرية</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Orders Chart */}
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="text-white">الطلبات والمستخدمين</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Legend />
                <Bar dataKey="orders" fill="#10b981" />
                <Bar dataKey="users" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Customers */}
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader>
          <CardTitle className="text-white">أكثر العملاء نشاطاً</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "أحمد محمد", orders: 45, spent: "12,500 EGP" },
              { name: "فاطمة علي", orders: 38, spent: "9,800 EGP" },
              { name: "محمود حسن", orders: 32, spent: "8,200 EGP" },
              { name: "نور الدين", orders: 28, spent: "7,100 EGP" },
            ].map((customer, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div>
                  <p className="text-white font-semibold">{customer.name}</p>
                  <p className="text-slate-400 text-sm">{customer.orders} طلب</p>
                </div>
                <span className="text-green-400 font-semibold">{customer.spent}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
