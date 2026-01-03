import { type NextRequest, NextResponse } from "next/server"
import { createServerSideClient } from "@/lib/supabase-server"
import { comparePasswords } from "@/lib/auth-utils"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "البريد الإلكتروني وكلمة المرور مطلوبة" }, { status: 400 })
    }

    const supabase = await createServerSideClient()

    // Get admin from database
    const { data: admin, error } = await supabase.from("admins").select("*").eq("email", email).single()

    if (error || !admin) {
      return NextResponse.json({ error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" }, { status: 401 })
    }

    // Check password
    const passwordMatch = await comparePasswords(password, admin.password_hash)
    if (!passwordMatch) {
      return NextResponse.json({ error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" }, { status: 401 })
    }

    // Update last login
    await supabase.from("admins").update({ last_login: new Date().toISOString() }).eq("id", admin.id)

    // Return admin data (without password)
    const { password_hash, ...adminData } = admin
    return NextResponse.json({
      success: true,
      admin: adminData,
      token: admin.id, // In production, generate a proper JWT
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "حدث خطأ في الخادم" }, { status: 500 })
  }
}
