import Header from "@/components/dashboard/Header";
import TimeLineCard from "@/components/dashboard/TimeLineCard";
import TimeLineForm from "@/components/dashboard/TimeLineForm";
import { useMoments } from "@/hooks/useMoments";
import { useStore } from "@/store/Store";
import type { Timeline } from "@/types";
import { BookHeart } from "lucide-react";
import { useEffect, useState } from "react";

function TimeLine() {
  const { userTimelines } = useStore();
  const { getUserTimeline } = useMoments();

  const header = {
    title: " Our Moments",
    description: "Every moment tells our story 💕",
    onclick: () => setShowForm(!showForm),
    button: "          Add a memory",
    icon: BookHeart,
  };

  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState<Timeline | null>(null);

  useEffect(() => {
    const fetchdata = async () => await getUserTimeline();
    fetchdata();
  }, []);

  const handleEdit = (moment: Timeline) => {
    setSelected(moment);
    setShowForm(true);
  };

  return (
    <main className=" space-y-6">
      <Header header={header} />

      {showForm && (
        <TimeLineForm
          open={showForm}
          close={() => {
            setSelected(null);
            setShowForm(false);
          }}
          editData={selected || undefined}
        />
      )}

      <div className="flex  flex-col items-center gap-12">
        {userTimelines.map((item: Timeline) => (
          <TimeLineCard key={item?.id} moment={item} onEdit={handleEdit} />
        ))}

        {userTimelines.length == 0 && (
          <div>
            <p className="text-text text-sm py-10 md:text-lg max-w-md text-center">
              No Moment created yet, click on the add Memory to create your
              moment!!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default TimeLine;
