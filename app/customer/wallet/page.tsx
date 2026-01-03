"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wallet, Plus, Minus, Send } from "lucide-react"

export default function WalletPage() {
  const wallet = {
    balance: 2500,
    currency: "EGP",
    recentTransactions: [
      { id: 1, type: "deposit", amount: 500, date: "2025-01-15", description: "إيداع من المتجر" },
      { id: 2, type: "withdraw", amount: 200, date: "2025-01-14", description: "سحب إلى فودافون" },
      { id: 3, type: "purchase", amount: 300, date: "2025-01-13", description: "شراء منتجات" },
    ],
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">محفظتي</h1>

      {/* Balance Card */}
      <Card className="border-slate-700 bg-gradient-to-br from-blue-600 to-blue-800 mb-8">
        <CardContent className="pt-8 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">الرصيد الكلي</p>
              <p className="text-4xl font-bold text-white mt-2">
                {wallet.balance.toLocaleString()} <span className="text-2xl">{wallet.currency}</span>
              </p>
            </div>
            <Wallet size={48} className="text-blue-100" />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Button className="bg-green-600 hover:bg-green-700 text-white gap-2 py-6">
          <Plus size={18} />
          إيداع أموال
        </Button>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white gap-2 py-6">
          <Minus size={18} />
          سحب أموال
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2 py-6">
          <Send size={18} />
          تحويل
        </Button>
      </div>

      {/* Quick Transfer */}
      <Card className="border-slate-700 bg-slate-800 mb-8">
        <CardHeader>
          <CardTitle className="text-white">تحويل سريع</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-slate-200">المحفظة</Label>
            <select className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg p-2">
              <option>فودافون كاش</option>
              <option>أورانج كاش</option>
              <option>إنستا باي</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-200">المبلغ</Label>
            <Input type="number" placeholder="0" className="bg-slate-700 border-slate-600 text-white" />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-200">رقم الهاتف</Label>
            <Input type="tel" placeholder="01000000000" className="bg-slate-700 border-slate-600 text-white" />
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6">تحويل الآن</Button>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader>
          <CardTitle className="text-white">السجل المالي</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {wallet.recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div>
                  <p className="text-white font-semibold">{transaction.description}</p>
                  <p className="text-slate-400 text-sm">{transaction.date}</p>
                </div>
                <span
                  className={`text-lg font-bold ${transaction.type === "deposit" ? "text-green-400" : "text-red-400"}`}
                >
                  {transaction.type === "deposit" ? "+" : "-"}
                  {transaction.amount} EGP
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
