import TimeLineCard from "@/components/dashboard/TimeLineCard";
import TimeLineForm from "@/components/dashboard/TimeLineForm";
import { Button } from "@/components/ui/button";
import { useMoments } from "@/hooks/useMoments";
import { useStore } from "@/store/Store";
import type { Timeline } from "@/types";
import { BookHeart, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

function TimeLine() {
  const { userTimelines } = useStore();
  const { getUserTimeline } = useMoments();

  useEffect(() => {
    const fetchdata = async () => await getUserTimeline();
    fetchdata();
    // console.log(userTimelines, "timesmms");
  }, []);

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
        {userTimelines.map((item: Timeline) => (
          <TimeLineCard key={item?.id} moment={item} />
        ))}

        {userTimelines.length == 0 && (
          <div>
            <p className="text-text text-lg max-w-md text-center">
              No Moment created yet, click on the add Memory to create your moment!!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default TimeLine;
