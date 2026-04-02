import { X } from "lucide-react";
import Card from "./Card";
import { Button } from "../ui/button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  header?: React.ReactNode;
  children: React.ReactNode;
}

function Modal({ open, onClose, header, children }: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 h-full"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()} className="w-[100%]   md:max-w-lg">
        <Card className="overflow-hidden">
          {/* Header */}
          <div className="border-b px-4 py-3 flex justify-between">
            {header && <div>{header}</div>}
            <Button variant={"ghost"} onClick={onClose}>
              <X />
            </Button>
          </div>
          {/* Scrollable Content */}
          <div className="p-4 md:max-h-[70vh] overflow-y-auto">{children}</div>
        </Card>
      </div>
    </div>
  );
}

export default Modal;
