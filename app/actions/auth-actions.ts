"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import bcryptjs from "bcryptjs"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

async function getSupabaseServer() {
  const cookieStore = await cookies()
  return createServerClient(supabaseUrl, supabaseServiceKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {}
      },
    },
  })
}

export async function registerAdmin(formData: FormData) {
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const fullName = formData.get("fullName") as string
  const username = formData.get("username") as string
  const password = formData.get("password") as string
  const adminName = formData.get("adminName") as string

  if (!email || !phone || !fullName || !username || !password || !adminName) {
    return { error: "جميع الحقول مطلوبة" }
  }

  try {
    const supabase = await getSupabaseServer()

    // Check if user already exists
    const { data: existingUser } = await supabase.from("users").select("id").eq("email", email).single()

    if (existingUser) {
      return { error: "البريد الإلكتروني مستخدم بالفعل" }
    }

    // Hash password
    const passwordHash = await bcryptjs.hash(password, 10)

    // Create user
    const { data: user, error: userError } = await supabase
      .from("users")
      .insert({
        email,
        phone: phone, // Changed from phone_number to phone
        full_name: fullName,
        username,
        password_hash: passwordHash,
        role: "admin",
        is_verified: false,
        terms_accepted: true,
      })
      .select()
      .single()

    if (userError) {
      console.error("User creation error:", userError)
      return { error: "فشل في إنشاء المستخدم" }
    }

    // Create admin record
    const { error: adminError } = await supabase.from("admins").insert({
      user_id: user.id,
      admin_name: adminName,
      is_active: true,
    })

    if (adminError) {
      console.error("Admin creation error:", adminError)
      return { error: "فشل في إنشاء ملف الإدارة" }
    }

    return { success: true, userId: user.id }
  } catch (error) {
    console.error("Registration error:", error)
    return { error: "حدث خطأ أثناء التسجيل" }
  }
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "البريد والرمز مطلوبان" }
  }

  try {
    const supabase = await getSupabaseServer()

    const { data: user, error } = await supabase.from("users").select("*").eq("email", email).single()

    if (error || !user) {
      return { error: "بريد أو رمز غير صحيح" }
    }

    const passwordMatch = await bcryptjs.compare(password, user.password_hash)
    if (!passwordMatch) {
      return { error: "بريد أو رمز غير صحيح" }
    }

    // Store session
    const cookieStore = await cookies()
    cookieStore.set("userId", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return { success: true, userId: user.id, role: user.role }
  } catch (error) {
    console.error("Login error:", error)
    return { error: "حدث خطأ أثناء تسجيل الدخول" }
  }
}

export async function sendPasswordResetCode(email: string) {
  try {
    const supabase = await getSupabaseServer()

    const { data: user } = await supabase.from("users").select("id").eq("email", email).single()

    if (!user) {
      return { error: "البريد الإلكتروني غير مسجل" }
    }

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes

    await supabase.from("verification_codes").insert({
      email,
      code,
      expires_at: expiresAt.toISOString(),
    })

    // TODO: Send email with code
    console.log(`[DEV] Reset code for ${email}: ${code}`)

    return { success: true }
  } catch (error) {
    console.error("Reset password error:", error)
    return { error: "فشل إرسال رمز إعادة التعيين" }
  }
}

export async function resetPassword(email: string, code: string, newPassword: string) {
  try {
    const supabase = await getSupabaseServer()

    const { data: verificationData } = await supabase
      .from("verification_codes")
      .select("*")
      .eq("email", email)
      .eq("code", code)
      .single()

    if (!verificationData || new Date(verificationData.expires_at) < new Date()) {
      return { error: "الرمز غير صحيح أو منتهي الصلاحية" }
    }

    const passwordHash = await bcryptjs.hash(newPassword, 10)

    await supabase.from("users").update({ password_hash: passwordHash }).eq("email", email)

    await supabase.from("verification_codes").delete().eq("id", verificationData.id)

    return { success: true }
  } catch (error) {
    console.error("Password reset error:", error)
    return { error: "فشل تغيير كلمة المرور" }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("userId")
  redirect("/")
}
