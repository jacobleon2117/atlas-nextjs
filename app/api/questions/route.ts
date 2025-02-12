import { fetchQuestions } from "@/lib/data";
import { type NextRequest } from "next/server";

interface RouteContext {
  params: { id: string }
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const questions = await fetchQuestions(params.id);
    return Response.json(questions);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}