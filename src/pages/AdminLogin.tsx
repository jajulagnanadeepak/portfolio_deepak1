import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';
import Lottie from 'lottie-react';

const API_BASE: string = (import.meta as any).env?.VITE_API_BASE || 'http://localhost:5000';

export default function AdminLogin(): JSX.Element {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>('');
  const [animationData, setAnimationData] = useState<any | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const loadAnimation = async () => {
      try {
        const res = await fetch('/login.json');
        if (!res.ok) throw new Error(`Failed to fetch animation: ${res.status}`);
        const data = await res.json();
        if (!mounted) return;
        setAnimationData(data);
      } catch (err: any) {
        if (mounted) setLoadError(err?.message || 'Failed to load animation');
      }
    };
    loadAnimation();
    return () => { mounted = false; };
  }, []);

  const sendOtp = async () => {
    setMsg('');
    if (!email) {
      setMsg('Please enter your email to receive OTP.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) throw new Error(data?.msg || 'Failed to send OTP');
      setStep('otp');
      setMsg('OTP sent to your email.');
    } catch (err: any) {
      setMsg(err?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e?: React.FormEvent) => {
    if (e && 'preventDefault' in e) e.preventDefault();
    setMsg('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) throw new Error(data?.msg || 'Invalid OTP.');
      const token: string = data.token || data.accessToken || data.jwt || 'ok';
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminAuthenticated', 'true');
      navigate('/admin/dashboard');
    } catch (err: any) {
      setMsg(err?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-stretch gap-6">
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl relative overflow-hidden">
          <div className="w-full h-full flex items-center justify-center relative">
            {animationData ? (
              <div className="w-full aspect-square max-w-[500px]">
                <Lottie animationData={animationData} loop={true} autoplay={true} style={{ width: '100%', height: '100%' }} />
              </div>
            ) : (
              <div className="text-gray-400 text-center">
                {loadError ? `Animation error: ${loadError}` : 'Loading animation...'}
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden w-full flex items-center justify-center mb-6">
          <div className="w-full max-w-[300px] aspect-square">
            {animationData ? (
              <Lottie animationData={animationData} loop={true} autoplay={true} style={{ width: '100%', height: '100%' }} />
            ) : (
              <div className="text-gray-400 text-center">
                {loadError ? `Animation error: ${loadError}` : 'Loading animation...'}
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors">
              <ArrowLeft size={18} /> Back
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock size={28} className="text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin Login</h1>
              <p className="text-gray-600">Access the admin dashboard</p>
            </div>

            <div className="space-y-5">
              {msg && <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm">{msg}</div>}

              {step === 'email' ? (
                <>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@example.com" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors" />
                  </div>
                  <button type="button" onClick={sendOtp} disabled={loading} className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    {loading ? 'Sending OTP...' : 'Send OTP'}
                  </button>
                </>
              ) : (
                <form onSubmit={verifyOtp} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" value={email} disabled className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50" />
                  </div>
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">OTP</label>
                    <input id="otp" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} inputMode="numeric" pattern="[0-9]{6}" maxLength={6} required placeholder="Enter 6-digit OTP" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors" />
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                      {loading ? 'Verifying...' : 'Verify & Continue'}
                    </button>
                    <button type="button" onClick={() => setStep('email')} className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      Change Email
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  