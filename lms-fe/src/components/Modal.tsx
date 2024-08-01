import React from "react";

interface ModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-75 flex justify-center items-center z-99">
      <div className="bg-white w-1/4 p-8 rounded-lg shadow-lg">
        <p className="text-lg mb-4">{message}</p>
        <div className="flex justify-around">
          <button
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
