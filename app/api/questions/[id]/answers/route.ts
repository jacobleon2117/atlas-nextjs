import { fetchAnswers } from "@/lib/data";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const answers = await fetchAnswers(params.id);
    return Response.json(answers);
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch answers" }), { status: 500 });
  }
}
