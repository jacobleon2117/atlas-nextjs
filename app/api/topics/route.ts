import { fetchTopics } from "@/lib/data";

export async function GET() {
  try {
    const topics = await fetchTopics();
    return Response.json(topics);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch topics" },
      { status: 500 }
    );
  }
}