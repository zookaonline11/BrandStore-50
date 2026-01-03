// Simple real-time notification system using Supabase Realtime
import { createBrowserClient } from "@supabase/ssr"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export function createRealtimeClient() {
  return createBrowserClient(supabaseUrl!, supabaseAnonKey!)
}

export function subscribeToNotifications(userId: string, callback: (notification: any) => void) {
  const supabase = createRealtimeClient()

  const subscription = supabase
    .channel(`notifications:${userId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "notifications",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        callback(payload.new)
      },
    )
    .subscribe()

  return subscription
}

export function subscribeToOrderUpdates(orderId: string, callback: (order: any) => void) {
  const supabase = createRealtimeClient()

  const subscription = supabase
    .channel(`orders:${orderId}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "orders",
        filter: `id=eq.${orderId}`,
      },
      (payload) => {
        callback(payload.new)
      },
    )
    .subscribe()

  return subscription
}
