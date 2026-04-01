import { ArrowRight, Bookmark,  Sparkles, type LucideIcon } from "lucide-react";
import Card from "../base/Card";
import { Button } from "../ui/button";
import { useState } from "react";

type PropType = {
  icon?: LucideIcon;
  title?: string;
  description?: string;
};

interface Props {
  date: PropType;
  filter: string[];
  location: string;
}

function DateCard({ date, filter, location }: Props) {
  const IconComponent = date.icon;
  const [places, setPlaces] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  const suggestPlaces = async () => {
    const loc = location.trim() || "Lagos, Nigeria";
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 400,
          system:
            "You suggest real, specific local venues for dates. Return exactly 3 places, each as: '• Place Name — one sentence why it's perfect.' No extra text.",
          messages: [
            {
              role: "user",
              content: `Suggest 3 real places in or near "${loc}" for a "${date.title}" date (vibe: ${filter.join(", ")}). Only suggest real venues that exist there.`,
            },
          ],
        }),
      });
      const data = await res.json();
      console.log(data, 'datat');
      
      setPlaces(data.content?.map((b: { text?: string }) => b.text || "").join("") || null);
    } catch {
      setPlaces("Could not load suggestions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="space-y-4">
      <div className="flex justify-between items-center">
        {IconComponent && <IconComponent size={30} className="p-2  rounded-full bg-primary text-white"/>}
        <Bookmark size={18} />
      </div>

      <div className="space-y-2">
        <p className="font-medium text-lg">{date.title}</p>
        <p className="text-sm text-text">{date.description}</p>
      </div>

      <div className="flex gap-2 flex-wrap mt-2">
        {filter.map((item, index) => (
          <Button
            key={index}
            size="sm"
            variant="secondary"
            className="rounded-full"
          >
            {item}
          </Button>
        ))}
      </div>

      {places && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm text-text whitespace-pre-line">
          <p className="font-medium text-primary mb-1">✦ Suggested Places</p>
          {places}
        </div>
      )}

      <Button
        variant="outline"
        className="w-full"
        onClick={suggestPlaces}
        disabled={loading}
      >
        {loading ? (
          "Finding places..."
        ) : (
          <>
            <Sparkles size={14} className="mr-1" /> Suggest Real Places
          </>
        )}
      </Button>

      <Button className="mt-3 w-full">
        Plan This Date <ArrowRight className="ml-2" />
      </Button>
    </Card>
  );
}

export default DateCard;
