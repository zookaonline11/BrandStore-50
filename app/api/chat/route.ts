import { generateText } from "ai"

const USE_MOCK_MODE = true // Set to false when AI Gateway is configured with credit card
const KNOWLEDGE_BASE = {
  greeting: "مرحباً بك في Brand Store! كيف يمكنني مساعدتك؟",
  default: "شكراً لسؤالك! يمكنك التواصل مع فريق الدعم عبر الواتساب على 01274790388",
  registration:
    "لإنشاء حساب جديد، اذهب إلى صفحة التسجيل وأدخل بيانات مثل اسمك وبريدك الإلكتروني ورقم هاتفك. بعدها ستتمكن من تسجيل الدخول والبدء بالبيع.",
  services: "نحن نقدم: خدمة الشحن المتقدمة، المحافظ الإلكترونية، المتجر الإلكتروني، نظام التحصيل، وإدارة المخزون.",
  contact: "عنواننا: بورسعيد، شارع محمد علي والنصر | الواتساب: 01274790388 | البريد: shahermagdee@gmail.com",
  shipping: "خدمة الشحن توفر تتبعاً فورياً للطلبات وتسليماً آمناً. يمكنك إدارة جميع شحناتك من لوحة التحكم.",
  payment: "نقبل الدفع عند الاستلام والمحافظ الإلكترونية. اختر الطريقة المناسبة أثناء الشراء.",
}

function getMockResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("مرحبا") || lowerMessage.includes("السلام")) {
    return KNOWLEDGE_BASE.greeting
  }
  if (lowerMessage.includes("تسجيل") || lowerMessage.includes("حساب") || lowerMessage.includes("حساب جديد")) {
    return KNOWLEDGE_BASE.registration
  }
  if (lowerMessage.includes("خدمات") || lowerMessage.includes("نقدم") || lowerMessage.includes("ماذا")) {
    return KNOWLEDGE_BASE.services
  }
  if (
    lowerMessage.includes("اتصال") ||
    lowerMessage.includes("عنوان") ||
    lowerMessage.includes("واتساب") ||
    lowerMessage.includes("بريد")
  ) {
    return KNOWLEDGE_BASE.contact
  }
  if (lowerMessage.includes("شحن") || lowerMessage.includes("طلب") || lowerMessage.includes("تتبع")) {
    return KNOWLEDGE_BASE.shipping
  }
  if (lowerMessage.includes("دفع") || lowerMessage.includes("دفع") || lowerMessage.includes("الدفع")) {
    return KNOWLEDGE_BASE.payment
  }

  return KNOWLEDGE_BASE.default
}

export async function POST(req: Request) {
  const { message } = await req.json()

  try {
    if (USE_MOCK_MODE) {
      const mockResponse = getMockResponse(message)
      return Response.json({ response: mockResponse })
    }

    // Original AI-powered response (requires credit card on Vercel)
    const systemPrompt = `أنت بوت دعم ذكي في تطبيق Brand Store. تتحدث باللغة العربية بطريقة احترافية وودية وسهلة الفهم.

معلومات الشركة والتطبيق:
- اسم التطبيق: Brand Store
- الوصف: نظام متكامل لإدارة عمليات الشحن والمتاجر الإلكترونية والتحصيل
- المقر الرئيسي: بورسعيد، شارع محمد علي والنصر
- رقم الواتساب: 01274790388
- البريد الإلكتروني: shahermagdee@gmail.com

الخدمات الرئيسية:
1. خدمة الشحن المتقدمة - تتبع الطلبات في الوقت الفعلي
2. المحافظ الإلكترونية - دفع آمن وسريع
3. المتجر الإلكتروني - عرض وبيع المنتجات
4. نظام التحصيل - إدارة الفواتير والمبيعات
5. إدارة المخزون - تتبع المنتجات

كيفية مساعدة المستخدمين:
- إذا سأل عن التسجيل: اشرح خطوات إنشاء حساب جديد أو تسجيل الدخول
- إذا سأل عن الشحن: قدم معلومات عن كيفية عمل خدمة الشحن
- إذا سأل عن الخدمات: اشرح الخدمات المتاحة
- إذا سأل عن الاتصال: قدم البيانات (الواتساب، البريد، العنوان)
- إذا لم تتمكن من الإجابة: أوجه المستخدم للتواصل المباشر

كن ودياً وحاول حل المشاكل بسرعة.`

    const { text } = await generateText({
      model: "openai/gpt-3.5-turbo",
      system: systemPrompt,
      prompt: message,
      maxTokens: 200,
    })

    return Response.json({ response: text })
  } catch (error: any) {
    console.error("[v0] Chat error:", error?.message)

    let errorMessage = "عذراً، حدث خطأ مؤقت. يرجى المحاولة مرة أخرى."

    if (error?.message?.includes("credit card")) {
      errorMessage = "خدمة الدعم الذكي قيد الصيانة حالياً. يرجى التواصل معنا عبر الواتساب: 01274790388"
    }

    return Response.json({ error: errorMessage }, { status: 500 })
  }
}
