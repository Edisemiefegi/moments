import { Field, FieldLabel } from "../ui/field";
import Input, { type InputProps } from "./Input";

type FieldType = "input" | "textarea" | "select" | "checkbox" | "file" | "date";

type FieldPropsMap = {
  input: InputProps;
  textarea: InputProps;
  select: InputProps;
  checkbox: InputProps;
  file: InputProps;
  date: InputProps;
};

export type FieldPropType<T extends FieldType = FieldType> = {
  name: string;
  label: string;
  fieldType: T;
  fieldProps?: FieldPropsMap[T];
};

export type FieldProp = {
  field: FieldPropType;
};

function FormFields({ field }: FieldProp) {
  return (
    <div>
      <form className="space-y-1">
        <Field>
          <FieldLabel className="font-medium text-gray-700">{field.label}</FieldLabel>

          {field.fieldType === "input" && (
            <Input name={field.name} {...(field.fieldProps as InputProps)} />
          )}
        </Field>
      </form>
    </div>
  );
}

export default FormFields;
