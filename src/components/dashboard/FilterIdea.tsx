import { Button } from "../ui/button";
import { MapPin, RefreshCcw } from "lucide-react";
import Input from "../base/Input";
import type { FilterState } from "@/pages/dashboard/Ideas";



type Props = {
  selected: FilterState;
  onSelect: (category: keyof FilterState, option: string) => void;
  onReset: () => void;
  location: string;
  onLocationChange: (val: string) => void;
};

function FilterIdea({
  selected,
  onSelect,
  onReset,
  location,
  onLocationChange,
}: Props) {
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


  const detectLocation = () => {
    navigator.geolocation?.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      );
      const data = await res.json();
      const city =
        data.address?.city || data.address?.town || data.address?.suburb || "";
      onLocationChange(city);
          console.log(location, 'citry');

    });

    
  };

  return (
    <div className="space-y-4">
      {filter.map((date, index) => (
        <div key={index} className="grid grid-cols-5 gap-2 ">
          <p className="font-medium md:col-span-1 col-span-5">{date.label}</p>

          <div className="flex gap-2 md:col-span-4 col-span-5 flex-wrap">
            {date.options.map((item, i) => (
              <Button
                key={i}
                variant={
                  selected[date.label as keyof FilterState] === item
                    ? "default"
                    : "secondary"
                }
                className="rounded-full"
                onClick={() => onSelect(date.label as keyof FilterState, item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      ))}

      <div className="flex gap-2 items-center">
        <Input
          type="text"
          placeholder="Your city or area (e.g. Lagos Island)..."
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className=" text-sm "
        />
        <Button onClick={detectLocation}>
          <MapPin size={14} className="mr-1" /> Detect
        </Button>
      </div>
      <Button onClick={onReset} variant={"outline"} size={"sm"}>
        <RefreshCcw size={16} /> Reset Filter
      </Button>
    </div>
  );
}

export default FilterIdea;
