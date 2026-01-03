-- Insert Admin Users
INSERT INTO admins (email, password_hash, full_name, nickname, phone)
VALUES 
  ('shahermagdee@gmail.com', '$2b$10$YourHashedPasswordForShaher', 'شاهر مجدي', 'شاهر', '01010452456'),
  ('shahermagdee@gmail.com', '$2b$10$YourHashedPasswordForMostafa', 'مصطفي محمد', 'مصطفي', '01274790388')
ON CONFLICT (email) DO NOTHING;

-- Note: الكود أعلاه سيحتاج إلى تحديث بعد إنشاء البيانات
-- يجب تشفير كلمات المرور باستخدام bcrypt قبل الإدراج
