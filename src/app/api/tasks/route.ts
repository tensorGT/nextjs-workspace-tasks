import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/workspace_db",
});

export async function GET() {
  const res = await pool.query("SELECT * FROM tasks ORDER BY id DESC");
  return NextResponse.json(res.rows);
}

export async function POST(req: NextRequest) {
  const { projectId, title } = await req.json();
  if (!title || !projectId) {
    return NextResponse.json({ error: "need projectId and title" }, { status: 400 });
  }
  const res = await pool.query(
    "INSERT INTO tasks (project_id, title) VALUES ($1, $2) RETURNING *",
    [Number(projectId), String(title)]
  );
  return NextResponse.json(res.rows[0], { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const { id, done } = await req.json();
  const res = await pool.query("UPDATE tasks SET done = $1 WHERE id = $2 RETURNING *", [Boolean(done), Number(id)]);
  return NextResponse.json(res.rows[0]);
}
