import bcrypt from "bcrypt"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

const SALT_ROUNDS = 10

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function sendPasswordResetEmail(email: string, code: string): Promise<boolean> {
  try {
    // TODO: Integrate with email service (SendGrid, Mailgun, etc.)
    // For now, just log the code
    console.log(`[DEV] Reset code for ${email}: ${code}`)
    return true
  } catch (error) {
    console.error("Email send error:", error)
    return false
  }
}

export async function createSupabaseServer() {
  const cookieStore = await cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Handle cookies in server components
        }
      },
    },
  })
}

export async function getSession() {
  const supabase = await createSupabaseServer()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session
}

export async function getCurrentUser() {
  const supabase = await createSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}
