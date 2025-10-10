import React, { useState } from "react";
import BookService from "../services/book.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    publishYear: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await BookService.createBook(book);
      if (response.status === 201 || response.status === 200) {
        Swal.fire("Success", "Book added successfully!", "success").then(() => {
          navigate("/"); // ✅ กลับหน้า Home แล้ว Home จะโหลดใหม่อัตโนมัติ
        });
      }
    } catch (error) {
      Swal.fire("Error", error?.response?.data?.message || error.message, "error");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">➕ Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" className="input input-bordered w-full" onChange={handleChange} required />
        <input type="text" name="author" placeholder="Author" className="input input-bordered w-full" onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" className="input input-bordered w-full" onChange={handleChange} />
        <input type="number" name="publishYear" placeholder="Publish Year" className="input input-bordered w-full" onChange={handleChange} />
        <button type="submit" className="btn btn-primary w-full">Save</button>
      </form>
    </div>
  );
};

export default AddBook;
