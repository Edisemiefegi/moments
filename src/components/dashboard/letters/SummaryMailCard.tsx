import Card from "@/components/base/Card";
import { Mail } from "lucide-react";
// import { useNavigate } from "react-router-dom";

type CardType = {
  title?: string;
  company: string;
  message: string;
  date: string;
  status: string;
  id?: string;
};

interface Props {
  content: CardType;
}
export default function SummaryMailCard({ content }: Props) {
  //   const navigate = useNavigate();

  return (
    <Card className="space-y-3 hover:border-primary/30 hover:border">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <span className="bg-primary  text-white size-8 flex items-center justify-center rounded-full">
            <Mail size={16} />
          </span>
          <div>
            <p className="font-medium">with {content.company}</p>

            <p className="font-medium">{content.title} </p>
            <p className="text-xs text-text">{content.message}</p>
          </div>
        </div>

        <p className="text-xs text-text">{content.date}</p>
      </div>
    </Card>
  );
}
