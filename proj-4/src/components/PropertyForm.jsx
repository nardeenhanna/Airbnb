import React, { useState } from 'react';

export default function PropertyForm() {
  const [formData, setFormData] = useState({ title: '', price: '', location: '', description: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
        /*ana m4*/
  return (
    <form className="max-w-xl space-y-4 rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold">تفاصيل العقار الجديد</h3>
      <input name="title" placeholder="عنوان العقار (م فيلا مطلة على البحر)" onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="location" placeholder="الموقع" onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="price" type="number" placeholder="السعر لليلة الواحدة ($)" onChange={handleChange} className="w-full border p-2 rounded" />
      <textarea name="description" placeholder="وصف العقار" onChange={handleChange} className="w-full border p-2 rounded h-24" />
      <button type="button" className="w-full bg-rose-500 text-white p-3 rounded font-bold hover:bg-rose-600">حفظ العقار</button>
    </form>
  );
}