import { fetchQuestions } from "@/lib/data";

export const runtime = 'nodejs';

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const questions = await fetchQuestions(context.params.id);
    return Response.json(questions);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}