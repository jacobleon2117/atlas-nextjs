import { fetchAnswers } from "@/lib/data";
import { type NextRequest } from "next/server";

interface RouteContext {
  params: { id: string }
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const answers = await fetchAnswers(params.id);
    return Response.json(answers);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch answers" },
      { status: 500 }
    );
  }
}