import { useState } from "react";
import { Button } from "../ui/button";

type FilterType = {
  Budget: string;
  Mood: string;
  Setting: string;
  Time: string;
};

function FilterIdea() {
  const filter = [
    {
      label: "Budget",
      options: ["Any", "Budget", "Mid-range", "High"],
    },
    {
      label: "Mood",
      options: [
        "Any",
        "Romantic",
        "Fun",
        "Adventurous",
        "Chill",
        "Deep talk",
        "Surprise",
      ],
    },
    {
      label: "Setting",
      options: ["Any", "Indoor", "Outdoor"],
    },
    {
      label: "Time",
      options: ["Any", "Morning", "Afternoon", "Evening", "Night"],
    },
  ];

  const [selected, setSelected] = useState<FilterType>({
    Budget: "Any",
    Mood: "Any",
    Setting: "Any",
    Time: "Any",
  });

  const handleSelect = (category: keyof FilterType, option: string) => {
    setSelected((prev) => ({
      ...prev,
      [category]: option,
    }));
  };

  return (
    <div className="space-y-4">
      {filter.map((date, index) => (
        <div key={index} className="grid grid-cols-5 gap-2 items-center">
          <p className="font-medium md:col-span-1 col-span-5">
            {date.label}
          </p>

          <div className="flex gap-2 md:col-span-4 col-span-5 flex-wrap">
            {date.options.map((item, i) => (
              <Button
                key={i}
                variant={
                  selected[date.label as keyof FilterType] === item
                    ? "default"
                    : "secondary"
                }
                className="rounded-full"
                onClick={() =>
                  handleSelect(date.label as keyof FilterType, item)
                }
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FilterIdea;