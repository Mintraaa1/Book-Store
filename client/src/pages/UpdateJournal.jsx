import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JournalService from "../services/journal.service";
import Swal from "sweetalert2";

const UpdateJournal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [journal, setJournal] = useState({
    title: "",
    author: "",
    issn: "",
    volume: "",
    issue: "",
    publicationFrequency: "",
  });

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const res = await JournalService.getJournalById(id);
        if (res.status === 200) setJournal(res.data.data);
      } catch (error) {
        Swal.fire("Error", error?.response?.data?.message || error.message, "error");
      }
    };
    fetchJournal();
  }, [id]);

  const handleChange = (e) => {
    setJournal({ ...journal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await JournalService.updateJournalById(id, journal);
      if (res.status === 200) {
        Swal.fire("Success", "Journal updated!", "success");
        navigate("/");
      }
    } catch (error) {
      Swal.fire("Error", error?.response?.data?.message || error.message, "error");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">Update Journal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={journal.title} placeholder="Title" className="input input-bordered w-full" onChange={handleChange} required />
        <input name="author" value={journal.author} placeholder="Author" className="input input-bordered w-full" onChange={handleChange} />
        <input name="issn" value={journal.issn} placeholder="ISSN" className="input input-bordered w-full" onChange={handleChange} />
        <input name="volume" value={journal.volume} placeholder="Volume" className="input input-bordered w-full" onChange={handleChange} />
        <input name="issue" value={journal.issue} placeholder="Issue" className="input input-bordered w-full" onChange={handleChange} />
        <input name="publicationFrequency" value={journal.publicationFrequency} placeholder="Publication Frequency" className="input input-bordered w-full" onChange={handleChange} />
        <button type="submit" className="btn btn-primary w-full">Update</button>
      </form>
    </div>
  );
};

export default UpdateJournal;
