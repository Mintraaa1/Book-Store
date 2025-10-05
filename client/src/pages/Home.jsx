import React, { useState, useEffect } from "react";
import Books from "../components/Books";
import BookService from "../services/book.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const navigate = useNavigate();

  // โหลดข้อมูลจาก API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await BookService.getAllBooks();
        if (response.status === 200) {
          const apiData = response.data?.data || []; // ✅ ใช้ response.data.data
          setBooks(apiData);
          setFilteredBooks(apiData);
        }
      } catch (error) {
        Swal.fire("Error", error?.response?.data?.message || error.message, "error");
      }
    };
    fetchBooks();
  }, []);

  // ค้นหา
  const handleSearch = (keyword) => {
    if (!keyword) {
      setFilteredBooks(books);
      return;
    }
    const filtered = books.filter(
      (b) =>
        b.title?.toLowerCase().includes(keyword.toLowerCase()) ||
        b.author?.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  // ลบ
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This book will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await BookService.deleteBook(id);
          if (response.status === 200) {
            setBooks((prev) => prev.filter((book) => book.itemId !== id));
            setFilteredBooks((prev) => prev.filter((book) => book.itemId !== id));
            Swal.fire("Deleted!", "Book has been deleted.", "success");
          }
        } catch (error) {
          Swal.fire("Error", error?.response?.data?.message || error.message, "error");
        }
      }
    });
  };

  // ไปหน้าแก้ไข
  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-6">📚 Book Store</h1>

      {/* Search box */}
      <div className="flex justify-center mb-6">
        <input
          type="search"
          placeholder="Search by title or author..."
          className="input input-bordered w-full max-w-md"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* แสดงรายการ */}
      <Books books={filteredBooks} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Home;
