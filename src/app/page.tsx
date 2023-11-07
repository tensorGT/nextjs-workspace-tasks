"use client";

import { FormEvent, useEffect, useState } from "react";

interface Task {
  id: number;
  project_id: number;
  title: string;
  done: boolean;
}

export default function WorkspaceBoardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("/api/tasks")
      .then((r) => (r.ok ? r.json() : []))
      .then(setTasks)
      .catch(() => {});
  }, []);

  async function addTask(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    // optimistic update so ui feel fast
    const tempId = -Date.now();
    const optimistic: Task = { id: tempId, project_id: 1, title, done: false };
    setTasks([optimistic, ...tasks]);
    setTitle("");

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId: 1, title: optimistic.title }),
    });
    if (res.ok) {
      const saved: Task = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === tempId ? saved : t)));
    }
