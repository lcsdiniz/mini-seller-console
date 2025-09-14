interface ButtonProps {
  readonly label: string;
  readonly onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  readonly paddingX?: number;
  readonly paddingY?: number;
}

export function Button({ label, onClick, paddingX = 4, paddingY = 2 }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-${paddingX} py-${paddingY} bg-blue-600 text-white rounded-md shadow cursor-pointer hover:bg-blue-700 transition`}
    >
      {label}
    </button>
  )
}