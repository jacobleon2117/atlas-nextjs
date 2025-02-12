import { fetchTopics } from "@/lib/data";

export async function GET() {
  const topics = await fetchTopics();
  return Response.json(topics);
}