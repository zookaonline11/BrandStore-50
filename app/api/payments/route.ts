import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { type, amount, service, reference, phone } = await request.json()

  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll() {},
      },
    })

    // Get user from session
    const userId = cookieStore.get("userId")?.value

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Create transaction record
    const { data: transaction, error } = await supabase
      .from("transactions")
      .insert({
        user_id: userId,
        type,
        amount,
        service,
        reference,
        payment_method: phone, // Changed from phone_number to payment_method to match schema
        status: "pending",
      })
      .select()
      .single()

    if (error) {
      console.error("Transaction creation error:", error)
      return NextResponse.json({ error: "Failed to create transaction" }, { status: 400 })
    }

    // Send notification to admin
    const { error: notifError } = await supabase.from("notifications").insert({
      user_id: userId,
      title: `طلب ${type === "recharge" ? "شحن" : "تحويل"} جديد`,
      message: `طلب ${type === "recharge" ? "شحن" : "تحويل"} بقيمة ${amount} EGP`,
      type: "transaction",
      related_id: transaction.id,
      is_read: false,
    })

    return NextResponse.json({
      success: true,
      transactionId: transaction.id,
      message: "تم تسجيل الطلب بنجاح. سيتم المراجعة من قبل الفريق.",
    })
  } catch (error) {
    console.error("Payment error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
