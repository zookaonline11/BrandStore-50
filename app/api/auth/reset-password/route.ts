import { type NextRequest, NextResponse } from "next/server"
import { createServerSideClient } from "@/lib/supabase-server"
import { hashPassword } from "@/lib/auth-utils"

export async function POST(request: NextRequest) {
  try {
    const { email, resetCode, newPassword } = await request.json()

    if (!email || !resetCode || !newPassword) {
      return NextResponse.json({ error: "جميع الحقول مطلوبة" }, { status: 400 })
    }

    const supabase = await createServerSideClient()

    // Find admin
    const { data: admin } = await supabase.from("admins").select("id").eq("email", email).single()

    if (!admin) {
      return NextResponse.json({ error: "البريد الإلكتروني غير موجود" }, { status: 404 })
    }

    // Verify reset token
    const { data: tokenData } = await supabase
      .from("password_reset_tokens")
      .select("*")
      .eq("token", resetCode)
      .eq("admin_id", admin.id)
      .eq("used", false)
      .single()

    if (!tokenData || new Date(tokenData.expires_at) < new Date()) {
      return NextResponse.json({ error: "الرمز غير صالح أو منتهي الصلاحية" }, { status: 400 })
    }

    // Hash new password
    const passwordHash = await hashPassword(newPassword)

    // Update admin password
    await supabase.from("admins").update({ password_hash: passwordHash }).eq("id", admin.id)

    // Mark token as used
    await supabase.from("password_reset_tokens").update({ used: true }).eq("id", tokenData.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json({ error: "حدث خطأ في الخادم" }, { status: 500 })
  }
}
