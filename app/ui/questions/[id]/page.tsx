import { fetchQuestion, fetchAnswers } from '@/lib/data';
import { addAnswer, markAnswerAsAccepted } from '@/lib/actions';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  try {
    const { id } = await params;
    const [question, answers] = await Promise.all([
      fetchQuestion(id),
      fetchAnswers(id)
    ]);

    if (!question) {
      return <div>Question not found</div>;
    }

    return (
      <div className="flex flex-col gap-6">
        <div className="border-b pb-4">
          <Link
            href={`/ui/topics/${question.topic_id}`}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to Topic
          </Link>
          <h1 className="mt-2 text-2xl font-bold">{question.title}</h1>
        </div>

        <form action={addAnswer} className="space-y-4">
          <input type="hidden" name="questionId" value={question.id} />
          <div>
            <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
              Your Answer
            </label>
            <textarea
              id="answer"
              name="answer"
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white"
          >
            Post Answer
          </button>
        </form>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Answers</h2>
          {answers.map((answer) => (
            <div
              key={answer.id}
              className={`flex items-start gap-4 rounded-lg border p-4 ${
                answer.id === question.answer_id ? 'border-green-500 bg-green-50' : ''
              }`}
            >
              <div className="flex-1">
                <p>{answer.answer}</p>
              </div>
              
              {answer.id === question.answer_id ? (
                <CheckCircleIcon className="h-6 w-6 text-green-500" />
              ) : (
                <form action={markAnswerAsAccepted}>
                  <input type="hidden" name="answerId" value={answer.id} />
                  <input type="hidden" name="questionId" value={question.id} />
                  <button
                    type="submit"
                    className="rounded-full p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-500"
                  >
                    <CheckCircleIcon className="h-6 w-6" />
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error:', error);
    return <div>Error loading question</div>;
  }
}