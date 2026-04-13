import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

interface Props {
  idea: any;
}
function SavedIdeaCard({ idea }: Props) {
    const navigate = useNavigate();


   const handlePlanThisDate = () => {
    navigate("/dashboard/dates", {
      state: {
        openPlanDateModal: true,
        prefillDate: {
          title: idea.title,
          activity: idea.description,
          // location: date.location 
        },
      },
    });
  };

  return (
    <div
      key={idea.id}
      className="flex items-center gap-3 bg-muted rounded-lg p-3 hover:bg-muted/80 transition-colors group cursor-pointer"
    >
      {/* <span className="text-lg">{idea.icon}</span> */}
      <div className="flex-1 min-w-0">
        <p className="font-body text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
          {idea.title}
        </p>
        <p className="font-body truncate text-[11px] text-muted-foreground">
          {idea.description}
        </p>
      </div>
        <Button onClick={handlePlanThisDate} size="sm" variant="ghost" className=" text-xs text-primary ">
          Plan
        </Button>
    </div>
  );
}

export default SavedIdeaCard;
