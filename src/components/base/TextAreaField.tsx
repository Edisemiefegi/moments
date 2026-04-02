interface Props {
  label: string;
  placeholder?: string;
}

function TextAreaField({ label, placeholder }: Props) {
  return (
    <div className="space-y-1">
      <p className="text-sm">{label}</p>
      <textarea
        placeholder={placeholder}
        className="w-full border rounded-lg p-3 bg-background outline-none text-sm h-28"
      />
    </div>
  );
}

export default TextAreaField;