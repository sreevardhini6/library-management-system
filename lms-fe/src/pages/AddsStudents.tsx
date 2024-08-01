import { useState, ChangeEvent, FormEvent } from "react";
import Input from "../components/Input";
import { Button } from "../components/Button";
import axios from 'axios';
import { BACKEND_URL } from "../config";

export const AddStudent = () => {
  const [name, setName] = useState("");
  const [hallTicket, setHallTicket] = useState("");
  const [year, setYear] = useState("1");
  const [batch, setBatch] = useState("");
  const [dept, setDept] = useState("BS");
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState(false);
  const [hallTicketError, setHallTicketError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [batchError, setBatchError] = useState(false);
  const [deptError, setDeptError] = useState(false);

  const getToken = () => {

      const token = localStorage.getItem("token")
     return token; 
    }


  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setNameError(false);
  };

  const handleHallTicketChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHallTicket(e.target.value);
    setHallTicketError(false);
  };

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setYear(e.target.value);
    setYearError(false);
  };

  const handleBatchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBatch(e.target.value);
    setBatchError(false);
  };

  const handleDeptChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDept(e.target.value);
    setDeptError(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const token = getToken()
    if(!token) {
        setError("No token found. Please Log in ")
        return;
    }

    let hasError = false;

    if (name.trim() === "") {
      setNameError(true);
      hasError = true;
    }
    if (hallTicket.trim() === "") {
      setHallTicketError(true);
      hasError = true;
    }
    if (year.trim() === "") {
      setYearError(true);
      hasError = true;
    }
    if (batch.trim() === "") {
      setBatchError(true);
      hasError = true;
    }
    if (dept.trim() === "") {
      setDeptError(true);
      hasError = true;
    }

    if (hasError) {
      setError("Please fill out all fields correctly.");
      return;
    }
const payload = {
        name,
        hallTicket,
        year,
        batch,
        dept
      
}
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/student`,JSON.stringify(payload),{
        headers:{
            "Content-Type": "application/json",
            Authorization:token
        }
      } );
      if (response.status === 200) {
        setError("server problem")
      }

      alert("Book added successfully!");
      setError(""); 
      setName("");
      setHallTicket("");
      setYear("1");
      setBatch("");
      setDept("BS");
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="p-4 mt-20 flex justify-center items-center w-xl ">
      <form onSubmit={handleSubmit} className="w-1/3 shadow-md shadow-slate-200 hover:shadow-lg p-4">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <h1 className="text-center mb-6 text-2xl font-bold">Add Student</h1>
        <Input
          placeholder="Enter name"
          type="text"
          value={name}
          label="Name"
          onChange={handleNameChange}
          error={nameError}
        />
        {nameError && <span className="text-red-400 text-sm mt-1">Error: Name is required</span>}
        <Input
          placeholder="Enter hall ticket number"
          type="number"
          value={hallTicket}
          label="Hall Ticket"
          onChange={handleHallTicketChange}
          error={hallTicketError}
        />
        {hallTicketError && <span className="text-red-400 text-sm mt-1">Error: Hall Ticket is required</span>}
        <div className="mb-4 p-2">
          <label className="block text-sm font-extrabold pl-1 capitalize mb-1">Year</label>
          <select
            name="year"
            value={year}
            onChange={handleYearChange}
            className={`w-full p-2 border ${yearError ? 'border-red-200' : 'border-gray-200'} rounded-md text-black`}
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          {yearError && <span className="text-red-400 text-sm mt-1">Error: Year is required</span>}
        </div>
        <Input
          placeholder="Enter batch"
          type="text"
          value={batch}
          label="Batch"
          onChange={handleBatchChange}
          error={batchError}
        />
        {batchError && <span className="text-red-400 text-sm mt-1">Error: Batch is required</span>}
        <div className="mb-4 p-2">
          <label className="block text-sm font-extrabold pl-1 capitalize mb-1">Department</label>
          <select
            name="dept"
            value={dept}
            onChange={handleDeptChange}
            className={`w-full p-2 border ${deptError ? 'border-red-200' : 'border-gray-200'} rounded-md text-black`}
            required
          >
            <option value="BBA">BBA</option>
            <option value="BS">BS</option>
          </select>
          {deptError && <span className="text-red-400 text-sm mt-1">Error: Department is required</span>}
        </div>
        <div className=" flex justify-center items-center">
        <Button type="submit" size="lg" variant="default" >Add</Button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
