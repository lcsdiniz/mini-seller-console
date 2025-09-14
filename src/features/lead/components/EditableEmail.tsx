import { useState } from "react";
import { PencilSquareIcon, XMarkIcon, CheckIcon} from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

interface EditableEmailProps {
  value: string;
  onSave: (newValue: string) => void;
}

export function EditableEmail({ value, onSave }: EditableEmailProps) {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const [error, setError] = useState("");

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSave = () => {
    if (!validateEmail(tempValue)) {
      setError("Invalid email");
      toast.error("Invalid email");
      return;
    }
    onSave(tempValue);
    setEditing(false);
    setError("");
  };

  const handleCancel = () => {
    setTempValue(value);
    setEditing(false);
    setError("");
  };

  return editing ? (
    <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
      <input
        className={`border px-2 py-1 rounded w-full ${error ? "border-red-500" : ""}`}
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
      />
      <button
        className="ml-2 hover:bg-gray-200 cursor-pointer rounded-md"
        onClick={handleSave}
      >
        <CheckIcon className="h-5 w-5" color="green"/>
      </button>
      <button
        className="ml-2 hover:bg-gray-200 cursor-pointer rounded-md"
        onClick={handleCancel}
      >
        <XMarkIcon className="h-5 w-5" color="red"/>
      </button>
    </div>
  ) : (
    <div className="flex items-center justify-between">
      <span>{value}</span>
      <button
        className="ml-2 text-gray-500 hover:bg-gray-200 cursor-pointer rounded-md"
        onClick={(e) => {
          e.stopPropagation();
          setEditing(true);
        }}
      >
        <PencilSquareIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
