import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { mailStyles, getStyleFontsUrl } from "@/lib/mailStyle";
import { toast } from "react-toastify";
import MailPreview from "../../../components/dashboard/letters/MailPreview";
import { useMails } from "@/hooks/useMails";
import { useStore } from "@/store/Store";
import { ChevronLeft } from "lucide-react";

function MailSharePage() {
  const { sharedId } = useParams<{ sharedId: string }>();
  const [mailData, setMailData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchMailBySharedId } = useMails();
  const { currentUser } = useStore();

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = getStyleFontsUrl();
    document.head.appendChild(link);

    const fetchMail = async () => {
      if (!sharedId) {
        setError("Invalid mail link.");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchMailBySharedId(sharedId);
        setMailData(data);
      } catch (err: any) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMail();

    return () => {
      document.head.removeChild(link);
    };
  }, [sharedId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading letter...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  const currentStyle = mailStyles.find((s) => s.id === mailData.styleId);

  if (!currentStyle) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Style not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {currentUser && <Link className="flex text-text text-sm items-center mb-6" to={'/dashboard/mail'}><ChevronLeft size={15}/>back</Link>}
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          A special message from {mailData.senderUsername}
        </h1>
        <MailPreview
          style={currentStyle}
          recipientName={mailData.to}
          message={mailData.message}
          subject={mailData.subject}
        />
        {!currentUser && (
          <div className="text-center mt-10  text-gray-600">
            <p className="text-xs">
              Liked this letter? Join Moments to send your own!
            </p>
            <a
              href="/"
              className="text-primary text-sm hover:underline mt-2 inline-block"
            >
              Go to Moments
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default MailSharePage;
