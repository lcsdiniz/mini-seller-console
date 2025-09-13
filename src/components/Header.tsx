import { Button } from "./Button";

interface HeaderProps {
  searchPlaceholder: string;
  searchValue: string;
  onChangeSearch: (value: React.ChangeEvent<HTMLInputElement>) => void;
  applyFilters: () => void;
  children?: React.ReactNode;
}

export default function Header({ searchPlaceholder, searchValue, onChangeSearch, applyFilters, children }: Readonly<HeaderProps>) {
  return (
    <header className="flex gap-4 mb-4">
      <input
        type="text"
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={onChangeSearch}
        className="px-3 py-2 border rounded shadow w-1/2"
      />

      {children}

      <Button
        label="Apply"
        onClick={applyFilters}
      />
    </header>
  )
}