import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Question {
  id: number;
  question: string;
  film: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "В «Друзьях» Джои говорит «How you doin'?». Что это значит?",
    film: "Friends",
    options: ["Как дела? (флирт)", "Ты в порядке?", "Что ты делаешь?", "Куда идёшь?"],
    correct: 0,
    explanation: "«How you doin'?» — фирменная фраза Джои, используется как флирт или дружеское приветствие.",
  },
  {
    id: 2,
    question: "Из «Шрека»: «That'll do, Donkey. That'll do.» — что имеет в виду Шрек?",
    film: "Shrek",
    options: ["Молодец, хватит", "Делай это сам", "Ты справишься", "Не делай этого"],
    correct: 0,
    explanation: "«That'll do» — разговорное «хватит» или «достаточно», иногда с оттенком похвалы.",
  },
  {
    id: 3,
    question: "В «Во все тяжкие» часто говорят «to cook». Что это значит в контексте сленга?",
    film: "Breaking Bad",
    options: ["Готовить наркотики", "Хорошо готовить еду", "Злиться", "Торопиться"],
    correct: 0,
    explanation: "В уличном сленге «to cook» — производить наркотики, особенно метамфетамин.",
  },
  {
    id: 4,
    question: "«That's what she said» из «Офиса» — это:",
    film: "The Office",
    options: [
      "Пошлая шутка-каламбур",
      "Цитата реального человека",
      "Выражение удивления",
      "Способ согласиться",
    ],
    correct: 0,
    explanation: "Коронная фраза Майкла Скотта — добавляется после двусмысленного высказывания для пошлого юмора.",
  },
  {
    id: 5,
    question: "В «Семейном парне» Стьюи говорит «What the deuce?». Что это?",
    film: "Family Guy",
    options: [
      "Смягчённая версия «What the hell?»",
      "Выражение радости",
      "Приветствие",
      "Угроза",
    ],
    correct: 0,
    explanation: "«Deuce» — эвфемизм вместо грубого слова. «What the deuce?» = «Какого чёрта?»",
  },
  {
    id: 6,
    question: "«I'm gonna make him an offer he can't refuse» — из «Крёстного отца». Что подразумевается?",
    film: "The Godfather",
    options: [
      "Угроза под видом предложения",
      "Выгодная деловая сделка",
      "Просьба о помощи",
      "Комплимент",
    ],
    correct: 0,
    explanation: "Классическая фраза — завуалированная угроза. В сленге означает давление, от которого невозможно отказаться.",
  },
];

const TestSection = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const q = questions[current];
  const isCorrect = selected === q.correct;

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
  };

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected === q.correct];
    if (current + 1 >= questions.length) {
      setAnswers(newAnswers);
      setShowResult(true);
    } else {
      setAnswers(newAnswers);
      setCurrent(current + 1);
      setSelected(null);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setShowResult(false);
  };

  const score = answers.filter(Boolean).length;

  const getResultMessage = () => {
    if (score === questions.length) return { emoji: "🏆", text: "Идеальный результат! Ты настоящий знаток киносленга!", color: "text-yellow-400" };
    if (score >= 4) return { emoji: "🎬", text: "Отличный результат! Тебе точно зайдёт наш курс!", color: "text-green-400" };
    if (score >= 2) return { emoji: "📽️", text: "Неплохо! Но есть куда расти — курс поможет!", color: "text-blue-400" };
    return { emoji: "🎓", text: "Самое время начать изучение сленга с нуля!", color: "text-purple-400" };
  };

  return (
    <section id="test" ref={ref} className="py-20 bg-zinc-900 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />

      <div
        className={`container mx-auto px-4 relative z-10 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold text-white mb-3">Итоговый тест</h2>
          <p className="text-zinc-400 text-lg">Проверь знание киносленга — 6 вопросов из реальных фильмов</p>
        </div>

        <div className="max-w-2xl mx-auto">
          {!showResult ? (
            <div className="bg-black/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="flex justify-between items-center mb-6">
                <span className="text-zinc-400 text-sm">Вопрос {current + 1} из {questions.length}</span>
                <span className="text-purple-400 text-sm bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1">
                  🎬 {q.film}
                </span>
              </div>

              <div className="w-full bg-zinc-800 rounded-full h-1.5 mb-8">
                <div
                  className="bg-white h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${((current) / questions.length) * 100}%` }}
                />
              </div>

              <h3 className="text-xl font-semibold text-white mb-6 leading-relaxed">{q.question}</h3>

              <div className="space-y-3 mb-6">
                {q.options.map((opt, idx) => {
                  let style = "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:border-white/20 cursor-pointer";
                  if (selected !== null) {
                    if (idx === q.correct) style = "bg-green-500/20 border-green-500/50 text-green-300 cursor-default";
                    else if (idx === selected && selected !== q.correct) style = "bg-red-500/20 border-red-500/50 text-red-300 cursor-default";
                    else style = "bg-white/5 border-white/5 text-zinc-500 cursor-default";
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 ${style}`}
                    >
                      <span className="font-medium mr-3 text-zinc-500">{String.fromCharCode(65 + idx)}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {selected !== null && (
                <div className={`rounded-xl px-5 py-4 mb-6 border ${isCorrect ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"}`}>
                  <div className="flex items-start gap-3">
                    <Icon name={isCorrect ? "CheckCircle" : "XCircle"} size={20} className={isCorrect ? "text-green-400 mt-0.5 shrink-0" : "text-red-400 mt-0.5 shrink-0"} />
                    <p className={`text-sm ${isCorrect ? "text-green-300" : "text-red-300"}`}>
                      {q.explanation}
                    </p>
                  </div>
                </div>
              )}

              <Button
                onClick={handleNext}
                disabled={selected === null}
                className="w-full bg-white text-black hover:bg-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed py-5 rounded-xl text-base font-semibold"
              >
                {current + 1 === questions.length ? "Показать результат" : "Следующий вопрос"} →
              </Button>
            </div>
          ) : (
            <div className="bg-black/50 backdrop-blur-lg rounded-2xl p-10 border border-white/10 text-center">
              <div className="text-6xl mb-4">{getResultMessage().emoji}</div>
              <div className="text-7xl font-bold text-white mb-2">{score}/{questions.length}</div>
              <p className={`text-xl font-semibold mb-2 ${getResultMessage().color}`}>
                {getResultMessage().text}
              </p>
              <p className="text-zinc-400 mb-8">Правильных ответов: {score} из {questions.length}</p>

              <div className="flex gap-3 flex-wrap justify-center mb-8">
                {answers.map((correct, i) => (
                  <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${correct ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
                    {i + 1}
                  </div>
                ))}
              </div>

              <div className="flex gap-3 flex-col sm:flex-row justify-center">
                <Button
                  onClick={handleRestart}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-5"
                >
                  Пройти снова
                </Button>
                <Button
                  className="bg-white text-black hover:bg-zinc-200 px-8 py-5 font-semibold"
                  onClick={() => {
                    const el = document.getElementById("courses");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Начать курс →
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestSection;
