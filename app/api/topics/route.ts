import { fetchTopics } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const topics = await fetchTopics();
    return NextResponse.json(topics);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch topics" },
      { status: 500 }
    );
  }
}