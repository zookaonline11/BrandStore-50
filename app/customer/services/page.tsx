"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smartphone, Wallet, Zap, CreditCard, FileText } from "lucide-react"

export default function ServicesPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [visaCardState, setVisaCardState] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    amount: "",
    transactionType: "credit",
    fullName: "",
    phone: "",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // محاكاة معالجة الطلب
    await new Promise((r) => setTimeout(r, 1000))
    setIsLoading(false)
    alert("تم إرسال طلبك بنجاح! سيتم معالجته قريباً")
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">الخدمات المالية</h1>
      <p className="text-muted-foreground mb-8">اختر الخدمة المناسبة لك</p>

      <Tabs defaultValue="recharge" className="space-y-6">
        <TabsList className="bg-card border border-border grid w-full grid-cols-5">
          <TabsTrigger
            value="recharge"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Smartphone size={18} className="mr-2" /> شحن الرصيد
          </TabsTrigger>
          <TabsTrigger
            value="wallet"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Wallet size={18} className="mr-2" /> المحافظ
          </TabsTrigger>
          <TabsTrigger
            value="deposit"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Zap size={18} className="mr-2" /> إيداع أموال
          </TabsTrigger>
          <TabsTrigger
            value="visa"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <CreditCard size={18} className="mr-2" /> الفيزا
          </TabsTrigger>
          <TabsTrigger
            value="bills"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <FileText size={18} className="mr-2" /> الفواتير
          </TabsTrigger>
        </TabsList>

        {/* Recharge Service */}
        <TabsContent value="recharge">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">شحن الرصيد</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label className="text-foreground text-sm font-medium mb-2 block">اختر المشغل</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["أورانج", "فودافون", "اتصالات", "وي"].map((operator) => (
                      <Button
                        key={operator}
                        type="button"
                        variant="outline"
                        className="border-border text-foreground hover:bg-primary/10 bg-transparent"
                      >
                        {operator}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground text-sm font-medium">
                    رقم الهاتف
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="01000000000"
                    className="bg-input border-border text-foreground placeholder-muted-foreground"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-foreground text-sm font-medium">
                    المبلغ
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="100"
                    className="bg-input border-border text-foreground placeholder-muted-foreground"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="package" className="text-foreground text-sm font-medium">
                    الباقة
                  </Label>
                  <select className="w-full bg-input border border-border text-foreground rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>احسن ناس</option>
                    <option>اقوي كارت</option>
                    <option>فودافون فكه</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-11"
                >
                  {isLoading ? "جاري المعالجة..." : "تنفيذ الشحن"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Wallet Service */}
        <TabsContent value="wallet">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">تحويل للمحفظة الإلكترونية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label className="text-foreground text-sm font-medium mb-3 block">اختر المحفظة</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {["فودافون كاش", "أورانج كاش", "إنستا باي"].map((wallet) => (
                      <Button
                        key={wallet}
                        type="button"
                        variant="outline"
                        className="border-border text-foreground hover:bg-primary/10 bg-transparent"
                      >
                        {wallet}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wallet-phone" className="text-foreground text-sm font-medium">
                    رقم الهاتف
                  </Label>
                  <Input
                    id="wallet-phone"
                    type="tel"
                    placeholder="01000000000"
                    className="bg-input border-border text-foreground placeholder-muted-foreground"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wallet-amount" className="text-foreground text-sm font-medium">
                    المبلغ
                  </Label>
                  <Input
                    id="wallet-amount"
                    type="number"
                    placeholder="500"
                    className="bg-input border-border text-foreground placeholder-muted-foreground"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-11"
                >
                  {isLoading ? "جاري المعالجة..." : "إرسال الأموال"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Deposit Service */}
        <TabsContent value="deposit">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">إيداع أموال</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="deposit-id" className="text-foreground text-sm font-medium">
                    رقم الإيداع / ID
                  </Label>
                  <Input
                    id="deposit-id"
                    type="text"
                    placeholder="3768551"
                    className="bg-input border-border text-foreground placeholder-muted-foreground"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deposit-amount" className="text-foreground text-sm font-medium">
                    المبلغ
                  </Label>
                  <Input
                    id="deposit-amount"
                    type="number"
                    placeholder="1000"
                    className="bg-input border-border text-foreground placeholder-muted-foreground"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-11"
                >
                  {isLoading ? "جاري المعالجة..." : "إرسال الطلب"}
                </Button>
              </form>

              <div className="p-4 bg-primary/15 border border-primary/30 rounded-lg text-primary text-sm">
                <p className="font-medium mb-2">ملاحظة مهمة:</p>
                <p>ستصل رسالة لصاحب المتجر بتفاصيل طلبك. سيتم تأكيد العملية بعد التنفيذ مباشرة.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Visa Service */}
        <TabsContent value="visa">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">طلب فيزا</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="visa-fullname" className="text-foreground text-sm font-medium">
                    الاسم الكامل
                  </Label>
                  <Input
                    id="visa-fullname"
                    type="text"
                    placeholder="أحمد محمد علي حسن"
                    value={visaCardState.fullName}
                    onChange={(e) => setVisaCardState({ ...visaCardState, fullName: e.target.value })}
                    className="bg-input border-border text-foreground placeholder-muted-foreground"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visa-phone" className="text-foreground text-sm font-medium">
                    رقم الهاتف
                  </Label>
                  <Input
                    id="visa-phone"
                    type="tel"
                    placeholder="01000000000"
                    value={visaCardState.phone}
                    onChange={(e) => setVisaCardState({ ...visaCardState, phone: e.target.value })}
                    className="bg-input border-border text-foreground placeholder-muted-foreground"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground text-sm font-medium mb-3 block">نوع الفيزا</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant={visaCardState.transactionType === "credit" ? "default" : "outline"}
                      onClick={() => setVisaCardState({ ...visaCardState, transactionType: "credit" })}
                      className="border-border"
                    >
                      ائتمان
                    </Button>
                    <Button
                      type="button"
                      variant={visaCardState.transactionType === "debit" ? "default" : "outline"}
                      onClick={() => setVisaCardState({ ...visaCardState, transactionType: "debit" })}
                      className="border-border"
                    >
                      خصم
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visa-amount" className="text-foreground text-sm font-medium">
                    المبلغ المطلوب
                  </Label>
                  <Input
                    id="visa-amount"
                    type="number"
                    placeholder="500"
                    value={visaCardState.amount}
                    onChange={(e) => setVisaCardState({ ...visaCardState, amount: e.target.value })}
                    className="bg-input border-border text-foreground placeholder-muted-foreground"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visa-notes" className="text-foreground text-sm font-medium">
                    ملاحظات (اختياري)
                  </Label>
                  <textarea
                    id="visa-notes"
                    placeholder="أضف أي ملاحظات إضافية..."
                    rows={3}
                    value={visaCardState.notes}
                    onChange={(e) => setVisaCardState({ ...visaCardState, notes: e.target.value })}
                    className="w-full bg-input border border-border text-foreground placeholder-muted-foreground rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="p-4 bg-primary/15 border border-primary/30 rounded-lg text-primary text-sm">
                  <p className="font-medium mb-2">ملاحظة مهمة:</p>
                  <p>سيتم إرسال طلبك إلى المسؤول للمراجعة. لن يتم خصم المبلغ من حسابك حتى تتم الموافقة على الطلب.</p>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !visaCardState.amount}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-11"
                >
                  {isLoading ? "جاري الإرسال..." : "إرسال طلب الفيزا"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bills Service */}
        <TabsContent value="bills">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">دفع الفواتير</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label className="text-foreground text-sm font-medium mb-3 block">نوع الفاتورة</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {["كهرباء", "مياه", "غاز", "أرضي", "انترنت منزلي"].map((bill) => (
                      <Button
                        key={bill}
                        type="button"
                        variant="outline"
                        className="border-border text-foreground hover:bg-primary/10 bg-transparent"
                      >
                        {bill}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bill-account" className="text-foreground text-sm font-medium">
                    رقم الحساب / المتر
                  </Label>
                  <Input
                    id="bill-account"
                    type="text"
                    placeholder="أدخل رقم الحساب أو المتر"
                    className="bg-input border-border text-foreground placeholder-muted-foreground"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bill-amount" className="text-foreground text-sm font-medium">
                    المبلغ المستحق
                  </Label>
                  <Input
                    id="bill-amount"
                    type="number"
                    placeholder="0.00"
                    className="bg-input border-border text-foreground placeholder-muted-foreground"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-11"
                >
                  {isLoading ? "جاري المعالجة..." : "دفع الفاتورة"}
                </Button>
              </form>

              <div className="p-4 bg-primary/15 border border-primary/30 rounded-lg text-primary text-sm">
                <p className="font-medium mb-2">الفواتير المتاحة:</p>
                <ul className="space-y-1 text-xs">
                  <li>⚡ كهرباء</li>
                  <li>💧 مياه</li>
                  <li>🔥 غاز</li>
                  <li>☎️ أرضي</li>
                  <li>🌐 انترنت منزلي</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
