import {
  Camera,
  Coffee,
  Heart,
  MapPin,
  Music,
  Star,
  Utensils,
} from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

function IconSelect({ value, onChange }: Props) {
  const iconOptions = [
    { icon: Heart, label: "Love", key: "heart" },
    { icon: Coffee, label: "Coffee", key: "coffee" },
    { icon: Utensils, label: "Food", key: "utensils" },
    { icon: MapPin, label: "Place", key: "mappin" },
    { icon: Music, label: "Music", key: "music" },
    { icon: Star, label: "Special", key: "star" },
    { icon: Camera, label: "Photo", key: "camera" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {iconOptions.map((opt) => (
        <Button
          variant={"outline"}
          key={opt.key}
          type="button"
          onClick={() => onChange(opt.key)}
          className={`flex flex-col  h-13 gap-1  transition-all ${
            value === opt.key
              ? "border-primary bg-primary/10 text-primary"
              : "text-muted-foreground "
          }`}
        >
          <opt.icon className="h-5 w-5" />
          <span className="text-[10px] font-body font-medium">{opt.label}</span>
        </Button>
      ))}
    </div>
  );
}

export default IconSelect;
