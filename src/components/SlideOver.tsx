import type { ReactNode } from "react";

type SlideOverProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  title?: string;
  children: ReactNode;
  isSaveDisabled?: boolean;
  saveText?: string;
};

export default function SlideOver({
  isOpen,
  onClose,
  onSave,
  title,
  children,
  isSaveDisabled = false,
  saveText = "Save",
}: SlideOverProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Fundo */}
      <div
        className="fixed inset-0 bg-black opacity-30 z-40"
        onClick={onClose}
      />

      {/* Slide-over */}
      <div className="fixed top-0 right-0 h-full w-1/3 max-w-md bg-white shadow-xl transform transition-transform duration-300 z-50 flex flex-col">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-bold">{title}</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="p-4 flex-1 overflow-auto">{children}</div>

        <div className="p-4 border-t flex gap-2 justify-end">
          <button
            className={`px-4 py-2 rounded font-semibold transition-colors duration-200
              text-white bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed`}
            onClick={onSave}
            disabled={isSaveDisabled}
          >
            {saveText}
          </button>
          <button
            className="px-4 py-2 rounded font-semibold transition-colors duration-200
              bg-gray-300 hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
