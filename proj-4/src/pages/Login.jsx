import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function AuthModal({ isOpen = true, onClose, onLoginSuccess }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = Login/Signup, 2 = Create Account
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [password, setPassword] = useState(''); // 🔑 كلمة السر
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Form state for Step 2
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    optOutPromotions: false
  });

  if (!isOpen) return null;

  // 1️⃣ الخطوة الأولى: محاولة تسجيل الدخول أو الانتقال لإنشاء حساب
  const handleContinueStep1 = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (phoneOrEmail.trim() !== '') {
      if (!password) {
        setErrorMessage('الرجاء إدخال كلمة السر للاستمرار');
        return;
      }

      setLoading(true);
      try {
        const res = await API.post('/auth/login', {
          email: phoneOrEmail,
          password: password,
        });

        if (res.data.access_token) {
          localStorage.setItem('token', res.data.access_token);
        }
        
        if (onLoginSuccess) onLoginSuccess();
        if (onClose) onClose();
        navigate('/');
      } catch (err) {
        if (phoneOrEmail.includes('@')) {
          setFormData((prev) => ({ ...prev, email: phoneOrEmail }));
        }
        setStep(2);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 2️⃣ الخطوة الثانية: إنشاء حساب جديد حقيقي في NestJS
  const handleCreateAccountSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const payload = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      password: password || '12345678',
    };

    try {
      let res;
      try {
        res = await API.post('/auth/register', payload);
      } catch (registerErr) {
        // تجربة مسار signup البديل في حال كان المعرف مفضلاً في السيرفر
        res = await API.post('/auth/signup', payload);
      }

      if (res?.data?.access_token) {
        localStorage.setItem('token', res.data.access_token);
      }

      alert('تم إنشاء الحساب بنجاح!');

      if (onLoginSuccess) onLoginSuccess();
      if (onClose) onClose();
      navigate('/');
    } catch (err) {
      console.error('NestJS Registration Error Details:', err.response?.data);
      const msg = err.response?.data?.message;
      setErrorMessage(Array.isArray(msg) ? msg.join(', ') : msg || 'حدث خطأ أثناء إنشاء الحساب.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative max-h-[90vh] w-full max-w-[520px] overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">
        
        {/* Navigation Header */}
        <div className="mb-6 flex items-center justify-between">
          {step === 2 ? (
            <button
              onClick={() => setStep(1)}
              className="rounded-full p-2 text-gray-700 hover:bg-gray-100"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : <div />}

          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* عرض رسالة الخطأ إن وجدت */}
        {errorMessage && (
          <div className="mb-4 rounded-xl bg-red-50 p-3 text-center text-xs font-semibold text-red-600 border border-red-200">
            {errorMessage}
          </div>
        )}

        {/* --- STEP 1: LOG IN OR SIGN UP --- */}
        {step === 1 && (
          <div>
            <div className="flex justify-center pb-4">
              <svg className="h-10 w-10 text-[#FF385C]" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.011.315c0 4.408-3.6 8-8 8-2.423 0-4.632-1.082-6.136-2.825L16 28.783l-.364.416C14.132 30.918 11.923 32 9.5 32 5.092 32 1.5 28.408 1.5 24c0-.924.243-1.805.91-3.396l.145-.353c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C11.474 1.963 12.929 1 14.937 1H16zm0 2h-1.063c-1.31 0-2.26.657-3.23 2.396l-.427.822c-1.87 3.666-5.938 12.18-6.85 14.305l-.105.257c-.524 1.25-.725 1.928-.725 2.22 0 3.314 2.686 6 6 6 1.83 0 3.513-.82 4.654-2.187l.746-.893.746.893C16.837 28.18 18.52 29 20.35 29c3.314 0 6-2.686 6-6 0-.292-.201-.97-.725-2.22l-.105-.257c-.912-2.125-4.98-10.639-6.85-14.305l-.427-.822C17.277 3.657 16.327 3 15.017 3H16z" />
              </svg>
            </div>

            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
              Log in or sign up
            </h2>

            <form onSubmit={handleContinueStep1}>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Phone number or email"
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-400 p-4 text-base focus:border-black focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-400 p-4 text-base focus:border-black focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mb-6 w-full rounded-xl bg-[#E81948] py-3.5 text-base font-semibold text-white transition hover:bg-[#D70466] disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Processing...' : 'Continue'}
              </button>
            </form>

            <div className="relative mb-6 flex items-center justify-center">
              <div className="w-full border-t border-gray-300"></div>
              <span className="absolute bg-white px-4 text-sm text-gray-500">or</span>
            </div>

            <div className="flex justify-center gap-4">
              <button className="flex h-14 w-20 items-center justify-center rounded-2xl border border-gray-300 hover:border-black">
                <svg className="h-6 w-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </button>

              <button className="flex h-14 w-20 items-center justify-center rounded-2xl border border-gray-300 hover:border-black">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.12-1.92.99-3.04-1 .04-2.17.67-2.88 1.49-.64.73-1.2 1.88-1.05 2.99 1.12.09 2.28-.62 2.94-1.44" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* --- STEP 2: CREATE YOUR ACCOUNT --- */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Let’s create your account</h2>
            <p className="mb-6 text-sm text-gray-500">This information is required to book or host.</p>

            <form onSubmit={handleCreateAccountSubmit}>
              
              {/* Legal Name */}
              <div className="mb-4">
                <label className="mb-1.5 block text-sm font-semibold text-gray-900">
                  Legal name
                </label>
                <div className="rounded-xl border border-gray-400 overflow-hidden">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full border-b border-gray-300 p-3.5 text-sm focus:bg-gray-50 focus:outline-none"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3.5 text-sm focus:bg-gray-50 focus:outline-none"
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div className="mb-4">
                <label className="mb-1.5 block text-sm font-semibold text-gray-900">
                  Date of birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-xl border border-gray-400 p-3.5 text-sm text-gray-700 focus:border-black focus:outline-none"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="mb-1.5 block text-sm font-semibold text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-xl border border-gray-400 p-3.5 text-sm focus:border-black focus:outline-none"
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="mb-1.5 block text-sm font-semibold text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-400 p-3.5 text-sm focus:border-black focus:outline-none"
                />
              </div>

              {/* Promotions Box */}
              <div className="mb-6 rounded-2xl bg-gray-50 p-4">
                <p className="mb-3 text-xs text-gray-600 leading-relaxed">
                  Airbnb will send you promotions such as deals and marketing notifications. You can opt out anytime via account settings or within marketing emails.
                </p>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-normal text-gray-800">
                    I don’t want to receive Airbnb promotions.
                  </span>
                  <input
                    type="checkbox"
                    name="optOutPromotions"
                    checked={formData.optOutPromotions}
                    onChange={handleInputChange}
                    className="h-5 w-5 rounded border-gray-300 accent-black"
                  />
                </label>
              </div>

              {/* Agree and Continue Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#E81948] py-3.5 text-base font-semibold text-white transition hover:bg-[#D70466] disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Creating account...' : 'Agree and continue'}
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}