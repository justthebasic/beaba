import { SelectHTMLAttributes } from "react";
import { useFormContext } from 'react-hook-form';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: { value: string, label: string }[];
}

export function Select(props: SelectProps) {
  const { register } = useFormContext();

  return (
    <select
      id={props.name}
      className=" rounded border border-zinc-300 shadow-sm px-3 py-2 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
      {...register(props.name)}
      {...props}
    >
      {props.options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}