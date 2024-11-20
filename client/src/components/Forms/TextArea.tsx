import { FC } from "react";
import { FieldProps } from "formik";

interface TextAreaProps extends FieldProps {
  label: string;
}
export const TextArea: FC<TextAreaProps> = ({
  field,
  form,
  label,
  ...props
}) => {
  return (
    <div className="mb-3">
      <label>{label}</label>
      <textarea {...field} {...props} name="" id=""></textarea>
    </div>
  );
};
