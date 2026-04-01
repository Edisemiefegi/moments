import DateCard from "@/components/dashboard/DateCard";
import FilterIdea from "@/components/dashboard/FilterIdea";
import { DATE_IDEAS } from "@/data/dateIdeas";
import {  Sparkle } from "lucide-react";
import { useState } from "react";

export type FilterState = {
  Budget: string;
  Mood: string;
  Setting: string;
  Time: string;
};

function Ideas() {
  const [filters, setFilters] = useState<FilterState>({
    Budget: "Any",
    Mood: "Any",
    Setting: "Any",
    Time: "Any",
  });

  const [location, setLocation] = useState("");

  console.log(location, 'loca');
  

  const filteredIdeas = DATE_IDEAS.filter((idea) =>
    Object.entries(filters).every(
      ([, val]) => val === "Any" || idea.tags.includes(val),
    ),
  );
  return (
    <main className="p-8 space-y-6">
      <header>
        <h1 className="font-medium text-2xl flex gap-1">
          <Sparkle className="text-primary" />
          Date Ideas
        </h1>
        <p className="text-text">
          Find the perfect date. filter by what feels right.
        </p>
      </header>
      <FilterIdea   selected={filters}
        onSelect={(cat, val) => setFilters((prev) => ({ ...prev, [cat]: val }))}
        onReset={() => setFilters({ Budget: "Any", Mood: "Any", Setting: "Any", Time: "Any" })}
        location={location}
        onLocationChange={setLocation}/>
        {filteredIdeas.length === 0 ? (
          <p className="text-text text-center py-12">
            No matches — try loosening the filters.
          </p>
        ) : (
          <div className="grid gap-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {filteredIdeas.map((idea, i) => (
              <DateCard
                key={i}
                date={idea}
                filter={idea.tags}
                location={location}
              />
            ))}
          </div>
        )}
    </main>
  );
}

export default Ideas;
