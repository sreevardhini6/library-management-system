import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import IssueBookModal from "../pages/IssueBookModel";
import { BACKEND_URL } from "../config";
import axios from "axios";
import BookDetailsModal from "./BookDetailsModal";

interface Book {
  title: string;
  author: string;
  issuedBookId: string; 
}

interface Student {
  _id: string;
  name: string;
  hallTicket: string;
  year: string;
  batch: string;
  dept: string;
  issuedBooks: string[]; 
}

interface StudentCardProps {
  student: Student;
}

const fetchBookDetails = async (bookIds: string[]): Promise<Book[]> => {
  const token = localStorage.getItem("token");
  const books = await Promise.all(
    bookIds.map(async (id) => {
      const response = await axios.get(`${BACKEND_URL}/api/v1/issue/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      const data = response.data;
      return data;
    })
  );
  return books.map(issue => ({
    ...issue.book,
    issuedBookId: issue._id, 
  }));
};

export const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  const { _id, name, hallTicket, year, batch, dept, issuedBooks } = student;
  const [showModal, setShowModal] = useState(false);
  const [showBooksModal, setShowBooksModal] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const getBookDetails = async () => {
      if (issuedBooks.length > 0) {
        try {
          const bookDetails = await fetchBookDetails(issuedBooks);
          setBooks(bookDetails);
        } catch (error) {
          console.error("Error fetching book details:", error);
        }
      }
    };
    getBookDetails();
  }, [issuedBooks]);

  const handleBooksModalClick = () => {
    setShowBooksModal(true);
  };

  const handleCloseBooksModal = () => {
    setShowBooksModal(false);
  };

  const handleIssueClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBookReturn = (returnedBookId: string) => {
    setBooks(books.filter(book => book.issuedBookId !== returnedBookId));
  };

  return (
    <div className="bg-white-200 w-80 p-6 my-20 rounded-md text-wrap shadow-lg shadow-slate-200 bg-gradient-to-r from-blue-200 to-cyan-200 hover:shadow-slate-400">
      <p>
        <strong>ID:</strong> {_id}
      </p>
      <p className="font-extrabold">
        <strong className="text-wrap ">Name:</strong> {name}
      </p>
      <p>
        <strong>Hall Ticket:</strong> {hallTicket}
      </p>
      <p>
        <strong>Year:</strong> {year}
      </p>
      <p>
        <strong>Batch:</strong> {batch}
      </p>
      <p>
        <strong>Department:</strong> {dept}
      </p>
      <p className="flex pr-2">
        <strong>Books Issued :</strong>
        <span>
          {books.length > 0 ? (
            <span>{books[0].title} by {books[0].author} ...</span>
          ) : (
            <span>No books issued</span>
          )}
        </span>
      </p>
      <div className="flex justify-evenly mt-3 mb-0 p-0 ">
        <Button variant="default" onClick={handleIssueClick}>
          Issue
        </Button>
        {showModal && (
          <IssueBookModal
            studentId={_id}
            onClose={handleCloseModal}
          />
        )}
        <Button variant="destructive" onClick={handleBooksModalClick}>
          Return
        </Button>
        {showBooksModal && (
          <BookDetailsModal
            books={books}
            onBookReturn={handleBookReturn}
            onClose={handleCloseBooksModal}
          />
        )}
      </div>
    </div>
  );
};
