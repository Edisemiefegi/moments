import { ArrowRight, Bookmark, Sparkles, type LucideIcon } from "lucide-react";
import Card from "../base/Card";
import { Button } from "../ui/button";
import { useState } from "react";
import { generateGeminiContent } from "@/lib/utils";
import { toast } from "react-toastify";
import { useIdeas } from "@/hooks/useIdeas";
import { useStore } from "@/store/Store";
import { useNavigate } from "react-router-dom";

type PropType = {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  tags?: string[];
  id: string;
};

interface Props {
  date: PropType;
  filter: string[];
  location: string;
}

function DateCard({ date, filter, location }: Props) {
  const IconComponent = date.icon;
  const [places, setPlaces] = useState<string | null>(null);
  const [loadingPlaces, setLoadingPlaces] = useState(false);

  const { savedIdeas } = useStore();

  const { addSavedIdea, removeSavedIdea } = useIdeas();
  const isSaved = savedIdeas.find((e: any) => e.id == date.id);

  const navigate = useNavigate()

  const suggestPlaces = async () => {
    const loc = location.trim() || "Anywhere in the world";
    setLoadingPlaces(true);
    setPlaces(null);
    const systemInstruction =
      "You suggest real, specific local venues for dates. Return exactly 3 places, each as: '• Place Name — one sentence why it's perfect.' No extra text, just the list.";
    const userPrompt = `Suggest 3 real, currently operating places in or near "${loc}" for a "${date.title}" date (vibe: ${filter.join(", ")}). Prioritize well-known or highly-rated venues that are good for dates.`;

    try {
      const aiResponseText = await generateGeminiContent(
        userPrompt,
        systemInstruction,
        {
          maxOutputTokens: 400,
          temperature: 0.8,
        },
      );

      if (aiResponseText) {
        setPlaces(aiResponseText);
      } else {
        setPlaces(
          "No specific suggestions found. Try a different location or idea.",
        );
      }
    } catch (error: any) {
      console.error("Could not load suggestions:", error);
      setPlaces(`Could not load suggestions. Please try again.`);
      toast.error("Failed to fetch place suggestions.");
    } finally {
      setLoadingPlaces(false);
    }
  };

  const handleSaveIdea = async () => {
    try {
      if (isSaved) {
        await removeSavedIdea(date?.id);
      } else {
        await addSavedIdea(date);
      }
    } catch (error) {
      console.error("Error saving/unsaving idea:", error);
    }
  };

 const handlePlanThisDate = () => {
    navigate("/dashboard/dates", {
      state: {
        openPlanDateModal: true,
        prefillDate: {
          title: date.title,
          activity: date.description,
          // location: date.location 
        },
      },
    });
  };

  return (
    <Card className="space-y-4">
      <div className="flex justify-between items-center">
        {IconComponent && (
          <IconComponent
            size={30}
            className="p-2  rounded-full bg-primary text-white"
          />
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSaveIdea}
          className={
            isSaved
              ? "text-primary hover:text-primary"
              : "text-text hover:text-primary"
          }
        >
          <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
        </Button>{" "}
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
        disabled={loadingPlaces}
      >
        {loadingPlaces ? (
          "Finding places..."
        ) : (
          <>
            <Sparkles size={14} className="mr-1" /> Suggest Real Places
          </>
        )}
      </Button>

      <Button onClick={handlePlanThisDate} className=" w-full">
        Plan This Date <ArrowRight className="" />
      </Button>
    </Card>
  );
}

export default DateCard;
