import { useState, useEffect } from "react";
import { Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getStyleFontsUrl, mailStyles } from "@/lib/mailStyle";
import MailForm from "./MailForm";
import Tab from "@/components/base/Tab";
import type { MailSchemaType } from "@/schema/dashboard";
import { toast } from "react-toastify";
import MailPreview from "./MailPreview";

// interface Props {
//   onClose: () => void;
// }
function MailBox() {
  const [selectedStyle, setSelectedStyle] = useState(1);
  const [activeTab, setActiveTab] = useState("preview");
  const [createdMailLink, setCreatedMailLink] = useState<string | null>(null);

  const STORAGE_KEY = "mail-draft";

  const [formData, setFormData] = useState<MailSchemaType>({
    subject: "",
    to: "",
    username: "",
    message: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch {
        console.log("Failed to parse draft");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = getStyleFontsUrl();
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const currentStyle = mailStyles.find((s) => s.id === selectedStyle)!;
  const tabs = [
    { value: "form", tab: "Write" },
    { value: "preview", tab: "Preview" },
  ];

  const handleMailCreated = async (sharedId: string) => {
    const link = `${window.location.origin}/mail/preview/${sharedId}`;
    setCreatedMailLink(link);
    localStorage.removeItem(STORAGE_KEY);
    // setFormData({
    //   subject: "",
    //   to: "",
    //   username: "",
    //   message: "",
    // });

    setActiveTab("preview");
  };

  const handleCopyLink = () => {
    if (createdMailLink) {
      navigator.clipboard.writeText(createdMailLink);
      toast.success("Link copied to clipboard!");
    } else {
      toast.error(
        "No mail link generated yet. Click on create letter to generate link",
      );
    }
  };

  const handleOpenPage = () => {
    if (createdMailLink) {
      window.open(createdMailLink, "_blank");
    } else {
      toast.error(
        "No mail link generated yet. Click on create letter to access link",
      );
    }
  };
  return (
    <div className="">
      <div className="space-y-6">
        {/* Editor */}
        <div className="space-y-6">
          <Label className="text-sm font-medium">Choose a Style</Label>

          <div className="grid grid-cols-4 gap-2">
            {mailStyles.map((s) => (
              <Button
                variant={"outline"}
                key={s.id}
                onClick={() => setSelectedStyle(s.id)}
                className={` flex-col h-14 relative gap-1! transition-all duration-300 ${
                  selectedStyle === s.id ? "border-primary" : ""
                }`}
              >
                <span
                  className={`w-3 h-3 absolute -top-1 transition-all animate-bounce duration-300 ease-in-out  right-0 rounded-full bg-primary ${
                    selectedStyle === s.id ? "block" : "hidden"
                  }`}
                ></span>
                <span className="text-xl block">{s.emoji}</span>
                <p className="text-[10px]">{s.name}</p>
              </Button>
            ))}
          </div>
        </div>
        <Tab
          tabs={tabs}
          value={activeTab}
          onChange={setActiveTab}
          listClassName="bg-transparent"
          activeTriggerClassName="bg-primary! text-white!"
          triggerClassName="text-primary"
        />
        {activeTab === "form" && (
          <MailForm
            onMailCreated={handleMailCreated}
            selectedStyleId={selectedStyle}
            onChange={(data: any) => setFormData(data)}
            values={formData}
          />
        )}

        {activeTab === "preview" && (
          <div className="space-y-4">
            <MailPreview
              subject={formData.subject}
              style={currentStyle}
              recipientName={formData.to}
              message={formData.message}
            />

            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleCopyLink}
              >
                <Copy className="mr-1 h-4 w-4" /> Copy Link
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleOpenPage}
              >
                <ExternalLink className="mr-1 h-4 w-4" /> Open Share Page
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default MailBox;
