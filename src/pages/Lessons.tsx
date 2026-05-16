import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Lesson {
  id: number;
  phrase: string;
  translation: string;
  film: string;
  filmEmoji: string;
  context: string;
  contextTranslation: string;
  explanation: string;
  example: string;
  exampleTranslation: string;
  youtubeId: string;
  youtubeStart: number;
}

const lessons: Lesson[] = [
  {
    id: 1,
    phrase: "It slipped my mind",
    translation: "Вылетело из головы / Я забыл",
    film: "Король Лев",
    filmEmoji: "🦁",
    context: "— Simba, you need to come home. — I know, I know. It just... it slipped my mind.",
    contextTranslation: "— Симба, тебе нужно вернуться домой. — Знаю, знаю. Просто... вылетело из головы.",
    explanation: "«Slip» означает «выскользнуть». Когда что-то «выскользнуло из твоего разума» — ты об этом забыл. Используется как извинение за забывчивость.",
    example: "Sorry I didn't call — it slipped my mind!",
    exampleTranslation: "Прости, не позвонил — вылетело из головы!",
    youtubeId: "4pcJANFoWPc",
    youtubeStart: 0,
  },
  {
    id: 2,
    phrase: "Are you nuts?!",
    translation: "Ты что, сумасшедший?! / Ты в своём уме?",
    film: "Один дома",
    filmEmoji: "🏠",
    context: "— I'm gonna jump off this roof! — Are you nuts?! Get down from there!",
    contextTranslation: "— Я прыгну с этой крыши! — Ты что, с ума сошёл?! Слезай оттуда!",
    explanation: "«Nuts» в сленге = сумасшедший. «Are you nuts?» — риторический вопрос, выражающий шок или недоверие. Менее грубо, чем «crazy».",
    example: "You ate a whole pizza alone? Are you nuts?!",
    exampleTranslation: "Ты съел целую пиццу один? Ты в своём уме?!",
    youtubeId: "BVqCNFXFQnY",
    youtubeStart: 0,
  },
  {
    id: 3,
    phrase: "Spill the tea",
    translation: "Выкладывай всё / Расскажи сплетни",
    film: "RuPaul's Drag Race",
    filmEmoji: "💅",
    context: "— Oh my god, something happened between them! — Girl, spill the tea right now!",
    contextTranslation: "— О боже, между ними что-то случилось! — Подруга, немедленно выкладывай всё!",
    explanation: "«Tea» в LGBTQ+ и молодёжном сленге = горячие новости, подробности, сплетни. «Spill» = пролить, выложить. Используется когда хочешь узнать подробности.",
    example: "You were at that party — spill the tea!",
    exampleTranslation: "Ты же была на той вечеринке — рассказывай всё!",
    youtubeId: "taIwAP5GDQY",
    youtubeStart: 0,
  },
  {
    id: 4,
    phrase: "Easy peasy, lemon squeezy",
    translation: "Проще простого / Раз плюнуть",
    film: "Шрек",
    filmEmoji: "🟢",
    context: "— How do we get past the dragon? — Easy peasy, lemon squeezy! Watch me.",
    contextTranslation: "— Как нам пройти мимо дракона? — Проще простого! Смотри на меня.",
    explanation: "Детская рифмованная фраза для усиления слова «easy». Используется иронично или когда хочешь показать, что задача тривиальна.",
    example: "— Can you fix this? — Easy peasy, lemon squeezy!",
    exampleTranslation: "— Ты можешь это починить? — Да раз плюнуть!",
    youtubeId: "7bIE4wOAtG0",
    youtubeStart: 0,
  },
  {
    id: 5,
    phrase: "Ghost (to ghost someone)",
    translation: "Пропасть / Перестать отвечать",
    film: "You (сериал)",
    filmEmoji: "👻",
    context: "— Have you heard from Beck? — No, she totally ghosted me. No texts, nothing.",
    contextTranslation: "— Ты слышал что-нибудь от Бек? — Нет, она просто пропала. Никаких сообщений, ничего.",
    explanation: "«Ghost» как глагол — внезапно исчезнуть из чьей-то жизни, перестать отвечать без объяснений. Очень популярный современный сленг.",
    example: "We went on two dates and then he ghosted me.",
    exampleTranslation: "Мы сходили на два свидания, а потом он пропал.",
    youtubeId: "kNmHhAeRVDU",
    youtubeStart: 0,
  },
  {
    id: 6,
    phrase: "Lowkey",
    translation: "Тихо / Немного / Втайне",
    film: "Сплетница",
    filmEmoji: "💋",
    context: "— Does Blair like him? — She lowkey likes him, but she'd never admit it.",
    contextTranslation: "— Блэр нравится ему? — Немного нравится, но она никогда не признается.",
    explanation: "«Lowkey» буквально «тихая тональность». В сленге: немного, в тайне, не афишируя. Противоположность — «highkey» (открыто, очень).",
    example: "I lowkey love this cheesy song.",
    exampleTranslation: "Мне втайне нравится эта пошловатая песня.",
    youtubeId: "fJ9rUzIMcZQ",
    youtubeStart: 0,
  },
  {
    id: 7,
    phrase: "No cap",
    translation: "Серьёзно / Без шуток / Не вру",
    film: "Очень странные дела",
    filmEmoji: "🔴",
    context: "— Wait, you actually saw it?! — No cap, it was right there in the woods.",
    contextTranslation: "— Подожди, ты реально это видел?! — Серьёзно, оно было прямо там в лесу.",
    explanation: "«Cap» в сленге = ложь. «No cap» = никакой лжи, честно. Используется чтобы подчеркнуть правдивость. Часто ставится в конец фразы.",
    example: "That movie was the best thing I've ever seen, no cap.",
    exampleTranslation: "Этот фильм — лучшее, что я видел, без шуток.",
    youtubeId: "b9EkMcFx7RM",
    youtubeStart: 0,
  },
  {
    id: 8,
    phrase: "Delulu",
    translation: "Оторванный от реальности / Живущий в иллюзиях",
    film: "Барби",
    filmEmoji: "👗",
    context: "— She thinks Ken is totally in love with her. — Girl is delulu. He doesn't even know her name.",
    contextTranslation: "— Она думает, что Кен в неё влюблён. — Она живёт в иллюзиях. Он даже не знает её имени.",
    explanation: "Сокращение от «delusional» (иллюзорный). Описывает человека с нереалистичными ожиданиями. Используется с юмором, не всегда как оскорбление.",
    example: "She thinks they're dating after one text. Total delulu.",
    exampleTranslation: "Она думает, что они встречаются после одного сообщения. Полная иллюзия.",
    youtubeId: "pBk4NYhWNMM",
    youtubeStart: 0,
  },
  {
    id: 9,
    phrase: "It slipped my mind / Are you nuts? / No cap",
    translation: "Повторение: вылетело из головы / ты что, псих? / серьёзно",
    film: "Закрепляем всё",
    filmEmoji: "🎓",
    context: "— No cap, I totally forgot about the party. — Are you nuts?! — I know, it slipped my mind!",
    contextTranslation: "— Серьёзно, я совсем забыл про вечеринку. — Ты в своём уме?! — Знаю, вылетело из головы!",
    explanation: "Финальная карточка — три фразы в одном диалоге. Видишь, как сленг работает в живом разговоре? Теперь ты готов к итоговому тесту!",
    example: "Practice using all 8 phrases in one conversation!",
    exampleTranslation: "Попробуй использовать все 8 фраз в одном разговоре!",
    youtubeId: "nfWlot6h_JM",
    youtubeStart: 0,
  },
];

const YoutubeEmbed = ({ videoId, startSeconds }: { videoId: string; startSeconds: number }) => {
  const [showVideo, setShowVideo] = useState(false);

  const src = `https://www.youtube.com/embed/${videoId}?start=${startSeconds}&rel=0&modestbranding=1&autoplay=1`;

  return (
    <div className="mt-6 rounded-xl overflow-hidden border border-white/10 bg-zinc-950">
      {!showVideo ? (
        <button
          onClick={() => setShowVideo(true)}
          className="w-full group relative"
        >
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt="Превью видео"
            className="w-full aspect-video object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-200"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-200">
              <Icon name="Play" size={28} className="text-white ml-1" />
            </div>
          </div>
          <div className="absolute bottom-3 left-3 bg-black/70 rounded-lg px-3 py-1 text-xs text-zinc-300">
            🎬 Сцена из фильма — нажми, чтобы посмотреть
          </div>
        </button>
      ) : (
        <div className="aspect-video">
          <iframe
            src={src}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Отрывок из фильма"
          />
        </div>
      )}
    </div>
  );
};

const Lessons = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completed, setCompleted] = useState<number[]>([]);

  const lesson = lessons[currentIndex];
  const isCompleted = completed.includes(lesson.id);

  const handleNext = () => {
    if (!isCompleted) setCompleted([...completed, lesson.id]);
    if (currentIndex < lessons.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleCardClick = (idx: number) => {
    setCurrentIndex(idx);
    setIsFlipped(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="text-2xl font-bold tracking-tighter text-white hover:text-zinc-300 transition-colors"
          >
            🎬 SlangFilm
          </button>
          <div className="flex items-center gap-4">
            <span className="text-zinc-400 text-sm">{completed.length}/{lessons.length} изучено</span>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => navigate("/")}
            >
              Пройти тест →
            </Button>
          </div>
        </div>
      </header>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Уроки киносленга</h1>
            <p className="text-zinc-400">Нажми на карточку, чтобы увидеть перевод и объяснение</p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-zinc-800 rounded-full h-1.5 mb-8">
            <div
              className="bg-white h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(completed.length / lessons.length) * 100}%` }}
            />
          </div>

          {/* Flip card */}
          <div
            className="w-full cursor-pointer mb-4"
            style={{ perspective: "1200px" }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div
              className="relative transition-transform duration-500"
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                minHeight: "300px",
              }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 rounded-2xl bg-zinc-900 border border-white/10 p-8 flex flex-col justify-between"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="flex justify-between items-start">
                  <span className="text-purple-400 text-sm bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1">
                    {lesson.filmEmoji} {lesson.film}
                  </span>
                  <span className="text-zinc-500 text-sm">{currentIndex + 1} / {lessons.length}</span>
                </div>
                <div className="text-center py-6">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                    "{lesson.phrase}"
                  </div>
                  <div className="text-zinc-500 text-sm italic">{lesson.context}</div>
                </div>
                <div className="flex items-center justify-center gap-2 text-zinc-500 text-sm">
                  <Icon name="RotateCw" size={14} />
                  Нажми, чтобы узнать значение
                </div>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 rounded-2xl bg-zinc-900 border border-purple-500/30 p-8 flex flex-col justify-between"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <div className="flex justify-between items-start">
                  <span className="text-purple-400 text-sm bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1">
                    {lesson.filmEmoji} {lesson.film}
                  </span>
                  <span className="text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">
                    Перевод
                  </span>
                </div>
                <div className="py-3 space-y-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">"{lesson.phrase}"</div>
                    <div className="text-xl text-green-400 font-semibold">{lesson.translation}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-zinc-400 text-sm leading-relaxed">{lesson.explanation}</p>
                  </div>
                  <div className="bg-purple-500/5 rounded-xl p-3 border border-purple-500/20">
                    <p className="text-white text-sm italic">"{lesson.example}"</p>
                    <p className="text-zinc-400 text-xs mt-1">— {lesson.exampleTranslation}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-zinc-500 text-sm">
                  <Icon name="RotateCw" size={14} />
                  Нажми, чтобы перевернуть
                </div>
              </div>
            </div>
          </div>

          {/* YouTube video */}
          <YoutubeEmbed videoId={lesson.youtubeId} startSeconds={lesson.youtubeStart} key={lesson.id} />

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-6 mb-12">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-6"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              ← Назад
            </Button>
            <Button
              className="bg-white text-black hover:bg-zinc-200 px-8 font-semibold"
              onClick={handleNext}
              disabled={currentIndex === lessons.length - 1}
            >
              {isCompleted ? "Следующая →" : "Изучил! →"}
            </Button>
          </div>

          {/* Cards grid */}
          <div>
            <h2 className="text-xl font-bold text-white mb-5 text-center">Все карточки</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {lessons.map((l, idx) => {
                const done = completed.includes(l.id);
                const active = idx === currentIndex;
                return (
                  <button
                    key={l.id}
                    onClick={() => handleCardClick(idx)}
                    className={`rounded-xl p-3 border text-left transition-all duration-200 hover:scale-105 ${
                      active
                        ? "border-white/50 bg-white/10"
                        : done
                        ? "border-green-500/30 bg-green-500/5"
                        : "border-white/10 bg-zinc-900/50 hover:border-white/20"
                    }`}
                  >
                    <div className="text-lg mb-1">{l.filmEmoji}</div>
                    <div className="text-xs font-semibold text-white leading-tight">
                      {l.phrase.length > 16 ? l.phrase.slice(0, 16) + "…" : l.phrase}
                    </div>
                    {done && <div className="mt-1 text-green-400 text-xs">✓</div>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Completion */}
          {completed.length === lessons.length && (
            <div className="mt-10 text-center bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-8">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-2xl font-bold text-white mb-2">Все карточки изучены!</h3>
              <p className="text-zinc-400 mb-6">Ты готов к итоговому тесту</p>
              <Button
                className="bg-white text-black hover:bg-zinc-200 px-10 py-5 text-lg font-semibold"
                onClick={() => navigate("/")}
              >
                Пройти итоговый тест →
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lessons;
