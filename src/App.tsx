import { useEffect, useState, type FC } from 'react';
import { TaskManager } from './TaskManager';
import { Auth } from './Auth';
import { supabase } from './supabase.client';
import type { Session } from '@supabase/supabase-js';

export const App: FC = () => {
  const [session, setSession] = useState<Session | null>(null)

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    setSession(currentSession.data.session);
  }

  useEffect(() => {
    fetchSession();
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      authListener.subscription.unsubscribe();
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut();
  }

  return (
    <>
      {session ? (
        <div className="min-h-screen bg-zinc-900 relative">
          <button
            type="button"
            onClick={handleLogout}
            className="absolute top-6 right-6 bg-red-600 hover:bg-red-500 text-white font-semibold px-5 py-2 rounded-lg transition shadow z-50"
          >
            Logout
          </button>
          <TaskManager session={session} />
        </div>
      ) : (<Auth />)}
    </>
  );
};

export default App;
