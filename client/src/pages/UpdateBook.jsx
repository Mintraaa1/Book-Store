import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookService from "../services/book.service";
import Swal from "sweetalert2";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    publishYear: "",
    coverImage: "",
  });

  // โหลดข้อมูลหนังสือจาก id
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await BookService.getBookById(id);
        if (response.status === 200) {
          setBook(response.data.data || response.data);
        }
      } catch (error) {
        Swal.fire("Error", error?.response?.data?.message || error.message, "error");
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await BookService.updateBookById(id, book);
      if (response.status === 200) {
        Swal.fire("Success", "Book updated successfully!", "success").then(() => {
          navigate("/"); // ✅ กลับหน้า Home แล้ว Home จะโหลดใหม่เอง
        });
      }
    } catch (error) {
      Swal.fire("Error", error?.response?.data?.message || error.message, "error");
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl text-center mt-5 mb-4">✏️ Update Book</h1>
      <div className="flex flex-col items-center space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          className="input input-bordered w-full max-w-md"
          value={book.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          className="input input-bordered w-full max-w-md"
          value={book.author}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          className="input input-bordered w-full max-w-md"
          value={book.category}
          onChange={handleChange}
        />
        <input
          type="number"
          name="publishYear"
          placeholder="Publish Year"
          className="input input-bordered w-full max-w-md"
          value={book.publishYear}
          onChange={handleChange}
        />
        <input
          type="text"
          name="coverImage"
          placeholder="Cover Image URL"
          className="input input-bordered w-full max-w-md"
          value={book.coverImage}
          onChange={handleChange}
        />

        {book.coverImage && (
          <img src={book.coverImage} alt="Preview" className="h-32 mt-2" />
        )}

        <div className="space-x-2 mt-4">
          <button onClick={handleSubmit} className="btn btn-primary">
            Update
          </button>
          <button onClick={() => navigate("/")} className="btn btn-error">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;
