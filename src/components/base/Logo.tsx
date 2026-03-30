import { Heart } from "lucide-react";

function Logo() {
  return (
    <span className="flex gap-2">
      <Heart fill="#e34a6f" stroke="0" />
      <p className="font-medium">
        Mo<span className="text-accent dark:text-primary">ments</span>
      </p>
    </span>
  );
}

export default Logo;
