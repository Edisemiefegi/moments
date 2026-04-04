import TimeLineCard from "@/components/dashboard/TimeLineCard";
import TimeLineForm from "@/components/dashboard/TimeLineForm";
import { timeline } from "@/components/TimeLine";
import { Button } from "@/components/ui/button";
import { BookHeart, Plus, X } from "lucide-react";
import { useState } from "react";

function TimeLine() {
  const moments = timeline;

  const [showForm, setShowForm] = useState(false);
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
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? (
            <span className="flex gap-1 items-center">
              <X /> Cancel
            </span>
          ) : (
            <span className="flex gap-1 items-center">
              <Plus />
              Add a memory
            </span>
          )}{" "}
        </Button>{" "}
      </header>

      {showForm && <TimeLineForm close={() => setShowForm(false)} />}

      <div className="flex  flex-col items-center gap-12">
        {moments.map((item, i) => (
          <TimeLineCard index={i} moment={item} />
        ))}
      </div>
    </main>
  );
}

export default TimeLine;
