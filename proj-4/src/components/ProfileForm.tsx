import React, { useState } from 'react';
import { Camera, Check } from 'lucide-react';

interface ProfileFormProps {
  user?: any;
  onUpdate?: (data: any) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState<any>(user);
  const [saved, setSaved] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-6">تعديل البيانات الشخصية</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Upload Preview */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={formData.avatar}
              alt={formData.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-indigo-100 shadow-sm"
            />
            <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition shadow">
              <Camera size={16} />
              <input type="file" className="hidden" accept="image/*" />
            </label>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{formData.name}</h3>
            <p className="text-xs text-gray-500 mt-1">يدعم صيغ JPG، PNG أو GIF. بحد أقصى 5 ميجابايت.</p>
          </div>
        </div>

        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الاسم بالكامل</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
            />
          </div>
        </div>

        <div className="pt-4 flex items-center gap-4">
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition shadow-sm"
          >
            حفظ التغييرات
          </button>

          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
              <Check size={18} />
              تم الحفظ بنجاح!
            </span>
          )}
        </div>
      </form>
    </div>
  );
};
export default ProfileForm;