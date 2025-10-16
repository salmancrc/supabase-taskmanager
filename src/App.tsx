
import { type FC } from 'react';

export const App: FC = () => {
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center py-10">
      <div className="w-full max-w-md bg-zinc-800 rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-white mb-8">Task Manager CRUD</h1>
        <div className="flex flex-col gap-4 mb-8">
          <input
            className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500 transition"
            type="text"
            placeholder="Task Title"
          />
          <textarea
            className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500 transition min-h-[56px] resize-y"
            placeholder="Task Description"
          />
          <button
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded-lg transition shadow"
          >
            Add Task
          </button>
        </div>
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-white">Title</h2>
            <p className="text-zinc-300">Description</p>
            <div className="flex gap-3 mt-2">
              <button className="px-4 py-1 rounded-lg border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-zinc-900 font-medium transition">Edit</button>
              <button className="px-4 py-1 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-medium transition">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
