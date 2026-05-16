import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const HeroSection = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const opacity = Math.max(0, 1 - scrolled / (windowHeight * 0.5));
      setScrollOpacity(opacity);
      setScrollY(scrolled * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    { icon: "Film", label: "Фильмов и мультфильмов", value: "50+" },
    { icon: "MessageSquare", label: "Сленговых фраз", value: "500+" },
    { icon: "Users", label: "Студентов прошли курс", value: "1200+" },
    { icon: "Trophy", label: "Успешных тестов", value: "95%" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={containerRef} className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-black"></div>
      </div>

      <div
        style={{ transform: `translateY(${scrollY}px)`, opacity: scrollOpacity }}
        className="relative pt-40 pb-16 px-4 transition-opacity duration-100 flex items-center min-h-screen"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block bg-white/10 border border-white/20 rounded-full px-4 py-1 text-sm text-zinc-300 mb-6">
              🎬 Учи английский так, как говорят в кино
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
                Сленг из фильмов
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-zinc-400 max-w-3xl mx-auto">
              Живой английский через сцены из любимых фильмов и мультфильмов. Никакой скуки — только
              реальный язык, на котором говорят носители.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative inline-block">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-zinc-200 text-lg px-8 py-6 rounded-full transition-all duration-300 hover:scale-105"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => navigate("/lessons")}
                >
                  <span className="relative z-10">Начать учиться</span>
                  <span
                    className={`ml-2 relative z-10 transition-transform duration-200 ${
                      isHovered ? "translate-x-1" : ""
                    }`}
                  >
                    &rarr;
                  </span>
                </Button>
              </div>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full"
                onClick={() => scrollToSection("test")}
              >
                Пройти тест
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="bg-zinc-900/50 rounded-xl p-6 backdrop-blur-lg border border-white/10 transition-all duration-300 hover:scale-105 hover:border-white/20">
                  <div className="mb-2 text-white/70 flex justify-center">
                    <Icon name={stat.icon} size={24} />
                  </div>
                  <div className="text-3xl font-bold mb-1 text-white">{stat.value}</div>
                  <div className="text-sm text-zinc-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;