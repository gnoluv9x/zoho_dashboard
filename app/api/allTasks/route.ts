import { NextResponse } from "next/server";
import allTasks from "./allTask.json";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(allTasks);
}
