import { FormEvent, useState } from "react";
import Input from "../components/Input";
import { BACKEND_URL } from "../config";
import { Button } from "../components/Button";

export const AddBook = () => {
  const [accessionNo, setAccessionNo] = useState("");
  const [author, setAuthor] = useState("");
  const [edition, setEdition] = useState("");
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState("");
  const [volume, setVolume] = useState("");
  const [publisher, setPublisher] = useState("");
  const [source, setSource] = useState("");
  const [billdate, setBilldate] = useState("");
  const [cost, setCost] = useState("");
  const [rackno, setRackno] = useState("");
  const [error, setError] = useState("");

  const getToken = () => {
    const token = localStorage.getItem("token");
    console.log("Retrieved token:", token); 
    return token;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = getToken();
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    const payload = {
      accessionNo,
      author,
      edition,
      title,
      pages: parseInt(pages, 10), 
      volume: parseInt(volume),
      publisher,
      source,
      billdate,
      cost: parseFloat(cost), 
      rackno, 
    };

    try {
      // console.log("Before fetch POST request"); 
      // console.log("Token:", token); 
     // console.log("Payload:", JSON.stringify(payload)); 

      const response = await fetch(`${BACKEND_URL}/api/v1/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      });

      // console.log("After fetch POST request"); 
      // console.log("Response:", response);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      alert("Book added successfully!");

      setAccessionNo("");
      setAuthor("");
      setEdition("");
      setTitle("");
      setPages("");
      setVolume("");
      setPublisher("");
      setSource("");
      setBilldate("");
      setCost("");
      setRackno("");
    } catch (err) {
      console.error("Error in fetch POST request", err); 
        setError("An error occurred during registration. Please try again.");
    }
  };

  return (
    <>
      <div className="h-screen w-full flex mt-10 justify-center items-center bg-sky-300">
        <form
          onSubmit={handleSubmit}
          className="w-92 border-t-2 shadow-lg rounded-md absolute bg-white shadow-slate-300"
        >
          <h1 className="font-extrabold text-center mt-4 text-slate-900">Add Book</h1>
          <div className="grid grid-cols-2 m-4">
            <Input
              label="Accession no"
              name="accessionNo"
              value={accessionNo}
              onChange={(e) => setAccessionNo(e.target.value)}
              placeholder="Enter Accession No"
              type="text"
            />
            <Input
              label="Author"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="John Doe"
              type="text"
            />
            <Input
              label="Edition"
              name="edition"
              value={edition}
              onChange={(e) => setEdition(e.target.value)}
              placeholder="Enter edition"
              type="text"
            />
            <Input
              label="Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              type="text"
            />
            <Input
              label="Pages"
              name="pages"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              placeholder="230"
              type="number"
            />
            <Input
              label="Volume"
              name="volume"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              placeholder="Enter volume"
              type="number"
            />
            <Input
              label="Publisher"
              name="publisher"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              placeholder="Enter publisher"
              type="text"
            />
            <Input
              label="Source"
              name="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Enter source"
              type="text"
            />
            <Input
              label="Bill Date"
              name="billdate"
              value={billdate}
              onChange={(e) => setBilldate(e.target.value)}
              placeholder="2024-06-24"
              type="date"
            />
            <Input
              label="Cost"
              name="cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="489"
              type="number"
            />
            <Input
              label="Rack"
              name="rackno"
              value={rackno}
              onChange={(e) => setRackno(e.target.value)}
              placeholder="a_1"
              type="text"
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="w-61 flex justify-center items-center mb-2">
            <Button size="lg">Submit</Button>
          </div>
        </form>
      </div>
    </>
  );
};
