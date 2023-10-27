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
