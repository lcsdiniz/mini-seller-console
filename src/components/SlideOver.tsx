import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

type SlideOverProps = {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onEdit: () => void;
  readonly title?: string;
  readonly children: React.ReactNode;
  readonly isUpdateDisabled?: boolean;
};

export default function SlideOver({
  isOpen,
  onClose,
  onEdit,
  title,
  children,
  isUpdateDisabled = false,
}: SlideOverProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) setShow(true);
  }, [isOpen]);

  function handleClose() {
    setShow(false);
    setTimeout(() => onClose(), 500);
  }

  if (!isOpen && !show) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-white/50 transition-opacity duration-500 ${
          show ? "opacity-100" : "opacity-0"
        }`}
        onClick={(e) => {
          handleClose()
          e.stopPropagation()
        }}
      />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-auto fixed inset-y-0 right-0 flex max-w-full">
            <div
              className={`
                fixed top-0 right-0 h-full w-full sm:w-3/4 md:w-1/2 lg:w-1/4 
                bg-white shadow-xl flex flex-col transition-transform duration-300
                ${show ? "translate-x-0" : "translate-x-full"}
              `}
            >
              <div className="p-4 flex justify-between items-center border-b">
                <h2 className="text-lg font-bold">{title}</h2>
                <button
                  className="p-2 rounded hover:bg-gray-100 cursor-pointer"
                  onClick={handleClose}
                >
                  <XMarkIcon className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <div className="p-4 flex-1 overflow-auto">{children}</div>

              <div className="p-4 border-t flex gap-2 justify-end">
                <button
                  className={`px-4 py-2 rounded font-semibold text-white bg-blue-500 hover:bg-blue-600 cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors duration-200`}
                  onClick={onEdit}
                  disabled={isUpdateDisabled}
                >
                  Update
                </button>
                <button
                  className="px-4 py-2 rounded font-semibold bg-gray-300 hover:bg-gray-400 cursor-pointer transition-colors duration-200"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
