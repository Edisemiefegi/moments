import TimeLineCard from "@/components/dashboard/TimeLineCard";
import { timeline } from "@/components/TimeLine";
import { Button } from "@/components/ui/button";
import { BookHeart, Plus } from "lucide-react";

function TimeLine() {
  const moments = timeline;
  return (
    <main className=" space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="font-medium text-2xl flex gap-1">
            <BookHeart className="text-accent" />
            Our Moments
          </h1>
          <p className="text-text">Every moment tells our story 💕</p>
        </div>
        <Button>
          <Plus />
          Add a memory{" "}
        </Button>{" "}
      </header>

      <div className="flex  flex-col items-center gap-12">
        {moments.map((item, i) => (
          <TimeLineCard index={i} moment={item} />
        ))}
      </div>
    </main>
  );
}

export default TimeLine;
