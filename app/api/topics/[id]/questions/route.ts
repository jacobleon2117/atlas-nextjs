import { fetchQuestions } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const questions = await fetchQuestions(params.id);
    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}