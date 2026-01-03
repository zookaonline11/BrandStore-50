export async function sendPasswordResetEmail(email: string, resetCode: string) {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        subject: "رمز إعادة تعيين كلمة المرور",
        template: "password-reset",
        data: { resetCode },
      }),
    })

    return response.ok
  } catch (error) {
    console.error("Email error:", error)
    return false
  }
}

export async function sendVerificationEmail(email: string, verificationCode: string) {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        subject: "تأكيد بريدك الإلكتروني",
        template: "email-verification",
        data: { verificationCode },
      }),
    })

    return response.ok
  } catch (error) {
    console.error("Email error:", error)
    return false
  }
}

export async function sendNotificationEmail(email: string, subject: string, message: string) {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        subject,
        template: "notification",
        data: { message },
      }),
    })

    return response.ok
  } catch (error) {
    console.error("Email error:", error)
    return false
  }
}
