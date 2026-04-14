import type { MailStyle } from "@/lib/mailStyle";
import { Heart } from "lucide-react";

interface MailPreviewProps {
  style: MailStyle;
  recipientName: string;
  message: string;
  subject?: string;
}

const SoftCrushDecor = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-bounce opacity-60"
        style={{
          left: `${15 + i * 14}%`,
          bottom: "-10px",
          animationDuration: `${3 + i}s`,
        }}
      >
        {/* <FloatingLoves /> */}

        <Heart className="fill-[#FF6B9A] text-[#FF6B9A] w-4 h-4" />
      </div>
    ))}
  </div>
);

const MidnightDecor = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute bg-white rounded-full opacity-30 animate-pulse"
        style={{
          width: `${1 + Math.random() * 2}px`,
          height: `${1 + Math.random() * 2}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      />
    ))}
  </div>
);

const VintageDecor = () => (
  <div className="absolute inset-0 pointer-events-none rounded-lg bg-[repeating-linear-gradient(0deg,transparent,transparent_28px,rgba(139,94,60,0.08)_28px,rgba(139,94,60,0.08)_29px)]" />
);

const DreamyDecor = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full animate-pulse"
        style={{
          width: 60 + i * 30,
          height: 60 + i * 30,
          left: `${10 + i * 18}%`,
          top: `${20 + (i % 3) * 25}%`,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.15), transparent)",
          animationDuration: `${4 + i}s`,
        }}
      />
    ))}
  </div>
);

const CuteChaosDecor = () => {
  const emojis = ["❤️", "⭐", "✨", "💕", "🎀"];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {emojis.map((emoji, i) => (
        <span
          key={i}
          className="absolute text-lg animate-bounce"
          style={{
            left: `${10 + i * 18}%`,
            top: `${10 + (i % 3) * 30}%`,
            animationDuration: `${1.5 + i * 0.3}s`,
          }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
};

const RoyalDecor = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute inset-0 animate-[slide_4s_linear_infinite] bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent" />
  </div>
);

const AiryDecor = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-blue-400/10 animate-pulse"
        style={{
          width: 40 + i * 20,
          height: 40 + i * 20,
          left: `${20 + i * 18}%`,
          top: `${30 + (i % 2) * 30}%`,
          animationDuration: `${3 + i}s`,
        }}
      />
    ))}
  </div>
);

const decorMap: Record<number, React.FC> = {
  1: SoftCrushDecor,
  2: MidnightDecor,
  3: VintageDecor,
  4: DreamyDecor,
  5: CuteChaosDecor,
  6: () => null,
  7: RoyalDecor,
  8: AiryDecor,
};

const TextContent = ({
  style,
  message,
}: {
  style: MailStyle;
  message: string;
}) => {
  const displayMsg =
    message || "Your heartfelt words will appear here as you type...";

  if (style.id === 6) {
    return (
      <div className="min-h-[100px] space-y-2">
        {displayMsg.split("\n").map((line, i) => (
          <p
            key={i}
            data-aos="fade-right"
            data-aos-delay={i * 150}
            style={{ fontFamily: style.fontFamily, color: style.text }}
            className="text-base leading-relaxed"
          >
            {line || "\u00A0"}
          </p>
        ))}
      </div>
    );
  }

  return (
    <p
      data-aos="fade-up"
      style={{ fontFamily: style.fontFamily, color: style.text }}
      className="text-base leading-relaxed whitespace-pre-wrap min-h-[100px]"
    >
      {displayMsg}
    </p>
  );
};

const MailPreview = ({
  style,
  recipientName,
  message,
  subject,
}: MailPreviewProps) => {
  const Decor = decorMap[style.id] || (() => null);

  return (
    <div
      data-aos="zoom-in"
      className={`relative ${style.bg} ${style.borderStyle} ${style.shadow} p-8 md:p-10 min-h-[420px] overflow-hidden`}
    >
      <Decor />
      <div className="relative z-10">
        <p
          data-aos="fade-down"
          style={{ fontFamily: style.fontFamily, color: style.subtext }}
          className="text-sm mb-6 opacity-70"
        >
          {subject || `A letter for someone special`}
        </p>

        <h2
          data-aos="fade-up"
          style={{ fontFamily: style.fontFamily, color: style.text }}
          className="text-3xl font-bold mb-4"
        >
          {recipientName || "Dear You"},
        </h2>

        <TextContent style={style} message={message} />

        <div
          //  data-aos="fade-up"
          className="mt-10 flex items-center gap-2"
        >
          <Heart className="h-4 w-4 text-pink-500" />
          <p
            style={{ fontFamily: style.fontFamily, color: style.text }}
            className="text-sm font-medium"
          >
            With all my love
          </p>
        </div>
      </div>
    </div>
  );
};

export default MailPreview;
