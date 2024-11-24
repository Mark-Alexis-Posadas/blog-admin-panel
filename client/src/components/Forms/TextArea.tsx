import { FC } from "react";

interface TextAreaProps {
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  label: string;
  className: string;
  name: string;
  id: string;
}
export const TextArea: FC<TextAreaProps> = ({
  handleChange,
  value,
  className,
  name,
  id,
  label,
}) => {
  return (
    <div className="mb-3">
      <label>{label}</label>
      <textarea
        onChange={handleChange}
        value={value}
        className={className}
        name={name}
        id={id}
      ></textarea>
    </div>
  );
};
