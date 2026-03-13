import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check } from 'lucide-react';
import { supabase } from '../supabaseClient';

const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    if (!supabase) {
      setStatus('error');
      setMessage('Waitlist is not configured. Please try again later.');
      return;
    }
    setStatus('loading');
    setMessage('');
    try {
      const { error } = await supabase.from('waitlist').insert({ email: email.trim().toLowerCase() });
      if (error) {
        if (error.code === '23505') {
          setStatus('success');
          setMessage('You\'re already on the list!');
        } else {
          setStatus('error');
          setMessage(error.message || 'Something went wrong.');
        }
      } else {
        setStatus('success');
        setMessage('You\'re on the list! We\'ll notify you when Prarthana launches.');
        setEmail('');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    } finally {
      setStatus(s => (s === 'loading' ? 'idle' : s));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-lg mx-auto pt-10"
    >
      <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/80 shadow-lg shadow-orange-500/10 p-6 sm:p-8">
        <p className="text-base font-medium text-gray-700 mb-4">Be the first to know when we launch</p>
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition bg-white/80"
              required
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 disabled:opacity-60 transition-all hover:shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-2 shrink-0"
          >
            {status === 'loading' ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : status === 'success' ? (
              <>
                <Check size={18} strokeWidth={3} />
                Joined
              </>
            ) : (
              'Join Waitlist'
            )}
          </button>
        </form>
        {message && (
          <p className={`mt-3 text-sm ${status === 'error' ? 'text-red-600' : 'text-emerald-600'}`}>
            {message}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default Waitlist;
