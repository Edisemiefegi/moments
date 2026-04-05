import React from "react";
import Input from "./Input";

type FileUploadProps = {
  value?: File | null;
  onChange?: (file: File | null) => void;
  accept?: string;
};

function FileUpload({ value, onChange, accept = "image/*" }: FileUploadProps) {
  const [preview, setPreview] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(value);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange?.(file);
  };

  return (
    <div className="flex flex-col gap-3">
      <Input type="file" accept={accept} onChange={handleChange} />

      {preview && (
        <div className="w-10 h-10 rounded-lg overflow-hidden border">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}

export default FileUpload;