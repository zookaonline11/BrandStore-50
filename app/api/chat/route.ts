import { generateText } from "ai"

export async function POST(req: Request) {
  const { message, language } = await req.json()

  try {
    const systemPrompt =
      language === "bourseidi"
        ? `أنت بوت دعم في تطبيق Brand Store. تتحدث باللهجة البورسعيدية بطريقة ودية وطبيعية.
           معلومات التطبيق:
           - تطبيق للتجارة الإلكترونية
           - يوفر خدمات الشحن والمحافظ والمتجر
           - رقم التواصل: 01274790388
           - البريد: shahermagdee@gmail.com
           ركز على مساعدة المستخدمين بخصوص الطلبات والشحنات والمنتجات.`
        : `أنت بوت دعم في تطبيق Brand Store. تتحدث باللغة العربية الفصحى بطريقة احترافية وودية.
           معلومات التطبيق:
           - منصة تجارة إلكترونية متقدمة
           - تقدم خدمات الشحن والمحافظ الإلكترونية والمتجر
           - رقم التواصل: 01274790388
           - البريد الإلكتروني: shahermagdee@gmail.com
           ركز على مساعدة العملاء بخصوص طلباتهم وشحناتهم والمنتجات المتاحة.`

    const { text } = await generateText({
      model: "openai/gpt-3.5-turbo",
      system: systemPrompt,
      prompt: message,
      maxTokens: 150,
    })

    return Response.json({ response: text })
  } catch (error) {
    console.error("Chat error:", error)
    return Response.json({ error: "حدث خطأ في الدعم" }, { status: 500 })
  }
}
