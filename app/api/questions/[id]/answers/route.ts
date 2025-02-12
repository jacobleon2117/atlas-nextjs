import { fetchAnswers } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  try {
    const answers = await fetchAnswers(params.id);
    return NextResponse.json(answers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch answers" },
      { status: 500 }
    );
  }
}