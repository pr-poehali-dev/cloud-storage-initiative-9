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
    question: "«It slipped my mind» — что означает эта фраза из «Короля Льва»?",
    film: "🦁 Король Лев",
    options: ["Я забыл об этом", "Это меня расстроило", "Мне пришла идея", "Я передумал"],
    correct: 0,
    explanation: "«It slipped my mind» — разговорное «вылетело из головы», «я забыл». Буквально: «выскользнуло из разума».",
  },
  {
    id: 2,
    question: "Кевин кричит «Are you nuts?!» в «Один дома». Что он имеет в виду?",
    film: "🏠 Один дома",
    options: ["Ты что, сумасшедший?!", "Ты любишь орехи?", "Ты серьёзно?", "Тебе не страшно?"],
    correct: 0,
    explanation: "«Are you nuts?» — сленговое «ты что, псих?» или «ты в своём уме?». «Nuts» = сумасшедший.",
  },
  {
    id: 3,
    question: "«Spill the tea» из RuPaul's Drag Race — что значит эта фраза?",
    film: "💅 RuPaul's Drag Race",
    options: ["Расскажи сплетни / выложи всё", "Разлей чай", "Успокойся", "Поделись едой"],
    correct: 0,
    explanation: "«Spill the tea» — «выкладывай подробности», «расскажи, что случилось». «Tea» в сленге = горячие новости или сплетни.",
  },
  {
    id: 4,
    question: "«Easy peasy, lemon squeezy» — Шрек говорит это, когда задание кажется ему...",
    film: "🟢 Шрек",
    options: ["Очень простым", "Кислым и неприятным", "Срочным", "Смешным"],
    correct: 0,
    explanation: "«Easy peasy, lemon squeezy» — детское выражение «проще простого», «раз плюнуть». Усиленная версия слова «easy».",
  },
  {
    id: 5,
    question: "«She totally ghosted me» из сериала «You» — что произошло?",
    film: "👻 You",
    options: ["Она перестала отвечать и пропала", "Она напугала меня", "Она обманула меня", "Она ушла от меня"],
    correct: 0,
    explanation: "«Ghost» как глагол — внезапно прекратить общение, перестать отвечать на сообщения без объяснений.",
  },
  {
    id: 6,
    question: "«She lowkey likes him» из «Сплетницы» — что это значит?",
    film: "💋 Сплетница",
    options: ["Она громко его любит", "Она его ненавидит втайне", "Она немного, втихаря ему симпатизирует", "Она открыто им восхищается"],
    correct: 2,
    explanation: "«Lowkey» — тихо, незаметно, слегка. «She lowkey likes him» = «она немного симпатизирует ему, хотя не признаётся».",
  },
  {
    id: 7,
    question: "«No cap» — фраза из «Очень странных дел». Что она означает?",
    film: "🔴 Очень странные дела",
    options: ["Без шапки", "Без преувеличений / серьёзно", "Не останавливайся", "Без ограничений"],
    correct: 1,
    explanation: "«No cap» = «не шучу», «серьёзно», «без лжи». «Cap» в сленге — ложь. «No cap» — «никакой лжи».",
  },
  {
    id: 8,
    question: "«She's so delulu» из фильма «Барби» — что это значит?",
    film: "👗 Барби",
    options: ["Она такая милая", "Она живёт в иллюзиях / оторвана от реальности", "Она очень смелая", "Она сумасбродная модница"],
    correct: 1,
    explanation: "«Delulu» — сокращение от «delusional» (иллюзорный). В сленге: человек, который верит в нереалистичные вещи о себе или других.",
  },
  {
    id: 9,
    question: "Какую фразу правильно использовать, если хочешь попросить друга рассказать подробности?",
    film: "🎬 Итоговый вопрос",
    options: ["Spill the tea!", "Ghost me!", "No cap, lowkey!", "It slipped my mind!"],
    correct: 0,
    explanation: "«Spill the tea!» = «выкладывай всё!» — именно так просят рассказать подробности или сплетни.",
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
    if (score >= 7) return { emoji: "🎬", text: "Отличный результат! Ты чувствуешь живой английский!", color: "text-green-400" };
    if (score >= 4) return { emoji: "📽️", text: "Неплохо! Курс поможет прокачать остальное!", color: "text-blue-400" };
    return { emoji: "🎓", text: "Самое время начать изучение сленга с нуля!", color: "text-purple-400" };
  };

  return (
    <section id="test" ref={ref} className="py-20 bg-zinc-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />

      <div
        className={`container mx-auto px-4 relative z-10 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold text-white mb-3">Итоговый тест</h2>
          <p className="text-zinc-400 text-lg">9 реальных фраз из фильмов, мультиков и сериалов курса</p>
        </div>

        <div className="max-w-2xl mx-auto">
          {!showResult ? (
            <div className="bg-black/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-zinc-400 text-sm">Вопрос {current + 1} из {questions.length}</span>
                <span className="text-purple-400 text-sm bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1">
                  {q.film}
                </span>
              </div>

              <div className="w-full bg-zinc-800 rounded-full h-1.5 mb-8">
                <div
                  className="bg-white h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${(current / questions.length) * 100}%` }}
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
                    <Icon
                      name={isCorrect ? "CheckCircle" : "XCircle"}
                      size={20}
                      className={isCorrect ? "text-green-400 mt-0.5 shrink-0" : "text-red-400 mt-0.5 shrink-0"}
                    />
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
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      correct
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}
                  >
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
                    const el = document.getElementById("about");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Узнать о курсе →
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
