 export interface MailStyle {
  id: number;
  name: string;
  emoji: string;
  mood: string;
  fontFamily: string;
  fontImport: string;
  bg: string;
  cardBg: string;
  accent: string;
  text: string;
  subtext: string;
  borderStyle: string;
  shadow: string;
  previewClass: string;
}

export const mailStyles: MailStyle[] = [
  {
    id: 1,
    name: "Soft Crush",
    emoji: "🌸",
    mood: "Cute & Lighthearted",
    fontFamily: "'Quicksand', sans-serif",
    fontImport: "Quicksand:wght@400;500;600;700",
    bg: "bg-[#FFF0F5]",
    cardBg: "bg-[#FFF0F5]",
    accent: "#FF6B9A",
    text: "#333333",
    subtext: "#FF6B9A",
    borderStyle: "border-2 border-[#FFB6C1] rounded-3xl",
    shadow: "shadow-[0_8px_32px_rgba(255,107,154,0.15)]",
    previewClass: "soft-crush-preview",
  },
  {
    id: 2,
    name: "Midnight Love",
    emoji: "💎",
    mood: "Deep & Romantic",
    fontFamily: "'Cinzel', serif",
    fontImport: "Cinzel:wght@400;500;600;700",
    bg: "bg-[#0B0B1A]",
    cardBg: "bg-[#0B0B1A]/80 backdrop-blur-xl",
    accent: "#8B5CF6",
    text: "#EDEDED",
    subtext: "#8B5CF6",
    borderStyle: "border border-[#8B5CF6]/30 rounded-2xl",
    shadow: "shadow-[0_0_40px_rgba(139,92,246,0.2)]",
    previewClass: "midnight-love-preview",
  },
  {
    id: 3,
    name: "Vintage Memory",
    emoji: "📜",
    mood: "Nostalgic & Timeless",
    fontFamily: "'Dancing Script', cursive",
    fontImport: "Dancing+Script:wght@400;500;600;700",
    bg: "bg-[#F5E6CC]",
    cardBg: "bg-[#F5E6CC]",
    accent: "#8B5E3C",
    text: "#3B2F2F",
    subtext: "#8B5E3C",
    borderStyle: "border-2 border-[#D4B896] rounded-lg",
    shadow: "shadow-[4px_4px_0_rgba(139,94,60,0.15)]",
    previewClass: "vintage-memory-preview",
  },
  {
    id: 4,
    name: "Dreamy Love",
    emoji: "🌈",
    mood: "Magical & Surreal",
    fontFamily: "'Nunito', sans-serif",
    fontImport: "Nunito:wght@300;400;600;700",
    bg: "bg-gradient-to-br from-[#fbc2eb] via-[#a6c1ee] to-[#c2e9fb]",
    cardBg: "bg-white/20 backdrop-blur-lg",
    accent: "#FFFFFF",
    text: "#FFFFFF",
    subtext: "rgba(255,255,255,0.8)",
    borderStyle: "border border-white/30 rounded-3xl",
    shadow: "shadow-[0_8px_32px_rgba(255,255,255,0.2)]",
    previewClass: "dreamy-love-preview",
  },
  {
    id: 5,
    name: "Cute Chaos",
    emoji: "🧸",
    mood: "Fun & Playful",
    fontFamily: "'Baloo 2', cursive",
    fontImport: "Baloo+2:wght@400;500;600;700",
    bg: "bg-[#FFF7D6]",
    cardBg: "bg-[#FFF7D6]",
    accent: "#FF4D6D",
    text: "#222222",
    subtext: "#FF4D6D",
    borderStyle: "border-3 border-dashed border-[#FF4D6D] rounded-2xl",
    shadow: "shadow-[3px_3px_0_#FF4D6D]",
    previewClass: "cute-chaos-preview",
  },
  {
    id: 6,
    name: "Silent Devotion",
    emoji: "🕯️",
    mood: "Calm & Deep",
    fontFamily: "'Lora', serif",
    fontImport: "Lora:wght@400;500;600;700&family=Lora:ital,wght@1,400;1,500",
    bg: "bg-[#FAFAFA]",
    cardBg: "bg-[#FAFAFA]",
    accent: "#B91C1C",
    text: "#111111",
    subtext: "#B91C1C",
    borderStyle: "border border-[#E5E5E5] rounded-lg",
    shadow: "shadow-sm",
    previewClass: "silent-devotion-preview",
  },
  {
    id: 7,
    name: "Royal Love",
    emoji: "🌹",
    mood: "Elegant & Luxurious",
    fontFamily: "'Cormorant Garamond', serif",
    fontImport: "Cormorant+Garamond:wght@400;500;600;700",
    bg: "bg-[#1A1A1A]",
    cardBg: "bg-[#1A1A1A]",
    accent: "#D4AF37",
    text: "#F5F5F5",
    subtext: "#D4AF37",
    borderStyle: "border-2 border-[#D4AF37]/40 rounded-xl",
    shadow: "shadow-[0_0_30px_rgba(212,175,55,0.1)]",
    previewClass: "royal-love-preview",
  },
  {
    id: 8,
    name: "Airy Love",
    emoji: "🫧",
    mood: "Light & Peaceful",
    fontFamily: "'Manrope', sans-serif",
    fontImport: "Manrope:wght@300;400;500;600;700",
    bg: "bg-[#F8FAFC]",
    cardBg: "bg-white",
    accent: "#60A5FA",
    text: "#1F2937",
    subtext: "#60A5FA",
    borderStyle: "border border-[#E2E8F0] rounded-2xl",
    shadow: "shadow-[0_4px_20px_rgba(96,165,250,0.08)]",
    previewClass: "airy-love-preview",
  },
];


export const getStyleFontsUrl = () => {
  const families = mailStyles.map((s) => `family=${s.fontImport}`).join("&");
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
};
