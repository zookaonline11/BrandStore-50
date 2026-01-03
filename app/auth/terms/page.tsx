"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/auth/register-user" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
            <ArrowRight size={20} />
            العودة
          </Link>
        </div>

        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="text-white text-3xl">الشروط والأحكام – Brand Store</CardTitle>
            <p className="text-slate-400 text-sm mt-2">آخر تحديث: يناير 2025</p>
          </CardHeader>

          <CardContent className="space-y-6 text-slate-300">
            {/* Section 1 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">1. التعريفات</h2>
              <p>Brand Store: المنصة الإلكترونية المقدمة لعرض وبيع المنتجات والخدمات وإدارة عمليات الشحن والتحصيل.</p>
              <p className="mt-2">المستخدم: أي شخص يقوم بزيارة أو استخدام المنصة.</p>
              <p className="mt-2">التاجر/البائع: الطرف الذي يعرض منتجاته أو خدماته عبر المنصة.</p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">2. القبول والاستخدام</h2>
              <p>
                باستخدامك لمنصة Brand Store، فإنك تقر بموافقتك الكاملة على هذه الشروط والأحكام. إذا لم توافق، يرجى عدم
                استخدام المنصة.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">3. الحسابات والتسجيل</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>يلتزم المستخدم بتقديم بيانات صحيحة ومحدثة (الاسم، رقم الهاتف، الموقع الجغرافي).</li>
                <li>يتحمل المستخدم مسؤولية الحفاظ على سرية بيانات الدخول.</li>
                <li>يحق للإدارة تعليق أو إلغاء أي حساب يخالف الشروط أو يتلاعب بالطلبات.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">4. المنتجات والخدمات</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>يتم عرض المنتجات والخدمات كما يقدمها البائعون.</li>
                <li>لا تضمن Brand Store توافر المنتجات بشكل دائم.</li>
                <li>الأسعار قابلة للتغيير دون إشعار مسبق بناءً على تحديثات السوق.</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">5. الطلبات والدفع</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>يتم تأكيد الطلب بعد مراجعة البيانات وإتمام عملية الدفع أو الاتفاق على وسيلة التحصيل.</li>
                <li>وسائل الدفع المتاحة تشمل المحافظ الإلكترونية أو الدفع عند الاستلام.</li>
                <li>Brand Store غير مسؤولة عن أي أخطاء ناتجة عن مزودي خدمات الدفع الخارجيين.</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">6. الشحن والتسليم</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>تختلف مواعيد التسليم حسب الموقع الجغرافي (GPS) وضغط الطلبات.</li>
                <li>المنصة غير مسؤولة عن التأخير الناتج عن ظروف قهرية أو خارجة عن الإرادة.</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">7. الاسترجاع والاستبدال</h2>
              <p>تخضع عمليات الاسترجاع لسياسة البائع، ويجب فحص المنتج عند الاستلام من المندوب فوراً.</p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">8. الملكية الفكرية</h2>
              <p>جميع المحتويات (نصوص، صور، شعارات) مملوكة لـ Brand Store. يمنع نسخها أو استخدامها تجارياً دون إذن.</p>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">9. الخصوصية</h2>
              <p>يتم استخدام بيانات الموقع والاتصال لغرض إتمام الشحن والتحصيل فقط، وفقاً لمعايير حماية البيانات.</p>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">10. حدود المسؤولية</h2>
              <p>الاستخدام يتم على مسؤولية المستخدم الشخصية، والمنصة وسيط تقني لتنظيم العمليات.</p>
            </div>

            {/* Section 11 - Important */}
            <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4">
              <h2 className="text-xl font-bold text-white mb-3">11. تسوية المديونيات والتحصيلات اليومية</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>الالتزام المالي:</strong> يلتزم أي طرف (تاجر، مندوب، أو مستخدم) تترتب عليه مديونية مالية ناتجة
                  عن عمليات الشحن أو التحصيل بسداد المبالغ المستحقة بالكامل.
                </li>
                <li>
                  <strong>الموعد النهائي:</strong> يجب تسوية كافة المديونيات في نهاية يوم العمل بحد أقصى.
                </li>
                <li>
                  <strong>الإجراءات القانونية:</strong> في حال التأخر عن السداد بعد نهاية اليوم، يحق لإدارة Brand Store
                  اتخاذ إجراءات قانونية لضمان تحصيل المستحقات.
                </li>
              </ul>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-slate-700">
              <Link href="/auth/register-user">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">العودة إلى التسجيل</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
