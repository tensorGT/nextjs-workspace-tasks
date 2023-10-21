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
