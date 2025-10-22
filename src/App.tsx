import type { FC } from 'react';
import { Task } from './Task';
import { Auth } from './Auth';

export const App: FC = () => {
  return (
    <>
      <Auth />
      <Task />
    </>
  );
};

export default App;
