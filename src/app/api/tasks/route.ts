import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/workspace_db",
});

export async function GET() {
  const res = await pool.query("SELECT * FROM tasks ORDER BY id DESC");
  return NextResponse.json(res.rows);
}
