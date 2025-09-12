import { useState } from "react";
import type { Lead } from "../types";

type SlideOverProps = {
  lead: Lead;
  onClose: () => void;
  onSave: (updatedLead: Lead) => void;
};

export default function SlideOver({ lead, onClose, onSave }: SlideOverProps) {
  const [editingLead, setEditingLead] = useState<Lead>(lead);
  const [error, setError] = useState<string>("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (value: string) => {
    setEditingLead((prev) =>
      prev ? { ...prev, email: value } : prev
    );

    if (value && !validateEmail(value)) {
      setError("Email is not valid!");
    } else {
      setError("");
    }
  };

  const saveEditing = () => {
    if (!validateEmail(editingLead.email)) {
      setError("Email is not valid!");
      return;
    }

    onSave(editingLead);
    alert("Lead updated successfully!");
    onClose();
  };

  const cancelEditing = () => {
    onClose();
  };

  const isSaveDisabled =
    !editingLead ||
    error !== "" ||
    (editingLead.email === lead.email && editingLead.status === lead.status);

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-30 z-40"
        onClick={onClose}
      />

      <div
        className="fixed top-0 right-0 h-full w-1/3 max-w-md bg-white shadow-xl transform transition-transform duration-300 z-50 translate-x-0"
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-bold">Lead Details</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="p-4 space-y-4">
          <p>
            <strong>Name:</strong> {lead.name}
          </p>
          <p>
            <strong>Company:</strong> {lead.company}
          </p>

          <div>
            <strong>Email:</strong>{" "}
            <input
              type="text"
              value={editingLead?.email ?? ""}
              onChange={(e) => handleEmailChange(e.target.value)}
              className={`border rounded px-2 py-1 w-full mt-1 ${
                error ? "border-red-500" : ""
              }`}
            />
            {error && <p className="text-red-500 mt-1">{error}</p>}
          </div>

          <div>
            <strong>Status:</strong>{" "}
            <select
              value={editingLead?.status ?? ""}
              onChange={(e) =>
                setEditingLead((prev) =>
                  prev ? { ...prev, status: e.target.value } : prev
                )
              }
              className="border rounded px-2 py-1 w-full mt-1"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded font-semibold transition-colors duration-200
                text-white bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed`}
              onClick={saveEditing}
              disabled={isSaveDisabled}
            >
              Save
            </button>
            <button
              className={`px-4 py-2 rounded font-semibold transition-colors duration-200
                bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed`}
              onClick={cancelEditing}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
