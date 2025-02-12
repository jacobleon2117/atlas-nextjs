import { fetchAnswers } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    id: string;
  };
};

export async function GET(
  request: NextRequest,
  context: Context
) {
  try {
    const answers = await fetchAnswers(context.params.id);
    return NextResponse.json(answers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch answers" },
      { status: 500 }
    );
  }
}