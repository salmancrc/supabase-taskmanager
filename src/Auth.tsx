import React, { useState } from 'react';
import type { FC } from 'react';
import { supabase } from './supabase.client';

export const Auth: FC = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    if (isSignUp) {
      const { error: signUpError } = await supabase.auth.signUp({ email, password })

      if (signUpError) {
        console.error("Error Signing Up", signUpError.message)
        return
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

      if (signInError) {
        console.error("Error Signing In", signInError.message)
        return
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center py-10">
      <div className="w-full max-w-md bg-zinc-800 rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-white mb-8">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500 transition"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500 transition"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-zinc-700 hover:bg-zinc-600 text-white font-semibold py-3 rounded-lg transition shadow"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full bg-zinc-700 hover:bg-zinc-600 text-white font-semibold py-3 rounded-lg transition shadow border border-indigo-500"
          >
            {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
