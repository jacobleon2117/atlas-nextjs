"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { incrementVotes,insertQuestion, insertTopic } from "./data";
import { redirect } from "next/navigation";

export async function addTopic(data: FormData) {
  let topic;
  try {
    topic = await insertTopic({
      title: data.get("title") as string,
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add topic.");
  } finally {
    revalidatePath("/ui/topics/[id]", "page");
    topic && redirect(`/ui/topics/${topic.id}`);
  }
}

export async function addQuestion(question: FormData) {
  try {
    insertQuestion({
      title: question.get("title") as string,
      topic_id: question.get("topic_id") as string,
      votes: 0,
    });
    revalidatePath("/ui/topics/[id]", "page");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add question.");
  }
}

export async function addVote(data: FormData) {
  try {
    incrementVotes(data.get("id") as string);
    revalidatePath("/ui/topics/[id]", "page");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add vote.");
  }
}

export async function addAnswer(formData: FormData) {
  const questionId = formData.get('questionId') as string;
  const answer = formData.get('answer') as string;

  try {
    await sql`
      INSERT INTO answers (answer, question_id)
      VALUES (${answer}, ${questionId})
    `;
    revalidatePath(`/ui/questions/${questionId}`);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add answer.");
  }
}

export async function markAnswerAsAccepted(formData: FormData) {
  const questionId = formData.get('questionId') as string;
  const answerId = formData.get('answerId') as string;

  try {
    await sql`
      UPDATE questions
      SET answer_id = ${answerId}
      WHERE id = ${questionId}
    `;
    revalidatePath(`/ui/questions/${questionId}`);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to mark answer as accepted.");
  }
}