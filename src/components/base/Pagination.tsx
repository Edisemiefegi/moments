// Pagination.tsx
import { Button } from "@/components/ui/button";

interface Props {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onNext,
  onPrev,
  onGoTo,
}: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
      <Button onClick={onPrev} disabled={currentPage === 1}>
        Prev
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          onClick={() => onGoTo(page)}
        >
          {page}
        </Button>
      ))}

      <Button onClick={onNext} disabled={currentPage === totalPages}>
        Next
      </Button>
    </div>
  );
}