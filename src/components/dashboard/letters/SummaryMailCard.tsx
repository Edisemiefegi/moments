import Card from "@/components/base/Card";
import { Mail } from "lucide-react";
import { formatDate } from "../TimeLineCard";
import type { MailType } from "@/types";
import { Link } from "react-router-dom";
import { useStore } from "@/store/Store";

interface Props {
  content: MailType;
}
export default function SummaryMailCard({ content }: Props) {
  const { currentUser } = useStore();
  return (
    <Link
      className=""
      to={`${window.location.origin}/mail/preview/${content.sharedId}`}
    >
      <Card className="space-y-3 mt-5 hover:border-primary/30 hover:border">
        <div className="flex justify-between">
          <div className="grid grid-cols-5 ">
            <div className="bg-primary  text-white size-8  flex items-center justify-center rounded-full">
              <Mail size={16} />
            </div>
            <div className="col-span-4">
              <p className="font-semibold">
                {content.senderUserId == currentUser?.userid ? (
                  <div>
                    <p>To: {content.to}</p>
                  </div>
                ) : (
                  <p> {content.senderUsername}</p>
                )}
              </p>

              <p className="font-medium">{content?.subject} </p>
              <p className="text-xs text-text ">{content.message}</p>
            </div>
          </div>

          <p className="text-xs text-text">{formatDate(content?.createdAt)}</p>
        </div>
      </Card>
    </Link>
  );
}
