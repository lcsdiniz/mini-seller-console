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
    <header className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 mb-4 items-center">
      <div className="flex items-center w-full">
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={onChangeSearch}
          className="px-3 py-2 border rounded-md shadow w-full bg-white"
          onKeyDown={(e) => {
            if (e.key === "Enter") applyFilters();
          }}
        />
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between w-full">
        {children}

        <div>
          <Button label="Apply" onClick={applyFilters} />
        </div>
      </div>
    </header>
  )
}