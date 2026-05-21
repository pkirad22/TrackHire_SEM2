import React, {
  useState,
  useMemo,
} from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  UserCheck,
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';

export default function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [errors, setErrors] =
    useState({});

  const [formData, setFormData] =
    useState({
      email: '',
      password: '',
    });

  // ─────────────────────────────────────────────
  // LIVE EMAIL VALIDATION
  // ─────────────────────────────────────────────
  const emailValidation =
    useMemo(() => {

      const email =
        formData.email;

      return {
        hasAt:
          email.includes('@'),

        hasDot:
          email.includes('.'),

        valid:
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            email
          ),
      };

    }, [formData.email]);

  // ─────────────────────────────────────────────
  // HANDLE CHANGE
  // ─────────────────────────────────────────────
  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
      general: '',
    }));
  };

  // ─────────────────────────────────────────────
  // VALIDATE FORM
  // ─────────────────────────────────────────────
  const validateForm = () => {

    const newErrors = {};

    if (
      !formData.email.trim()
    ) {

      newErrors.email =
        'Email is required';
    }

    else if (
      !emailValidation.valid
    ) {

      newErrors.email =
        'Please enter a valid email';
    }

    if (
      !formData.password
    ) {

      newErrors.password =
        'Password is required';
    }

    else if (
      formData.password.length < 8
    ) {

      newErrors.password =
        'Password must be at least 8 characters';
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  // ─────────────────────────────────────────────
  // HANDLE SUBMIT
  // ─────────────────────────────────────────────
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (
        !validateForm()
      ) return;

      setIsSubmitting(true);

      try {

        await login(
          formData.email,
          formData.password
        );

        navigate('/');

      } catch (error) {

        setErrors({
          general:
            error.message ||
            'Invalid email or password',
        });

      } finally {

        setIsSubmitting(false);
      }
    };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 flex items-center justify-center p-4 sm:p-6">

      <div className="bg-white w-full max-w-5xl rounded-[32px] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">

        {/* ───────────────────────── LEFT PANEL ───────────────────────── */}

        <div className="lg:w-5/12 bg-[#211f2f] relative overflow-hidden p-8 lg:p-10 text-white flex flex-col justify-between">

          {/* Background Glow */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl"></div>

          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl"></div>

          {/* Branding */}
          <div className="relative z-10">

            <div className="flex items-center gap-3 mb-12">

              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">

                <Briefcase
                  size={28}
                />

              </div>

              <h1 className="text-3xl font-black tracking-tight">
                TrackHire
              </h1>

            </div>

            <div className="space-y-5">

              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm font-semibold">

                <Sparkles
                  size={16}
                  className="text-pink-300"
                />

                Smart Job Tracking

              </div>

              <h2 className="text-4xl font-black leading-tight">

                Welcome
                <br />
                Back 👋

              </h2>

              <p className="text-indigo-100 leading-relaxed text-[15px]">

                Continue tracking your applications,
                interviews, offers and career growth
                in one organized dashboard.

              </p>

            </div>

            {/* FEATURES */}
            <div className="space-y-5 mt-12">

              <div className="flex items-center gap-4">

                <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center">

                  <ShieldCheck
                    size={22}
                    className="text-indigo-200"
                  />

                </div>

                <div>

                  <h4 className="font-bold">
                    Secure Authentication
                  </h4>

                  <p className="text-sm text-indigo-200">
                    Protected login system
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center">

                  <UserCheck
                    size={22}
                    className="text-indigo-200"
                  />

                </div>

                <div>

                  <h4 className="font-bold">
                    Personalized Dashboard
                  </h4>

                  <p className="text-sm text-indigo-200">
                    Track only your applications
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Footer */}
          <div className="relative z-10 text-sm text-indigo-200 mt-10">

            © 2026 TrackHire Inc.

          </div>

        </div>

        {/* ───────────────────────── RIGHT PANEL ───────────────────────── */}

        <div className="lg:w-7/12 p-8 lg:p-12 flex items-center">

          <div className="w-full max-w-md mx-auto">

            {/* Heading */}
            <div className="mb-8">

              <h2 className="text-4xl font-black text-gray-900">
                Login
              </h2>

              <p className="text-gray-500 mt-2">
                Access your TrackHire dashboard.
              </p>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* EMAIL */}
              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <div className="absolute left-0 top-0 h-full w-12 flex items-center justify-center text-gray-400">

                    <Mail size={18} />

                  </div>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full h-14 pl-12 pr-4 rounded-2xl border bg-gray-50 focus:bg-white outline-none transition-all ${
                      errors.email
                        ? 'border-red-400 focus:ring-4 focus:ring-red-100'
                        : 'border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100'
                    }`}
                  />

                </div>

                {/* LIVE EMAIL VALIDATION */}
                {formData.email && (

                  <div className="flex flex-wrap gap-3 mt-3 text-xs">

                    <div className={`flex items-center gap-1 ${
                      emailValidation.hasAt
                        ? 'text-green-600'
                        : 'text-red-500'
                    }`}>

                      {emailValidation.hasAt
                        ? <CheckCircle2 size={14} />
                        : <AlertCircle size={14} />
                      }

                      Contains @

                    </div>

                    <div className={`flex items-center gap-1 ${
                      emailValidation.hasDot
                        ? 'text-green-600'
                        : 'text-red-500'
                    }`}>

                      {emailValidation.hasDot
                        ? <CheckCircle2 size={14} />
                        : <AlertCircle size={14} />
                      }

                      Contains .

                    </div>

                  </div>

                )}

                {errors.email && (

                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">

                    <AlertCircle size={15} />

                    {errors.email}

                  </p>

                )}

              </div>

              {/* PASSWORD */}
              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>

                <div className="relative">

                  <div className="absolute left-0 top-0 h-full w-12 flex items-center justify-center text-gray-400">

                    <Lock size={18} />

                  </div>

                  <input
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className={`w-full h-14 pl-12 pr-12 rounded-2xl border bg-gray-50 focus:bg-white outline-none transition-all ${
                      errors.password
                        ? 'border-red-400 focus:ring-4 focus:ring-red-100'
                        : 'border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100'
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-0 top-0 h-full w-12 flex items-center justify-center text-gray-400 hover:text-gray-700"
                  >

                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}

                  </button>

                </div>

                {errors.password && (

                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">

                    <AlertCircle size={15} />

                    {errors.password}

                  </p>

                )}

              </div>

              {/* REMEMBER */}
              <div className="flex items-center justify-between">

                <label className="flex items-center gap-2 cursor-pointer">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() =>
                      setRememberMe(
                        !rememberMe
                      )
                    }
                    className="accent-indigo-600 h-4 w-4"
                  />

                  <span className="text-sm text-gray-600">
                    Remember me
                  </span>

                </label>

                <button
                  type="button"
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                  Forgot Password?
                </button>

              </div>

              {/* GENERAL ERROR */}
              {errors.general && (

                <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl text-sm flex items-center gap-2">

                  <AlertCircle size={16} />

                  {errors.general}

                </div>

              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full h-14 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-[#211f2f] hover:bg-indigo-700 shadow-lg hover:shadow-2xl hover:-translate-y-0.5'
                }`}
              >

                {isSubmitting ? (

                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                ) : (

                  <>
                    Login
                    <ArrowRight size={20} />
                  </>

                )}

              </button>

            </form>

            {/* FOOTER */}
            <div className="mt-8 text-center text-sm text-gray-500">

              Don’t have an account?{' '}

              <Link
                to="/register"
                className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                Create Account
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}