import Pagination from "@/components/base/Pagination";
import DateCard from "@/components/dashboard/DateCard";
import FilterIdea from "@/components/dashboard/FilterIdea";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { DATE_IDEAS } from "@/data/dateIdeas";
import { generateGeminiContent, usePagination } from "@/lib/utils";
import { Sparkle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

export type FilterState = {
  Budget: string;
  Mood: string;
  Setting: string;
  Time: string;
};
interface AiGeneratedIdea {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: typeof Sparkle;
  isAiGenerated?: boolean;
}

function Ideas() {
  const [filters, setFilters] = useState<FilterState>({
    Budget: "Any",
    Mood: "Any",
    Setting: "Any",
    Time: "Any",
  });
  const [aiIdeas, setAiIdeas] = useState<AiGeneratedIdea[]>([]);
  const [loadingAiIdeas, setLoadingAiIdeas] = useState(false);

  const [location, setLocation] = useState("");

  const filteredLocalIdeas = useMemo(() => {
    return DATE_IDEAS.filter((idea) =>
      Object.entries(filters).every(
        ([, val]) => val === "Any" || idea.tags.includes(val),
      ),
    );
  }, [filters]);

  const generateAiIdeas = async () => {
    setLoadingAiIdeas(true);
    setAiIdeas([]);

    const filterDescription = Object.entries(filters)
      .filter(([, val]) => val !== "Any")
      .map(([key, val]) => `${key}: ${val}`)
      .join(", ");

    const systemInstruction =
      "You are a creative date idea generator. Provide ideas in the specified format.";
    const userPrompt = `Generate  unique, creative, and engaging date ideas.
      ${filterDescription ? `Filters: ${filterDescription}.` : "Any filters."}
      For each idea, provide a catchy title (max 5 words) and a brief, compelling description (1-2 short sentences).
      Then, list relevant tags for each idea (e.g., #Romantic, #LowBudget, #Outdoor, #Evening).
      Format each idea strictly as:
      TITLE: [Idea Title]
      DESCRIPTION: [Idea Description]
      TAGS: #Tag1, #Tag2, #Tag3`;

    try {
      const aiResponseText = await generateGeminiContent(
        userPrompt,
        systemInstruction,
        {
          maxOutputTokens: 800,
          temperature: 0.9,
        },
      );

      if (aiResponseText) {
        const parsedIdeas = aiResponseText
          .split("TITLE:")
          .slice(1)
          .map((block, index) => {
            const titleMatch = block.match(/(.*?)\nDESCRIPTION:/);
            const descriptionMatch = block.match(/DESCRIPTION: (.*?)\nTAGS:/);
            const tagsMatch = block.match(/TAGS: (.*)/);

            return {
              id: `ai-${Date.now()}-${index}`,
              title: titleMatch ? titleMatch[1].trim() : `AI Idea ${index + 1}`,
              description: descriptionMatch
                ? descriptionMatch[1].trim()
                : "No description provided.",
              tags: tagsMatch
                ? tagsMatch[1]
                    .split(",")
                    .map((tag) => tag.trim().replace(/^#/, ""))
                : [],
              icon: Sparkle,
              isAiGenerated: true,
            };
          });
        setAiIdeas(parsedIdeas);
      } else {
        toast.info("AI could not generate ideas with these filters.");
      }
    } catch (error: any) {
      console.error("Error generating AI ideas:", error);
      toast.error(`Failed to generate AI ideas. Please try again`);
    } finally {
      setLoadingAiIdeas(false);
    }
  };

  const header = {
    title: "  Date Ideas",
    description:
      "          Find the perfect date. filter by what feels right. All your romantic plans in one place.",
    icon: Sparkle,
    notification: (
      <Button loading={loadingAiIdeas} onClick={generateAiIdeas}>
        {" "}
        <Sparkle /> Ai
      </Button>
    ),
  };

  const allIdeas = [...filteredLocalIdeas, ...aiIdeas];
  const { currentPage, totalPages, paginatedData, next, prev, goTo } = usePagination(allIdeas, 10);
 
  useEffect(() => {
    goTo(1);
  }, [filters, aiIdeas]);

  return (
    <main className=" space-y-6">
      <Header header={header} />
      <FilterIdea
        selected={filters}
        onSelect={(cat, val) => setFilters((prev) => ({ ...prev, [cat]: val }))}
        onReset={() => {
          setFilters({
            Budget: "Any",
            Mood: "Any",
            Setting: "Any",
            Time: "Any",
          });
          setAiIdeas([]);
        }}
        location={location}
        onLocationChange={setLocation}
      />
      {allIdeas.length === 0 && !loadingAiIdeas ? (
        <p className="text-text text-center py-12">
          No matches — try loosening the filters or generate AI ideas.
        </p>
      ) : (
        <div className="grid gap-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {loadingAiIdeas && (
            <div className="col-span-full text-center py-6 text-primary">
              Generating AI ideas...
            </div>
          )}
          {paginatedData.map((idea, index) => (
            <DateCard
              key={index}
              date={idea}
              filter={idea.tags}
              location={location}
            />
          ))}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNext={next}
            onPrev={prev}
            onGoTo={goTo}
          />
        </div>
      )}{" "}
    </main>
  );
}

export default Ideas;
