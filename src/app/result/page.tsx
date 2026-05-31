"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type QuizDetail = { q: string; a: string; isCorrect: boolean };
type QuizResultData = { score: number; details: QuizDetail[] };

export default function ResultPage() {
  const [result, setResult] = useState<QuizResultData | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem("quizResult");

    const timer = setTimeout(() => {
      if (data) {
        try {
          setResult(JSON.parse(data));
        } catch (e) {
          console.error("Failed to parse quiz result", e);
        }
      }
      setIsMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="mb-4 text-brand-text">結果が見つかりませんでした。</p>
        <Link href="/" className="text-brand-accent underline">
          トップへ戻る
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto bg-brand-paper p-8 rounded-2xl shadow-lg border-2 border-brand-text">
        <h1 className="text-3xl font-bold text-center mb-8">結果発表</h1>

        <div className="text-center mb-12">
          <p className="text-xl">正解数</p>
          <p className="text-6xl font-bold text-brand-accent">
            {result.score} / 5
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold border-b-2 border-brand-accent pb-2">
            答え合わせ
          </h2>
          {result.details.map((item, i) => (
            <div key={i} className="bg-white p-4 rounded-lg border">
              <p className="text-sm font-bold mb-1">
                {item.isCorrect ? "⭕ 正解" : "❌ 不正解"}
              </p>
              <p className="text-sm text-gray-600">問題：{item.q}</p>
              <p className="font-bold text-brand-accent">正解：{item.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex gap-4">
          <Link
            href="/quiz"
            className="flex-1 text-center bg-brand-accent text-white py-3 rounded-lg"
          >
            もう一度挑戦
          </Link>
          <Link
            href="/"
            className="flex-1 text-center bg-brand-text text-white py-3 rounded-lg"
          >
            一覧に戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
