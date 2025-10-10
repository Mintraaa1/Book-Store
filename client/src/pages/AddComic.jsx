import React, { useState } from "react";
import ComicService from "../services/comic.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddComic = () => {
  const [comic, setComic] = useState({
    title: "",
    author: "",
    series: "",
    volumeNumber: "",
    illustrator: "",
    colorType: "",
    targetAge: "",
    category: "Comic",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setComic({ ...comic, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await ComicService.createComic(comic);
      if (res.status === 201 || res.status === 200) {
        Swal.fire("✅ Success", "Comic added successfully!", "success");
        navigate("/");
      }
    } catch (error) {
      Swal.fire("❌ Error", error?.response?.data?.message || error.message, "error");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">Add New Comic</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Title" className="input input-bordered w-full" onChange={handleChange} required />
        <input name="author" placeholder="Author" className="input input-bordered w-full" onChange={handleChange} />
        <input name="series" placeholder="Series" className="input input-bordered w-full" onChange={handleChange} />
        <input name="volumeNumber" placeholder="Volume Number" className="input input-bordered w-full" onChange={handleChange} />
        <input name="illustrator" placeholder="Illustrator" className="input input-bordered w-full" onChange={handleChange} />
        <input name="colorType" placeholder="Color Type" className="input input-bordered w-full" onChange={handleChange} />
        <input name="targetAge" placeholder="Target Age" className="input input-bordered w-full" onChange={handleChange} />
        <button type="submit" className="btn btn-primary w-full">Save</button>
      </form>
    </div>
  );
};

export default AddComic;
