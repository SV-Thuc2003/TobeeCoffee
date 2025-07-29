// components/GenericModal.tsx
import React from "react";

interface Props {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const GenericModal: React.FC<Props> = ({ isOpen, title, onClose, children }) => {
  if (!isOpen) return null;

  return (
   <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 relative shadow-lg">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 text-2xl">&times;</button>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default GenericModal;
