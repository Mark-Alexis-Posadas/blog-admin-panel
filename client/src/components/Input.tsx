import { FC } from "react";
import { FieldProps } from "formik";

interface InputProps extends FieldProps {
  label: string;
}
export const Input: FC<InputProps> = ({ field, form, label, ...props }) => {
  return (
    <div className="mb-3">
      <label>{label}</label>
      <input {...field} {...props} /> ;
    </div>
  );
};
