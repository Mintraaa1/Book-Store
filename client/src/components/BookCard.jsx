import React from "react";

const BookCard = ({ book, onEdit, onDelete }) => {
  return (
    <div className="card bg-white shadow-xl rounded-lg hover:scale-105 transition-transform">
      <figure>
        <img
          src={book.coverImage || "https://source.unsplash.com/400x600/?book"}
          alt={book.title}
          className="h-60 w-full object-cover rounded-t-lg"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-bold">{book.title}</h2>
        <p className="text-gray-600">{book.author}</p>
        <p className="text-sm text-gray-400">{book.category}</p>
        <div className="flex gap-2 mt-3">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onEdit(book.itemId)}
          >
            Edit
          </button>
          <button
            className="btn btn-error btn-sm"
            onClick={() => onDelete(book.itemId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
