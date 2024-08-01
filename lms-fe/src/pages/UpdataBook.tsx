import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import Modal from "../components/Modal";

export const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    accessionNo: "",
    author: "",
    edition: "",
    title: "",
    pages: "",
    volume: "",
    publisher: "",
    source: "",
    billdate: "",
    cost: "",
    rackno: "",
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modifiedFields, setModifiedFields] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    const fetchBook = async () => {
      const token = getToken();
      try {
        const response = await fetch(`${BACKEND_URL}/api/v1/book/${id}`, {
          headers: { Authorization: token },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const bookData = await response.json();
        setFormData({
          accessionNo: bookData.accessionNo || "",
          author: bookData.author || "",
          edition: bookData.edition || "",
          title: bookData.title || "",
          pages: bookData.pages || "",
          volume: bookData.volume || "",
          publisher: bookData.publisher || "",
          source: bookData.source || "",
          billdate: bookData.billdate ? bookData.billdate.split("T")[0] : "",
          cost: bookData.cost || "",
          rackno: bookData.rackno || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching book data:", err);
        setError("Failed to fetch book details. Please try again later.");
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setModifiedFields({
      ...modifiedFields,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/book/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(modifiedFields),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Update response:", data);
      setModalVisible(true); // Show the modal
    } catch (err) {
      console.error("Error updating book data:", err);
      setError("Failed to update book. Please try again later.");
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    navigate("/books"); // Redirect after closing the modal
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full p-6 rounded">
        <h1 className="text-2xl font-bold mb-4">Update Book</h1>
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter title"
          type="text"
        />
        <Input
          label="Author"
          name="author"
          value={formData.author}
          onChange={handleInputChange}
          placeholder="Enter author"
          type="text"
        />
        <Input
          label="Accession No"
          name="accessionNo"
          value={formData.accessionNo}
          onChange={handleInputChange}
          placeholder="Enter accession number"
          type="text"
        />
        <Input
          label="Edition"
          name="edition"
          value={formData.edition}
          onChange={handleInputChange}
          placeholder="Enter edition"
          type="text"
        />
        <Input
          label="Pages"
          name="pages"
          value={formData.pages}
          onChange={handleInputChange}
          placeholder="Enter pages"
          type="number"
        />
        <Input
          label="Volume"
          name="volume"
          value={formData.volume}
          onChange={handleInputChange}
          placeholder="Enter volume"
          type="text"
        />
        <Input
          label="Publisher"
          name="publisher"
          value={formData.publisher}
          onChange={handleInputChange}
          placeholder="Enter publisher"
          type="text"
        />
        <Input
          label="Source"
          name="source"
          value={formData.source}
          onChange={handleInputChange}
          placeholder="Enter source"
          type="text"
        />
        <Input
          label="Bill Date"
          name="billdate"
          placeholder="date"
          value={formData.billdate}
          onChange={handleInputChange}
          type="date"
        />
        <Input
          label="Cost"
          name="cost"
          value={formData.cost}
          onChange={handleInputChange}
          placeholder="Enter cost"
          type="number"
        />
        <Input
          label="Rack"
          name="rackno"
          value={formData.rackno}
          onChange={handleInputChange}
          placeholder="Enter rack number"
          type="text"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
          Update Book
        </button>
      </form>
      
      {modalVisible && (
        <Modal
          message="Book updated successfully!"
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

