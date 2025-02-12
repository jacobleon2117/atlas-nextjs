import { fetchAnswers } from "@/lib/data";

export const runtime = 'nodejs';

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const answers = await fetchAnswers(context.params.id);
    return Response.json(answers);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch answers" },
      { status: 500 }
    );
  }
}