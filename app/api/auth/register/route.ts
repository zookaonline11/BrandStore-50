import { type NextRequest, NextResponse } from "next/server"
import { createServerSideClient } from "@/lib/supabase-server"
import { hashPassword } from "@/lib/auth-utils"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const fullName = formData.get("fullName") as string
    const nickname = formData.get("nickname") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const profileImage = formData.get("profileImage") as File
    const idFront = formData.get("idFront") as File
    const idBack = formData.get("idBack") as File

    if (!fullName || !nickname || !email || !phone) {
      return NextResponse.json({ error: "جميع الحقول مطلوبة" }, { status: 400 })
    }

    const supabase = await createServerSideClient()

    // Check if email or phone already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .or(`email.eq.${email},phone.eq.${phone}`)
      .single()

    if (existingUser) {
      return NextResponse.json({ error: "البريد الإلكتروني أو رقم الهاتف موجود بالفعل" }, { status: 400 })
    }

    // TODO: Upload images to Supabase Storage
    // For now, we'll use placeholder URLs
    const profileImageUrl = `/uploads/profile/${Date.now()}_profile.jpg`
    const idFrontUrl = `/uploads/id/${Date.now()}_front.jpg`
    const idBackUrl = `/uploads/id/${Date.now()}_back.jpg`

    // Create temporary password (user will need to set it on first login)
    const tempPassword = Math.random().toString(36).substring(2, 10)
    const passwordHash = await hashPassword(tempPassword)

    // Insert user
    const { data: newUser, error } = await supabase
      .from("users")
      .insert({
        full_name: fullName,
        nickname,
        email,
        phone,
        password_hash: passwordHash,
        profile_image_url: profileImageUrl,
        id_front_image_url: idFrontUrl,
        id_back_image_url: idBackUrl,
        terms_accepted: true,
        is_verified: false, // Will be verified by admin
      })
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "فشل إنشاء الحساب" }, { status: 500 })
    }

    // Create wallet for user
    await supabase.from("user_wallets").insert({
      user_id: newUser.id,
      balance: 0,
    })

    // Create user settings
    await supabase.from("user_settings").insert({
      user_id: newUser.id,
    })

    // Send verification notification to admin
    await supabase.from("notifications").insert({
      admin_id: null, // Will be assigned to all admins
      title: "تسجيل مستخدم جديد ينتظر التحقق",
      message: `${fullName} قام بالتسجيل ويحتاج التحقق من البيانات`,
      type: "system",
      related_id: newUser.id,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "حدث خطأ في الخادم" }, { status: 500 })
  }
}
