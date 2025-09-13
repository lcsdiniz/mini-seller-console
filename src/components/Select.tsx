import type { SelectOption } from "../types";

interface SelectProps {
  readonly type: "header" | "form";
  readonly label?: string;
  readonly options: ReadonlyArray<SelectOption>;
  readonly value: string;
  readonly onChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Select({ type, label, onChange, options, value }: SelectProps) {
  return (
    <div>
      {label && <strong>{label}:</strong>}

      <select
        value={value}
        onChange={onChange}
        className={`rounded border ${type === "header" ? "px-3 py-2 shadow bg-white cursor-pointer" : "px-2 py-1 w-full mt-1"}`}
      >
        {options.map((option: SelectOption) => (
          <option key={option.value} value={option.value} disabled={option.value === "all" && type === "form"}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}