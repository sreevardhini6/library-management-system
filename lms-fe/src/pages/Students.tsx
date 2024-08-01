import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { StudentCard } from "../components/StudentCard";
import { Loading } from "../components/Loading";

export const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 41;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("User is not authenticated.");
        }

        const response = await axios.get(`${BACKEND_URL}/api/v1/student`, {
          headers: {
            Authorization: token,
          },
        });

        if (response.data && Array.isArray(response.data)) {
          setStudents(response.data);
        } else {
          console.error("Unexpected response format", response.data);
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Failed to fetch students. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  
  return (
    <div className="p-6 mt-20">
      <div className=" flex items-center justify-center">
        <input
          type="text"
          placeholder="Search by student name"
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 w-80 border border-gray-300 rounded-md"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paginatedStudents.map((student) => (
          <StudentCard key={student._id} student={student} />
        ))}
      </div>
      {totalPages > 1 && (
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
      )}
    </div>
  );
};
