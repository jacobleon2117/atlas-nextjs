import { fetchAnswers } from "@/lib/data";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing ID parameter" }), { status: 400 });
    }

    const answers = await fetchAnswers(id);
    return Response.json(answers);
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch answers" }), { status: 500 });
  }
}
