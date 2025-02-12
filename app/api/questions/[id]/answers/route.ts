import { fetchAnswers } from "@/lib/data";

export async function GET(
  request: Request,
  { params }: { params: { [key: string]: string } }
) {
  const answers = await fetchAnswers(params.id);
  return Response.json(answers);
}