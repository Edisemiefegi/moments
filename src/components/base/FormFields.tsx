import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import Input, { type InputProps } from "./Input";
import TextAreaField, { type TextAreaProps } from "./TextAreaField";
import { DatePicker } from "./DatePicker";
import FileUpload from "./FileUpload";
import IconSelect from "../dashboard/IconSelect";

type FieldType =
  | "input"
  | "textarea"
  | "select"
  | "checkbox"
  | "file"
  | "date"
  | "icon";

type FieldPropsMap = {
  input: InputProps;
  textarea: TextAreaProps;
  select: InputProps;
  checkbox: InputProps;
  file: InputProps;
  date: InputProps;
  icon: any;
};

export type FieldPropType<T extends FieldType = FieldType> = {
  name: string;
  label: string;
  fieldType: T;
  fieldProps?: FieldPropsMap[T];
};

export type FieldProp = {
  fieldItem: FieldPropType;
  control: any;
};

function FormFields({ fieldItem, control }: FieldProp) {
  return (
    <div>
      <Controller
        name={fieldItem.name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="space-y-1">
            <FieldLabel className="font-medium text-gray-700 dark:text-white">
              {fieldItem.label}
            </FieldLabel>

            {fieldItem.fieldType === "input" && (
              <Input {...field} {...(fieldItem.fieldProps as InputProps)} />
            )}

            {fieldItem.fieldType === "textarea" && (
              <TextAreaField
                {...field}
                {...(fieldItem.fieldProps as TextAreaProps)}
              />
            )}

            {fieldItem.fieldType === "date" && <DatePicker {...field} />}

            {fieldItem.fieldType === "icon" && <IconSelect {...field} />}

            {fieldItem.fieldType === "file" && (
              <FileUpload
                {...field}
                // {...(fieldItem.fieldProps as TextAreaProps)}
              />
            )}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </div>
  );
}

export default FormFields;
