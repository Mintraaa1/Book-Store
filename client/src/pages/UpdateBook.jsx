import React, { useEffect, useState } from "react";
import BookService from "../services/book.service";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await BookService.getBookById(id);
        if (response.status === 200) {
          setBook(response.data);
        }
      } catch (error) {
        Swal.fire("Error", error?.response?.data?.message || error.message, "error");
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await BookService.updateBook(id, book);
      if (response.status === 200) {
        Swal.fire("Success", "Book updated successfully!", "success");
        navigate("/");
      }
    } catch (error) {
      Swal.fire("Error", error?.response?.data?.message || error.message, "error");
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" value={book.title || ""} placeholder="Title" className="input input-bordered w-full" onChange={handleChange} required />
        <input type="text" name="author" value={book.author || ""} placeholder="Author" className="input input-bordered w-full" onChange={handleChange} required />
        <input type="text" name="category" value={book.category || ""} placeholder="Category" className="input input-bordered w-full" onChange={handleChange} />
        <input type="number" name="publishYear" value={book.publishYear || ""} placeholder="Publish Year" className="input input-bordered w-full" onChange={handleChange} />
        <button type="submit" className="btn btn-primary w-full">Update</button>
      </form>
    </div>
  );
};

export default UpdateBook;
