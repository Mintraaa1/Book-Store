import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ComicService from "../services/comic.service";
import Swal from "sweetalert2";

const UpdateComic = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comic, setComic] = useState({
    title: "",
    author: "",
    series: "",
    volumeNumber: "",
    illustrator: "",
    colorType: "",
    targetAge: "",
  });

  useEffect(() => {
    const fetchComic = async () => {
      try {
        const res = await ComicService.getComicById(id);
        if (res.status === 200) setComic(res.data.data);
      } catch (error) {
        Swal.fire("Error", error?.response?.data?.message || error.message, "error");
      }
    };
    fetchComic();
  }, [id]);

  const handleChange = (e) => {
    setComic({ ...comic, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await ComicService.updateComicById(id, comic);
      if (res.status === 200) {
        Swal.fire("Success", "Comic updated!", "success");
        navigate("/");
      }
    } catch (error) {
      Swal.fire("Error", error?.response?.data?.message || error.message, "error");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">Update Comic</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={comic.title} placeholder="Title" className="input input-bordered w-full" onChange={handleChange} required />
        <input name="author" value={comic.author} placeholder="Author" className="input input-bordered w-full" onChange={handleChange} />
        <input name="series" value={comic.series} placeholder="Series" className="input input-bordered w-full" onChange={handleChange} />
        <input name="volumeNumber" value={comic.volumeNumber} placeholder="Volume Number" className="input input-bordered w-full" onChange={handleChange} />
        <input name="illustrator" value={comic.illustrator} placeholder="Illustrator" className="input input-bordered w-full" onChange={handleChange} />
        <input name="colorType" value={comic.colorType} placeholder="Color Type" className="input input-bordered w-full" onChange={handleChange} />
        <input name="targetAge" value={comic.targetAge} placeholder="Target Age" className="input input-bordered w-full" onChange={handleChange} />
        <button type="submit" className="btn btn-primary w-full">Update</button>
      </form>
    </div>
  );
};

export default UpdateComic;
