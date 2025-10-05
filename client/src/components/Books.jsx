import React from "react";

const Books = ({ books, onEdit, onDelete }) => {
  if (!Array.isArray(books) || books.length === 0) {
    return <p className="text-center">No books found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {books.map((book) => (
        <div key={book.itemId} className="card bg-base-100 shadow-xl">
          <figure>
            <img
              src={book.coverImage || "https://via.placeholder.com/150"}
              alt={book.title}
              className="h-48 w-full object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{book.title}</h2>
            <p className="text-gray-500">👤 {book.author}</p>
            <p className="text-sm">📖 {book.category}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-sm btn-primary" onClick={() => onEdit(book.itemId)}>
                Edit
              </button>
              <button className="btn btn-sm btn-error" onClick={() => onDelete(book.itemId)}>
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
