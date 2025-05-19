import { FC } from "react";

interface InputProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
  className: string;
  placeHolder: string;
  name: string;
  id: string;
  type: string;
}
export const Input: FC<InputProps> = ({
  handleChange,
  value,
  className,
  placeHolder,
  name,
  id,
  label,
  type,
}) => {
  return (
    <div className="mb-3">
      <label>{label}</label>
      <input
        type={type}
        onChange={handleChange}
        value={value}
        className={className}
        placeholder={placeHolder}
        name={name}
        id={id}
      />
    </div>
  );
};
