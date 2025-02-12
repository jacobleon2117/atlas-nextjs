import { fetchAnswers } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET(
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Missing ID parameter" }, { status: 400 });
    }

    const answers = await fetchAnswers(id);
    return NextResponse.json(answers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch answers" }, { status: 500 });
  }
}