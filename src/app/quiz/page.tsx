"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { poems } from "@/data/poems";
import { QuizQuestion } from "@/types/quiz";

export default function QuizPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<
    { q: string; a: string; isCorrect: boolean }[]
  >([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const shuffled = [...poems].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);

    const generatedQuestions = selected.map((poem) => {
      const isKamiToShimo = Math.random() > 0.5;
      const question = isKamiToShimo ? poem.kami : poem.shimo;
      const correctAnswer = isKamiToShimo ? poem.shimo : poem.kami;
      const distractors = poems
        .filter((p) => p.id !== poem.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((p) => (isKamiToShimo ? p.shimo : p.kami));

      const options = [correctAnswer, ...distractors].sort(
        () => 0.5 - Math.random(),
      );
      return {
        question,
        correctAnswer,
        options,
        type: isKamiToShimo ? "kami-to-shimo" : "shimo-to-kami",
      } as QuizQuestion;
    });

    const timer = setTimeout(() => {
      setQuestions(generatedQuestions);
      setIsMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    const newScore = isCorrect ? score + 1 : score;

    if (isCorrect) setScore(newScore);

    const newAnswers = [
      ...userAnswers,
      {
        q: currentQuestion.question,
        a: currentQuestion.correctAnswer,
        isCorrect,
      },
    ];
    setUserAnswers(newAnswers);

    if (currentIndex < 4) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      sessionStorage.setItem(
        "quizResult",
        JSON.stringify({ score: newScore, details: newAnswers }),
      );
      router.push("/result");
    }
  };

  if (!isMounted || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-brand-text">
        読み込み中...
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-brand-paper w-full max-w-xl p-8 rounded-2xl border-4 border-brand-accent shadow-xl">
        <div className="mb-8">
          <span className="text-brand-accent font-bold">
            第 {currentIndex + 1} 問 / 5
          </span>
          <h2 className="text-2xl mt-4 leading-loose">
            {questions[currentIndex].question}
          </h2>
        </div>
        <div className="grid gap-3">
          {questions[currentIndex].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className="w-full text-left p-4 rounded-xl border-2 border-brand-text hover:bg-brand-accent hover:text-white transition group"
            >
              <span className="inline-block w-8 font-bold">{i + 1}</span> {opt}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
