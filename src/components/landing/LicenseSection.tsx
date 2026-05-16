import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

interface CourseModule {
  name: string;
  level: string;
  icon: string;
  topics: string[];
  films: string;
  popular?: boolean;
  badge?: string;
}

const courseModules: CourseModule[] = [
  {
    name: "Уличный сленг",
    level: "Начальный",
    icon: "Zap",
    topics: [
      "Приветствия и прощания",
      "Выражения удивления",
      "Сленг молодёжи",
      "Базовые ругательства",
      "Фразы одобрения",
      "Разговор о деньгах",
    ],
    films: "Friends, The Fresh Prince",
    badge: "С НУЛЯ!",
  },
  {
    name: "Офисный и деловой",
    level: "Средний",
    icon: "Briefcase",
    topics: [
      "Бизнес-сленг",
      "Фразовые глаголы",
      "Идиомы на работе",
      "Переговоры и убеждение",
      "Светская беседа",
      "Выражения недовольства",
    ],
    films: "The Office, Suits, Silicon Valley",
    popular: true,
  },
  {
    name: "Криминальный и уличный",
    level: "Продвинутый",
    icon: "Shield",
    topics: [
      "Жаргон преступного мира",
      "Полицейский сленг",
      "Выражения угрозы",
      "Переговоры под давлением",
      "Тюремный жаргон",
    ],
    films: "Breaking Bad, Pulp Fiction, The Wire",
  },
  {
    name: "Мультяшный и семейный",
    level: "Для всех",
    icon: "Smile",
    topics: [
      "Детский и подростковый сленг",
      "Юмор и сарказм",
      "Выражения из мультфильмов",
      "Американский юмор",
      "Pop culture отсылки",
      "Сленг 90-х и 2000-х",
    ],
    films: "Shrek, Family Guy, South Park",
  },
];

const LicenseSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTest = () => {
    const el = document.getElementById("test");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} id="courses" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/20 to-black"></div>

      <div className="container mx-auto px-4 relative">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">Выбери свой модуль</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Каждый модуль — это отдельный жанр кино. Учи сленг в контексте и запоминай навсегда
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courseModules.map((module, index) => (
            <div
              key={module.name}
              className={`transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card
                className={`relative h-full bg-black border-white/10 ${
                  hoveredCard === index ? "scale-105" : "scale-100"
                } transition-all duration-300`}
              >
                <div className="absolute inset-0 rounded-lg p-[1px] bg-gradient-to-br from-white/20 to-white/0">
                  <div className="absolute inset-0 rounded-lg bg-black"></div>
                </div>

                {module.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold animate-pulse">
                      Популярный
                    </span>
                  </div>
                )}

                <CardContent className="relative p-6 rounded-lg h-full flex flex-col">
                  <div className="text-center mb-6">
                    <div className="inline-flex p-3 rounded-full bg-zinc-900 border border-white/10 mb-4">
                      <Icon name={module.icon} size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-1 text-white">{module.name}</h3>
                    <div className="text-sm text-zinc-400 mb-2">Уровень: {module.level}</div>
                    <div className="text-xs text-purple-400 bg-purple-500/10 rounded-full px-3 py-1 inline-block border border-purple-500/20">
                      🎬 {module.films}
                    </div>
                  </div>

                  <div className="flex-grow">
                    <ul className="space-y-3 mb-6">
                      {module.topics.map((topic, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-white mr-2 shrink-0 mt-0.5" />
                          <span className="text-sm text-zinc-300">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {module.badge && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-white bg-white/5 py-2 px-3 rounded-lg border border-white/10 animate-pulse text-center">
                        {module.badge}
                      </p>
                    </div>
                  )}

                  <Button
                    className="w-full bg-white text-black hover:bg-zinc-200 transition-colors"
                    onClick={scrollToTest}
                  >
                    Начать модуль
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LicenseSection;
