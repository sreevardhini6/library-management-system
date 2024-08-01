import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { BookCard } from "../components/BookCard";
import { Loading } from "../components/Loading";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

export const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [booksPerPage] = useState(10);
  const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);

  const navigate = useNavigate(); // Use navigate hook

  const getToken = () => localStorage.getItem("token");

  const fetchBooks = useCallback(async (page: number) => {
    const token = getToken();
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/book`, {
        headers: { Authorization: token },
        params: { page, limit: booksPerPage, search },
      });

      setBooks(response.data.books);
      setPageCount(response.data.totalPages);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch books. Please try again later.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [booksPerPage, search]);

  useEffect(() => {
    fetchBooks(page);
  }, [fetchBooks, page]);

  const handleUpdate = (bookId: string) => {
    navigate(`/update-book/${bookId}`); // Navigate to update book page
  };

  const handleDelete = async () => {
    if (!bookToDelete) return;
    const token = getToken();
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/book/${bookToDelete}`, {
        headers: { Authorization: token },
      });
      setShowModal(false);
      fetchBooks(page);
    } catch (error) {
      console.error("Error deleting book:", error);
      setError("Failed to delete book. Please try again.");
    }
  };

  const confirmDelete = (id: string) => {
    setBookToDelete(id);
    setOpenCardIndex(null); // Close the detailed view
    setShowModal(true);
  };

  const cancelDelete = () => {
    setBookToDelete(null);
    setShowModal(false);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="search-div p-4">
        <input
          type="text"
          placeholder="Search books by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 shadow-md border-t-2 shadow-gray-300 rounded mt-20"
        />
      </div>
      <div className="p-6">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <BookCard
                key={book._id}
                book={book}
                showDetails={index === openCardIndex}
                toggleDetails={() => setOpenCardIndex(openCardIndex === index ? null : index)}
                onUpdate={() => handleUpdate(book._id)}
                onDelete={() => confirmDelete(book._id)}
              />
            ))
          ) : (
            !loading && <p className="text-center font-bold text-red-600">No books found</p>
          )}
        </div>
        {loading && <Loading />}
        <div className="my-20 mx-96 flex justify-center w-22 bg-black">
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 mx-1 rounded-md ${page === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      {showModal && (
        <Modal
          message="Are you sure you want to delete this book?"
          onConfirm={handleDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};
