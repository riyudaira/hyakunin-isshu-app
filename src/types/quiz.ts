export type QuizQuestion = {
  question: string;
  correctAnswer: string;
  options: string[];
  type: "kami-to-shimo" | "shimo-to-kami";
};
