import { poems } from "@/data/poems";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">百人一首一覧</h1>
          <Link
            href="/quiz"
            className="inline-block bg-brand-accent text-white px-8 py-3 rounded-full hover:opacity-90 transition"
          >
            クイズに挑戦する
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {poems.map((poem) => (
            <div
              key={poem.id}
              className="bg-brand-paper p-6 rounded-lg border-2 border-brand-text shadow-sm"
            >
              <span className="text-base text-brand-accent font-bold">
                第{poem.id}首
              </span>
              <p className="mt-2 text-lg leading-relaxed font-bold">
                {poem.kami}
              </p>
              <p className="mt-1 text-lg leading-relaxed font-bold">
                {poem.shimo}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
