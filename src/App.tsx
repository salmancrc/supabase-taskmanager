import { useEffect, useState, type FC } from 'react';
import { TaskManager } from './TaskManager';
import { Auth } from './Auth';
import { supabase } from './supabase.client';

export const App: FC = () => {
  const [session, setSession] = useState<any>(null)

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    setSession(currentSession.data);
  }

  useEffect(() => {
    fetchSession();
    console.log(session)
  }, [])

  return (
    <>
      {session ? <TaskManager /> : <Auth />}
    </>
  );
};

export default App;
