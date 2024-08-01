import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { Loading } from "../components/Loading";
import Modal from "../components/Modal";

interface Student {
  id: string;
  name: string;
  hallTicket: number;
}

interface Book {
  title: string;
  author: string;
  accessionNo: string;
}

interface Issue {
  _id: string;
  book?: Book; // Making book optional to handle possible null values
  student?: Student;
  issuedDate: string;
  returned?: boolean;
}

const ReturnedBooks: React.FC = () => {
  const [returnedBooks, setReturnedBooks] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("User is not authenticated.");
        }

        const response = await fetch(`${BACKEND_URL}/api/v1/issue`, {
          headers: {
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch issued books");
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          const filteredBooks = data.filter((issue: Issue) => issue.returned);
          const sortedBooks = filteredBooks.sort((a, b) => {
            return new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime();
          });
          setReturnedBooks(sortedBooks);
        } else {
          console.error("Unexpected response format", data);
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching issued books:", error);
        setError("Failed to fetch issued books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchIssuedBooks();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredBooks = returnedBooks.filter(
    (issue) =>
      issue.book?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.book?.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.book?.accessionNo.includes(searchTerm) ||
      (issue.student &&
        issue.student.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = filteredBooks.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="mt-20 flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-center underline">Returned Books</h2>
      <div className="flex items-center justify-center">
        <input
          type="text"
          placeholder="Search by title, author, accession no, or student"
          value={searchTerm}
          onChange={handleSearch}
          className="mb-4 p-2 w-80 border border-gray-300 rounded-md"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedBooks.length === 0 ? (
          <p>No books have been returned yet.</p>
        ) : (
          paginatedBooks.map((issue) => (
            <div
              key={issue._id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 ease-in-out"
            >
              <h3 className="text-lg font-bold mb-2">{issue.book?.title}</h3>
              <p className="text-sm text-gray-600 font-bold">
                <strong>Book:</strong> {issue.book?.title} by {issue.book?.author}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Accession No:</strong> {issue.book?.accessionNo}
              </p>
              {issue.student && (
                <>
                  <p className="text-sm text-gray-600 font-extrabold">
                    <strong>Issued To:</strong> {issue.student.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Hall Ticket:</strong> {issue.student.hallTicket}
                  </p>
                </>
              )}
              <p className="text-sm text-gray-600">
                <strong>Issued Date:</strong> {new Date(issue.issuedDate).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 mx-1 rounded ${
              index + 1 === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReturnedBooks;
