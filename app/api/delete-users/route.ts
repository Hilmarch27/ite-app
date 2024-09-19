import { deleteUsers } from "@/app/actions/auth";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await deleteUsers();
    return NextResponse.json({ message: "Database cleared successfully" });
  } catch (error) {
    return NextResponse.error();
  }
}
