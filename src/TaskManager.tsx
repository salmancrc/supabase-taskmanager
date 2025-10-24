import React, { useState, useEffect } from "react";
import type { FC } from "react";
import { supabase } from "./supabase.client";
import type { Session } from "@supabase/supabase-js";

interface TaskManagerProps {
  session: Session;
}
interface Task {
  id: number;
  title: string;
  description: string;
  created_at?: string;
}

export const TaskManager: FC<TaskManagerProps> = ({ session }) => {
  const [newtask, setNewTask] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<number | null>(null);

  useEffect(() => {
    getTasks();
  }, []);

  // useEffect(() => {
  //   const channel = supabase.channel("tasks-channel");
  //   channel
  //     .on(
  //       "postgres_changes",
  //       { event: "INSERT", schema: "public", table: "tasks" },
  //       (payload) => {
  //         const newTask = payload.new as Task;
  //         setTasks((prev) => [...prev, newTask]);
  //       }
  //     )
  //     .subscribe((status) => {
  //       console.log("Subscription: ", status);
  //     });
  // }, []);

  const getTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: false });
    if (error) {
      console.error("getTasks error:", error.message);
      return;
    }
    setTasks(data ?? []);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newtask.title.trim()) return;

    if (editingTask !== null) {
      const { error } = await supabase
        .from("tasks")
        .update({ title: newtask.title, description: newtask.description })
        .eq("id", editingTask);

      if (error) {
        console.error("Error updating task:", error.message);
        return;
      }

      setEditingTask(null);
      setNewTask({ title: "", description: "" });
      return;
    }

    const { error } = await supabase
      .from("tasks")
      .insert({ ...newtask, email: session.user.email })
      .select()
      .single();
    if (error) {
      console.error("Error adding task:", error.message);
      return;
    }

    setNewTask({ title: "", description: "" });
  };

  const handleEditTask = (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    setNewTask({ title: task.title, description: task.description });
    setEditingTask(id);
  };

  const deleteTask = async (id: number) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      console.error("Error deleting task:", error.message);
      return;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center py-10">
      <div className="w-full max-w-md bg-zinc-800 rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-white mb-8">
          Task Manager CRUD
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
          <input
            className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500 transition"
            type="text"
            placeholder="Task Title"
            value={newtask.title}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <textarea
            className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500 transition min-h-[56px] resize-y"
            placeholder="Task Description"
            value={newtask.description}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded-lg transition shadow flex-1"
            >
              {editingTask !== null ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>

        <div className="space-y-6 min-h-0 max-h-96 overflow-y-auto pr-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 flex flex-col gap-2"
            >
              <h2 className="text-lg font-semibold text-white">{task.title}</h2>
              <p className="text-zinc-300">{task.description}</p>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => handleEditTask(task.id)}
                  className="px-4 py-1 rounded-lg border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-zinc-900 font-medium transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-4 py-1 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-medium transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
