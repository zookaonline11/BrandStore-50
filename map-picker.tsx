"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface MapPickerProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void
}

export function MapPicker({ onLocationSelect }: MapPickerProps) {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; address: string } | null>(null)

  // Simulate map picker - in production, integrate with Google Maps API
  const handleSelectLocation = () => {
    // Default location (Cairo, Egypt)
    const mockLocation = {
      lat: 30.0444,
      lng: 31.2357,
      address: "القاهرة - مصر",
    }
    setSelectedLocation(mockLocation)
    onLocationSelect(mockLocation.lat, mockLocation.lng, mockLocation.address)
  }

  return (
    <div className="space-y-4">
      <div className="w-full h-64 bg-slate-700 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-600">
        {selectedLocation ? (
          <div className="text-center">
            <p className="text-white font-semibold">الموقع المختار</p>
            <p className="text-slate-400 text-sm mt-2">{selectedLocation.address}</p>
            <p className="text-slate-400 text-xs mt-1">
              {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
            </p>
          </div>
        ) : (
          <span className="text-slate-400">اضغط لاختيار موقع على الخريطة</span>
        )}
      </div>
      <Button onClick={handleSelectLocation} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
        اختر الموقع
      </Button>
    </div>
  )
}
