"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Star, Search } from "lucide-react"

export default function StorePage() {
  const [cartCount, setCartCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")

  const products = [
    {
      id: 1,
      name: "وصلة شاحن USB-C",
      price: 50,
      rating: 4.5,
      reviews: 128,
      image: "/usb-cable.png",
      category: "الملحقات",
    },
    {
      id: 2,
      name: "سماعات AirPods",
      price: 800,
      rating: 4.8,
      reviews: 456,
      image: "/airpods-headphones.jpg",
      category: "السماعات",
    },
    {
      id: 3,
      name: "جراب هاتف جلدي",
      price: 120,
      rating: 4.3,
      reviews: 85,
      image: "/phone-case-leather.jpg",
      category: "الحماية",
    },
    {
      id: 4,
      name: "فلاش درايف 64GB",
      price: 150,
      rating: 4.6,
      reviews: 201,
      image: "/usb-flash-drive.jpg",
      category: "التخزين",
    },
    {
      id: 5,
      name: "واقي شاشة زجاجي",
      price: 80,
      rating: 4.4,
      reviews: 312,
      image: "/screen-protector.png",
      category: "الحماية",
    },
    {
      id: 6,
      name: "شاحن سريع 65W",
      price: 250,
      rating: 4.7,
      reviews: 189,
      image: "/fast-charger.jpg",
      category: "الشحن",
    },
  ]

  const filteredProducts = products.filter(
    (p) => p.name.includes(searchTerm) || p.category.includes(searchTerm) || p.price.toString().includes(searchTerm),
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">متجر Brand Store</h1>
          <p className="text-slate-400 mt-1">أحدث الملحقات والمنتجات الإلكترونية</p>
        </div>
        <div className="relative">
          <ShoppingCart size={24} className="text-white" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="mb-8 relative">
        <Search className="absolute left-3 top-3 text-slate-400" size={20} />
        <Input
          placeholder="ابحث عن منتج..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 pl-10"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="border-slate-700 bg-slate-800 overflow-hidden hover:border-blue-500 transition"
          >
            <div className="aspect-square bg-slate-700 overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition"
              />
            </div>
            <CardContent className="pt-4">
              <p className="text-slate-400 text-sm">{product.category}</p>
              <h3 className="text-white font-semibold mt-1">{product.name}</h3>

              <div className="flex items-center gap-1 mt-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-600"}
                    />
                  ))}
                </div>
                <span className="text-slate-400 text-sm ml-2">
                  {product.rating} ({product.reviews})
                </span>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold text-white">{product.price} EGP</span>
                <Button
                  size="sm"
                  onClick={() => setCartCount(cartCount + 1)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  أضف للسلة
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">لم نجد منتجات مطابقة</p>
        </div>
      )}
    </div>
  )
}
