import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import Modal from './Modal';  

interface Book {
  issuedBookId: string;
  title: string;
  author: string;
}

interface BookDetailsModalProps {
  books: Book[];
  onClose: () => void;
  onBookReturn: (issuedBookId: string) => void;
}

const BookDetailsModal: React.FC<BookDetailsModalProps> = ({ books, onClose, onBookReturn }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bookToReturn, setBookToReturn] = useState<string | null>(null);

  const handleReturnBook = (issuedBookId: string) => {
    setBookToReturn(issuedBookId);
    setShowConfirmModal(true);
  };

  const confirmReturnBook = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${BACKEND_URL}/api/v1/issue/returned/${bookToReturn}`, null, {
        headers: {
          Authorization: token,
        },
      });
      console.log('Book returned successfully');
      if (bookToReturn) {
        onBookReturn(bookToReturn);
      }
      onClose();
    } catch (error) {
      console.error("Error returning book:", error);
    }
  };

  const cancelReturnBook = () => {
    setShowConfirmModal(false);
    setBookToReturn(null);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
          <h2 className="text-xl font-bold mb-4">Issued Books</h2>
          <ul>
            {books.length > 0 ? (
              books.map((book) => (
                <li key={book.issuedBookId} className="flex justify-between items-center mb-2">
                  <span>{book.title} by {book.author}</span>
                  <button
                    onClick={() => handleReturnBook(book.issuedBookId)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Return
                  </button>
                </li>
              ))
            ) : (
              <li>No books issued</li>
            )}
          </ul>
          <button
            onClick={onClose}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>

      {showConfirmModal && (
        <Modal
          message="Are you sure you want to return this book?"
          onConfirm={confirmReturnBook}
          onCancel={cancelReturnBook}
        />
      )}
    </>
  );
};

export default BookDetailsModal;
