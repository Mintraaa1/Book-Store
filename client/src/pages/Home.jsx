import React, { useState, useEffect } from "react";
import Books from "../components/Books";
import Journals from "../components/Journals";
import Comics from "../components/Comics";
import BookService from "../services/book.service";
import JournalService from "../services/journal.service";
import ComicService from "../services/comic.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [activeTab, setActiveTab] = useState("book");
  const [books, setBooks] = useState([]);
  const [journals, setJournals] = useState([]);
  const [comics, setComics] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [bookRes, journalRes, comicRes] = await Promise.all([
        BookService.getAllBooks(),
        JournalService.getAllJournals(),
        ComicService.getAllComics(),
      ]);
      if (bookRes.status === 200) setBooks(bookRes.data?.data || []);
      if (journalRes.status === 200) setJournals(journalRes.data?.data || []);
      if (comicRes.status === 200) setComics(comicRes.data?.data || []);
    } catch (error) {
      Swal.fire("Error", error?.response?.data?.message || error.message, "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const filterData = (list) =>
    list.filter(
      (item) =>
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.author?.toLowerCase().includes(search.toLowerCase())
    );

  const handleDelete = async (id, type) => {
    Swal.fire({
      title: "Are you sure?",
      text: `This ${type} will be deleted permanently!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      try {
        let res;
        if (type === "book") res = await BookService.deleteBook(id);
        if (type === "journal") res = await JournalService.deleteJournal(id);
        if (type === "comic") res = await ComicService.deleteComic(id);
        if (res?.status === 200) {
          Swal.fire("Deleted!", `${type} deleted successfully`, "success");
          fetchData();
        }
      } catch (error) {
        Swal.fire("Error", error?.response?.data?.message || error.message, "error");
      }
    });
  };

  const handleEdit = (id, type) => {
    if (type === "book") navigate(`/update/book/${id}`);
    if (type === "journal") navigate(`/update/journal/${id}`);
    if (type === "comic") navigate(`/update/comic/${id}`);
  };

  const handleAdd = (type) => {
    if (type === "book") navigate("/add/book");
    if (type === "journal") navigate("/add/journal");
    if (type === "comic") navigate("/add/comic");
  };

  const renderContent = () => {
    if (activeTab === "book")
      return <Books books={filterData(books)} onEdit={(id) => handleEdit(id, "book")} onDelete={(id) => handleDelete(id, "book")} />;
    if (activeTab === "journal")
      return <Journals journals={filterData(journals)} onEdit={(id) => handleEdit(id, "journal")} onDelete={(id) => handleDelete(id, "journal")} />;
    if (activeTab === "comic")
      return <Comics comics={filterData(comics)} onEdit={(id) => handleEdit(id, "comic")} onDelete={(id) => handleDelete(id, "comic")} />;
  };

  return (
    <div className={`min-h-screen transition-all ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
          📚 Book Store
        </h1>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="px-4 py-2 rounded-lg shadow bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 transition"
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </header>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-6">
        {["book", "journal", "comic"].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 rounded-full font-semibold ${
              activeTab === tab
                ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "book" && "📘 Books"}
            {tab === "journal" && "📓 Journals"}
            {tab === "comic" && "📚 Comics"}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="search"
          placeholder="🔍 Search by title or author..."
          className="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 shadow focus:ring focus:ring-purple-300 focus:outline-none dark:bg-gray-800 dark:border-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Add Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => handleAdd(activeTab)}
          className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow hover:opacity-90 transition"
        >
          ➕ Add {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </button>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-10">{renderContent()}</div>
    </div>
  );
};

export default Home;
