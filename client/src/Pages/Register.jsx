// src/Pages/Register.jsx

import React, { useState } from 'react';

import {
  useNavigate,
  Link
} from 'react-router-dom';

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Briefcase,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  BriefcaseBusiness,
  Check,
  X
} from 'lucide-react';

export default function Register() {

  const navigate = useNavigate();

  // ─────────────────────────────────────────────
  // STATES
  // ─────────────────────────────────────────────
  const [formData, setFormData] =
    useState({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: 'fresher',

      // PROFESSIONAL FIELDS
      company: '',
      yearsExperience: '',
      currentRole: '',
    });

  const [errors, setErrors] =
    useState({});

  const [showPassword, setShowPassword] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submitStatus, setSubmitStatus] =
    useState(null);

  // ─────────────────────────────────────────────
  // PASSWORD CHECKS
  // ─────────────────────────────────────────────
  const passwordChecks = {

    length:
      formData.password.length >= 8,

    uppercase:
      /[A-Z]/.test(
        formData.password
      ),

    lowercase:
      /[a-z]/.test(
        formData.password
      ),

    number:
      /[0-9]/.test(
        formData.password
      ),

    special:
      /[!@#$%^&*(),.?":{}|<>]/.test(
        formData.password
      ),
  };

  const passedChecks =
    Object.values(
      passwordChecks
    ).filter(Boolean).length;

  const isPasswordStrong =
    passedChecks === 5;

  // ─────────────────────────────────────────────
  // EMAIL VALIDATION
  // ─────────────────────────────────────────────
  const getEmailMessage = () => {

    const email =
      formData.email;

    if (!email)
      return null;

    if (!email.includes('@')) {

      return {
        text:
          "Email must contain '@'",
        type: 'error',
      };
    }

    const afterAt =
      email.split('@')[1];

    if (
      afterAt &&
      !afterAt.includes('.')
    ) {

      return {
        text:
          "Email must contain '.' before 'com'",
        type: 'error',
      };
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      emailRegex.test(email)
    ) {

      return {
        text:
          'Valid email address',
        type: 'success',
      };
    }

    return null;
  };

  const emailMessage =
    getEmailMessage();

  // ─────────────────────────────────────────────
  // HANDLE CHANGE
  // ─────────────────────────────────────────────
// ─────────────────────────────────────────────
// HANDLE CHANGE
// ─────────────────────────────────────────────
const handleChange = (e) => {

  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  // CLEAR OLD ERROR
  setErrors((prev) => ({
    ...prev,
    [name]: '',
  }));

  // REAL-TIME CONFIRM PASSWORD VALIDATION
  if (name === 'confirmPassword') {

    if (value !== formData.password) {

      setErrors((prev) => ({
        ...prev,
        confirmPassword: 'Passwords do not match',
      }));

    } else {

      setErrors((prev) => ({
        ...prev,
        confirmPassword: '',
      }));
    }
  }

  // ALSO CHECK WHEN USER CHANGES MAIN PASSWORD
  if (name === 'password') {

    if (
      formData.confirmPassword &&
      value !== formData.confirmPassword
    ) {

      setErrors((prev) => ({
        ...prev,
        confirmPassword: 'Passwords do not match',
      }));

    } else {

      setErrors((prev) => ({
        ...prev,
        confirmPassword: '',
      }));
    }
  }
};

  // ─────────────────────────────────────────────
  // VALIDATE FORM
  // ─────────────────────────────────────────────
  const validateForm = () => {

    const newErrors = {};

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // NAME
    if (
      !formData.fullName.trim()
    ) {

      newErrors.fullName =
        'Full name is required';
    }

    // EMAIL
    if (
      !formData.email.trim()
    ) {

      newErrors.email =
        'Email is required';

    } else if (
      !emailRegex.test(
        formData.email
      )
    ) {

      newErrors.email =
        'Enter a valid email address';
    }

    // PASSWORD
    if (
      !isPasswordStrong
    ) {

      newErrors.password =
        'Password does not meet all conditions';
    }

    // CONFIRM PASSWORD
    if (
      formData.password !==
      formData.confirmPassword
    ) {

      newErrors.confirmPassword =
        'Passwords do not match';
    }

    // PROFESSIONAL VALIDATION
    if (
      formData.userType ===
      'professional'
    ) {

      if (
        !formData.company.trim()
      ) {

        newErrors.company =
          'Company name is required';
      }

      if (
        !formData.yearsExperience
      ) {

        newErrors.yearsExperience =
          'Experience is required';
      }

      if (
        !formData.currentRole.trim()
      ) {

        newErrors.currentRole =
          'Current role is required';
      }
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  // ─────────────────────────────────────────────
  // SUBMIT
  // ─────────────────────────────────────────────
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (!validateForm())
        return;

      setIsSubmitting(true);

      try {

        const response =
          await fetch(
            'http://localhost:5000/api/auth/register',
            {
              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json',
              },

              body: JSON.stringify({
                name:
                  formData.fullName,

                email:
                  formData.email,

                password:
                  formData.password,

                userType:
                  formData.userType,

                company:
                  formData.company,

                yearsExperience:
                  formData.yearsExperience,

                currentRole:
                  formData.currentRole,
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

  // EMAIL ALREADY EXISTS
  if (
    data.msg === 'User already exists'
  ) {

    setErrors((prev) => ({
      ...prev,
      email:
        'This email is already registered',
    }));

  } else {

    alert(
      data.msg ||
      'Registration failed'
    );
  }

  setIsSubmitting(false);

  return;
}

        setSubmitStatus(
          'success'
        );

        setTimeout(() => {

          navigate('/login');

        }, 2000);

      } catch (error) {

        console.log(error);

        alert(
          'Server Error'
        );

      } finally {

        setIsSubmitting(false);
      }
    };

  // ─────────────────────────────────────────────
  // SUCCESS SCREEN
  // ─────────────────────────────────────────────
  if (
    submitStatus ===
    'success'
  ) {

    return (

      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">

        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center">

          <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">

            <CheckCircle2 size={32} />

          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-2">

            Registration Successful

          </h2>

          <p className="text-slate-600">

            Redirecting to login...

          </p>

        </div>

      </div>
    );
  }

  // ─────────────────────────────────────────────
  // MAIN UI
  // ─────────────────────────────────────────────
  return (

    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">

      <div className="bg-white max-w-4xl w-full rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

        {/* LEFT PANEL */}
        <div className="md:w-5/12 bg-[#211f2f] p-6 lg:p-8 text-white flex flex-col justify-between relative overflow-hidden">

          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 rounded-full bg-[#918ca9] opacity-40 blur-3xl"></div>

          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-56 h-56 rounded-full bg-[#918ca9] opacity-40 blur-3xl"></div>

          <div className="relative z-10">

            <div className="flex items-center gap-2 mb-10">

              <div className="bg-white p-2 rounded-lg text-indigo-600">

                <Briefcase
                  size={22}
                />

              </div>

              <span className="text-2xl font-bold">

                TrackHire

              </span>

            </div>

            <h1 className="text-3xl font-bold leading-tight mb-4">

              Start your journey today.

            </h1>

            <p className="text-indigo-100 text-sm mb-8">

              Create your TrackHire account and manage all your job applications in one place.

            </p>

            <div className="space-y-4">

              <div className="flex items-center gap-3 text-sm">

                <ShieldCheck
                  className="text-indigo-300"
                  size={20}
                />

                <span>
                  Secure account protection
                </span>

              </div>

              <div className="flex items-center gap-3 text-sm">

                <User
                  className="text-indigo-300"
                  size={20}
                />

                <span>
                  Built for job seekers
                </span>

              </div>

            </div>

          </div>

          <div className="relative z-10 text-xs text-indigo-200 mt-8">

            © 2026 TrackHire Inc.

          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="md:w-7/12 p-6 lg:p-8 flex items-center">

          <div className="max-w-md mx-auto w-full">

            <div className="mb-6">

              <h2 className="text-2xl font-bold text-slate-900 mb-2">

                Create Account

              </h2>

              <p className="text-slate-500 text-sm">

                Fill in your details to continue.

              </p>

            </div>

            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-4"
            >

              {/* USER TYPE */}
              <div className="flex p-1 bg-slate-100 rounded-xl">

                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      userType:
                        'fresher',
                    })
                  }
                  className={`flex-1 py-2 text-sm rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    formData.userType ===
                    'fresher'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-500'
                  }`}
                >

                  <GraduationCap
                    size={16}
                  />

                  Fresher

                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      userType:
                        'professional',
                    })
                  }
                  className={`flex-1 py-2 text-sm rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    formData.userType ===
                    'professional'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-500'
                  }`}
                >

                  <BriefcaseBusiness
                    size={16}
                  />

                  Professional

                </button>

              </div>

              {/* FULL NAME */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-1">

                  Full Name

                </label>

                <div className="relative">

                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">

                    <User size={18} />

                  </div>

                  <input
                    type="text"
                    name="fullName"
                    value={
                      formData.fullName
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="John Doe"
                    className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />

                </div>

              </div>

              {/* EMAIL */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-1">

                  Email Address

                </label>

                <div className="relative">

                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">

                    <Mail size={18} />

                  </div>

                  <input
                    type="email"
                    name="email"
                    value={
                      formData.email
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="john@gmail.com"
                    className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />

                </div>

                {emailMessage && (

                  <p
                    className={`mt-1 text-xs flex items-center gap-1 ${
                      emailMessage.type ===
                      'error'
                        ? 'text-red-500'
                        : 'text-green-600'
                    }`}
                  >

                    {emailMessage.type ===
                    'error' ? (
                      <X size={14} />
                    ) : (
                      <Check
                        size={14}
                      />
                    )}

                    {
                      emailMessage.text
                    }

                  </p>
                )}
                {errors.email && (

                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">

                    <AlertCircle size={14} />

    {errors.email}

  </p>

)}

              </div>

              {/* PROFESSIONAL EXTRA FIELDS */}
              {formData.userType ===
                'professional' && (

                <div className="space-y-4 border-l-4 border-indigo-200 pl-4">

                  {/* COMPANY */}
                  <div>

                    <label className="block text-sm font-medium text-slate-700 mb-1">

                      Current Company

                    </label>

                    <div className="relative">

                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">

                        <BriefcaseBusiness size={18} />

                      </div>

                      <input
                        type="text"
                        name="company"
                        value={
                          formData.company
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Google / Microsoft"
                        className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                      />

                    </div>

                  </div>

                  {/* EXPERIENCE + ROLE */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* EXPERIENCE */}
                    <div>

                      <label className="block text-sm font-medium text-slate-700 mb-1">

                        Experience

                      </label>

                      <input
                        type="number"
                        name="yearsExperience"
                        value={
                          formData.yearsExperience
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="2"
                        className="w-full px-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                      />

                    </div>

                    {/* ROLE */}
                    <div>

                      <label className="block text-sm font-medium text-slate-700 mb-1">

                        Current Role

                      </label>

                      <input
                        type="text"
                        name="currentRole"
                        value={
                          formData.currentRole
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Frontend Developer"
                        className="w-full px-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                      />

                    </div>

                  </div>

                </div>
              )}

              {/* PASSWORD */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-1">

                  Password

                </label>

                <div className="relative">

                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">

                    <Lock size={18} />

                  </div>

                  <input
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    name="password"
                    value={
                      formData.password
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400"
                  >

                    {showPassword ? (
                      <EyeOff
                        size={18}
                      />
                    ) : (
                      <Eye
                        size={18}
                      />
                    )}

                  </button>

                </div>

                {/* PASSWORD STRENGTH */}
                <div className="mt-3 bg-slate-50 rounded-xl p-3 border border-slate-200">

                  <div className="flex items-center justify-between mb-2">

                    <p className="text-sm font-medium text-slate-700">

                      Password Strength

                    </p>

                    <span
                      className={`text-xs font-semibold ${
                        isPasswordStrong
                          ? 'text-green-600'
                          : 'text-red-500'
                      }`}
                    >

                      {isPasswordStrong
                        ? 'Strong Password'
                        : 'Weak Password'}

                    </span>

                  </div>

                  <div className="flex flex-wrap gap-2 mt-2 text-xs">

  {[
    {
      label: '8+ Characters',
      valid: passwordChecks.length,
    },
    {
      label: '1 Uppercase',
      valid: passwordChecks.uppercase,
    },
    {
      label: '1 Lowercase',
      valid: passwordChecks.lowercase,
    },
    {
      label: '1 Number',
      valid: passwordChecks.number,
    },
    {
      label: '1 Special',
      valid: passwordChecks.special,
    },
  ].map((item, index) => (

    <div
      key={index}
      className={`flex items-center gap-1 px-2 py-1 rounded-full border ${
        item.valid
          ? 'bg-green-50 border-green-200 text-green-700'
          : 'bg-red-50 border-red-200 text-red-600'
      }`}
    >

      {item.valid ? (
        <Check size={12} />
      ) : (
        <X size={12} />
      )}

      <span>{item.label}</span>

    </div>

  ))}

</div>

                </div>

              </div>

              {/* CONFIRM PASSWORD */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-1">

                  Confirm Password

                </label>

                <div className="relative">

                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">

                    <Lock size={18} />

                  </div>

                  <input
                    type="password"
                    name="confirmPassword"
                    value={
                      formData.confirmPassword
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />

                </div>
                {errors.confirmPassword && (

  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">

    <AlertCircle size={14} />

    {errors.confirmPassword}

  </p>

)}

{formData.confirmPassword &&
 formData.password === formData.confirmPassword && (

  <p className="mt-1 text-xs text-green-600 flex items-center gap-1">

    <Check size={14} />

    Passwords match

  </p>

)}

              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={
                  isSubmitting
                }
                className={`w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-semibold transition-all ${
                  isSubmitting
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-[#211f2f] hover:bg-[#3a3552]'
                }`}
              >

                {isSubmitting ? (

                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                ) : (

                  <>
                    Create Account

                    <ArrowRight
                      size={18}
                    />
                  </>
                )}

              </button>

              {/* LOGIN */}
              <div className="text-center pt-2">

                <p className="text-sm text-slate-500">

                  Already have an account?{' '}

                  <Link
                    to="/login"
                    className="font-semibold text-indigo-600 hover:underline"
                  >

                    Login

                  </Link>

                </p>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}