import bcrypt from "bcryptjs"

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function comparePasswords(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function generateResetToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export async function sendPasswordResetEmail(email: string, code: string): Promise<boolean> {
  try {
    // TODO: Integrate with email service (SendGrid, Mailgun, Resend, etc.)
    // For now, just log the code in development
    console.log(`[DEV] Password reset code for ${email}: ${code}`)
    return true
  } catch (error) {
    console.error("Email send error:", error)
    return false
  }
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const PHONE_REGEX = /^(\+20|0)?1[0-9]{9}$/
