# Brand Store - دليل النشر والتثبيت

## متطلبات النشر

- Node.js 18+
- npm أو yarn
- حساب Supabase
- حساب Vercel (اختياري للنشر السحابي)

## خطوات النشر المحلية

### 1. الاستنساخ والتثبيت
```bash
git clone <repository-url>
cd brand-store
npm install
```

### 2. متغيرات البيئة
أنشئ ملف `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
POSTGRES_URL=your_postgres_url
POSTGRES_PRISMA_URL=your_prisma_url
```

### 3. إعداد قاعدة البيانات
```bash
# تشغيل سكريبت إنشاء الجداول
# في Supabase SQL Editor، قم بتشغيل:
# scripts/01_create_schema.sql
```

### 4. التشغيل المحلي
```bash
npm run dev
```

الآن متاح على: http://localhost:3000

### 5. البناء للإنتاج
```bash
npm run build
npm start
```

## نشر على Vercel

### 1. ربط المستودع
```bash
vercel link
```

### 2. تعيين متغيرات البيئة
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
```

### 3. النشر
```bash
vercel deploy --prod
```

## البيانات الافتراضية

بعد الإعداد، يمكنك تسجيل الدخول باستخدام:

**المسؤول الأول:**
- البريد: shahermagdee@gmail.com
- كلمة المرور: #Agehn444

**المسؤول الثاني:**
- البريد: shahermagdee@gmail.com
- كلمة المرور: @158Afbsh

## استكشاف الأخطاء

### خطأ الاتصال بـ Supabase
تأكد من:
- صحة متغيرات البيئة
- نشاط مشروع Supabase
- الاتصال بالإنترنت

### خطأ في قاعدة البيانات
تأكد من:
- تشغيل سكريبت إنشاء الجداول
- أن جميع الجداول مُنشأة بشكل صحيح

### مشاكل الأداء
- تأكد من استخدام الفهارس
- حقق معلومات الاستعلامات
- استخدم أدوات مراقبة Supabase

## الدعم والمساعدة

للحصول على الدعم:
- البريد: shahermagdee@gmail.com
- الهاتف: 01274790388
