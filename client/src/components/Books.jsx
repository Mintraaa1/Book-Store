import React from "react";

const Books = ({ books, onEdit, onDelete }) => {
  if (!Array.isArray(books)) return <p className="text-center">No books found</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {books.map((book) => (
        <div
          key={book.itemId}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
        >
          <img
            src={book.coverImage || "https://via.placeholder.com/400x200?text=No+Image"}
            alt={book.title}
            className="w-full h-52 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 truncate">
              {book.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{book.author}</p>
            <p className="text-sm text-purple-600 dark:text-purple-400">{book.category}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => onEdit(book.itemId)}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow hover:opacity-90"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(book.itemId)}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg shadow hover:opacity-90"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Books;
