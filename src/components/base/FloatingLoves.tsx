import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface HeartProps {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<HeartProps[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 10 + Math.random() * 14,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 10,
      opacity: 0.2 + Math.random() * 0.3,
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute animate-floatHeart text-primary"
          style={{
            left: `${h.left}%`,
            bottom: "-30px",
            opacity: h.opacity,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            animationFillMode: "forwards",
          }}
        >
          <Heart width={h.size} height={h.size} className="fill-current" />
        </div>
      ))}

      <style> {`
        @keyframes floatHeart {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translateY(-50vh) rotate(180deg);
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }

        .animate-floatHeart {
          animation-name: floatHeart;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
      `}</style>
    </div>
  );
};

export default FloatingHearts;
