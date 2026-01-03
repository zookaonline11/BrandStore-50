import { type NextRequest, NextResponse } from "next/server"
import { createServerSideClient } from "@/lib/supabase-server"
import { generateResetToken, sendPasswordResetEmail } from "@/lib/auth-utils"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "البريد الإلكتروني مطلوب" }, { status: 400 })
    }

    const supabase = await createServerSideClient()

    // Check if admin exists
    const { data: admin } = await supabase.from("admins").select("id").eq("email", email).single()

    if (!admin) {
      // Don't reveal if email exists for security
      return NextResponse.json({ success: true })
    }

    // Generate reset token
    const resetToken = generateResetToken()
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

    // Save token to database
    await supabase.from("password_reset_tokens").insert({
      admin_id: admin.id,
      token: resetToken,
      expires_at: expiresAt,
    })

    // Send email
    await sendPasswordResetEmail(email, resetToken)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Reset request error:", error)
    return NextResponse.json({ error: "حدث خطأ في الخادم" }, { status: 500 })
  }
}
