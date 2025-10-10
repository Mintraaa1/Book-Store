import React, { useState } from "react";
import JournalService from "../services/journal.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddJournal = () => {
  const [journal, setJournal] = useState({
    title: "",
    author: "",
    issn: "",
    volume: "",
    issue: "",
    publicationFrequency: "",
    category: "Journal",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setJournal({ ...journal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await JournalService.createJournal(journal);
      if (res.status === 201 || res.status === 200) {
        Swal.fire("✅ Success", "Journal added successfully!", "success");
        navigate("/");
      }
    } catch (error) {
      Swal.fire("❌ Error", error?.response?.data?.message || error.message, "error");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">Add New Journal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Title" className="input input-bordered w-full" onChange={handleChange} required />
        <input name="author" placeholder="Author" className="input input-bordered w-full" onChange={handleChange} />
        <input name="issn" placeholder="ISSN" className="input input-bordered w-full" onChange={handleChange} />
        <input name="volume" placeholder="Volume" className="input input-bordered w-full" onChange={handleChange} />
        <input name="issue" placeholder="Issue" className="input input-bordered w-full" onChange={handleChange} />
        <input name="publicationFrequency" placeholder="Publication Frequency" className="input input-bordered w-full" onChange={handleChange} />
        <button type="submit" className="btn btn-primary w-full">Save</button>
      </form>
    </div>
  );
};

export default AddJournal;
