import Card from "@/components/base/Card";
import { Copy, ExternalLink, Mail } from "lucide-react";
import { formatDate } from "../TimeLineCard";
import type { MailType } from "@/types";
import { Link } from "react-router-dom";
import { useStore } from "@/store/Store";
import { toast } from "react-toastify";

interface Props {
  content: MailType;
}
export default function SummaryMailCard({ content }: Props) {
  const { currentUser } = useStore();

  const handleCopyLink = () => {
    const link = `${window.location.origin}/mail/preview/${content.sharedId}`;

    navigator.clipboard.writeText(link);
    toast.success("Mail copied to clipboard!");
  };
  return (
    <Card className="space-y-3 mt-5 hover:border-primary/30 hover:border">
      <div className="flex justify-between">
        <div className="grid grid-cols-5 ">
          <div className="bg-primary col-span-1  text-white size-8  flex items-center justify-center rounded-full">
            <Mail size={16} />
          </div>
          <div className="col-span-4">
            <p className="font-medium">
              {content.senderUserId == currentUser?.userid ? (
                <div>
                  <p>To: {content.to}</p>
                </div>
              ) : (
                <p> {content.senderUsername}</p>
              )}
            </p>

            <p className="font-light text-sm">{content?.subject} </p>
            <p className="text-xs text-text line-clamp-2">{content.message}</p>
             <div className="flex gap-3 mt-2">
            <Copy className="mr-1 h-4 w-4" onClick={handleCopyLink} />

            <Link
              className=""
              to={`${window.location.origin}/mail/preview/${content.sharedId}`}
            >
              <ExternalLink className="mr-1 h-4 w-4" />
            </Link>
          </div>
          </div>

         
        </div>

        <p className="text-xs text-text">{formatDate(content?.createdAt)}</p>
      </div>
    </Card>
  );
}
