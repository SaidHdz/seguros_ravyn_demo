import React, { useState } from 'react';
import { submitLeadQuote } from '../../services/leadService';
import type { LeadFormData } from '../../types/insurance';

/**
 * Editorial Lead Form Island.
 * 
 * Clean minimalist form with subtle border-b input lines, capsule action button,
 * 1-second deliberate loading state, and zero AI slop.
 */
export default function LeadForm() {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    email: '',
    zipCode: '',
    insuranceType: 'auto',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^\d{5}$/.test(formData.zipCode.trim())) {
      setStatus('error');
      setFeedbackMessage('Please enter a valid 5-digit US ZIP Code.');
      return;
    }

    setStatus('loading');
    setFeedbackMessage('');

    try {
      const response = await submitLeadQuote(formData);
      if (response.success) {
        setStatus('success');
        setFeedbackMessage(response.message);
      } else {
        setStatus('error');
        setFeedbackMessage('Unable to connect. Please retry or call us directly.');
      }
    } catch {
      setStatus('error');
      setFeedbackMessage('Network error. Please try again.');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({
      fullName: '',
      email: '',
      zipCode: '',
      insuranceType: 'auto',
    });
    setFeedbackMessage('');
  };

  return (
    <div className="w-full bg-[#161B26] border border-white/10 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
      {status === 'success' ? (
        <div className="text-center py-6">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h3 className="text-lg font-bold text-white mb-1">Inquiry Sent</h3>
          <p className="text-emerald-400 font-medium text-sm mb-6">
            {feedbackMessage}
          </p>

          <div className="bg-white/5 rounded-xl p-4 text-left text-xs font-mono text-slate-300 space-y-1 mb-6 border border-white/5">
            <div><span className="text-slate-500">CLIENT:</span> {formData.fullName}</div>
            <div><span className="text-slate-500">POLICY:</span> {formData.insuranceType.toUpperCase()}</div>
            <div><span className="text-slate-500">ZIP:</span> {formData.zipCode}</div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-white underline underline-offset-4 transition-colors"
          >
            Submit another quotation
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="border-b border-white/10 pb-3">
            <h3 className="text-base font-bold text-white">
              Instant Quotation Dispatch
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Enter your details to trigger an immediate rate comparison.
            </p>
          </div>

          {status === 'error' && (
            <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-800/80 text-xs text-red-300">
              {feedbackMessage}
            </div>
          )}

          {/* Underline Input: Full Name */}
          <div className="space-y-1">
            <label htmlFor="fullName" className="text-xs text-slate-400 block font-medium">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Elena Vance"
              className="w-full bg-transparent border-0 border-b border-slate-700 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Underline Input: Email Address */}
          <div className="space-y-1">
            <label htmlFor="email" className="text-xs text-slate-400 block font-medium">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="name@example.com"
              className="w-full bg-transparent border-0 border-b border-slate-700 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Underline Input: ZIP Code */}
          <div className="space-y-1">
            <label htmlFor="zipCode" className="text-xs text-slate-400 block font-medium">
              ZIP Code (5 digits)
            </label>
            <input
              id="zipCode"
              name="zipCode"
              type="text"
              required
              maxLength={5}
              value={formData.zipCode}
              onChange={handleInputChange}
              placeholder="75001"
              className="w-full bg-transparent border-0 border-b border-slate-700 py-2 text-sm text-white placeholder-slate-600 font-mono focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Underline Input: Insurance Type */}
          <div className="space-y-1">
            <label htmlFor="insuranceType" className="text-xs text-slate-400 block font-medium">
              Insurance Type
            </label>
            <select
              id="insuranceType"
              name="insuranceType"
              value={formData.insuranceType}
              onChange={handleInputChange}
              className="w-full bg-transparent border-0 border-b border-slate-700 py-2 text-sm text-white focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="auto" className="bg-[#161B26] text-white">Auto Insurance</option>
              <option value="life" className="bg-[#161B26] text-white">Life Insurance</option>
              <option value="health" className="bg-[#161B26] text-white">Health Insurance</option>
              <option value="home" className="bg-[#161B26] text-white">Home & Property</option>
            </select>
          </div>

          {/* Capsule Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider shadow transition-all focus:outline-none"
            >
              {status === 'loading' ? 'Comparing rates...' : 'Request Callback'}
            </button>
          </div>

          <div className="text-[10px] text-slate-500 font-mono text-center">
            TEXAS DEPARTMENT OF INSURANCE COMPLIANT
          </div>
        </form>
      )}
    </div>
  );
}
