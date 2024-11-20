import { FC } from "react";
import { FieldProps } from "formik";

interface InputProps extends FieldProps {
  label: string;
}
export const Input: FC<InputProps> = ({ field, form, ...props }) => {
  return <input {...field} {...props} />;
};
