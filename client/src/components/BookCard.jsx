import React from "react";

const BookCard = ({ book, onEdit, onDelete }) => {
  return (
    <div className="card w-72 bg-base-100 shadow-xl">
      <figure>
        <img
          src={book.imageUrl || "https://placehold.co/200x300?text=No+Image"}
          alt={book.title}
          className="h-48 object-cover w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{book.title}</h2>
        <p className="text-sm text-gray-600">✍️ {book.author}</p>
        <p className="text-sm">📚 {book.category}</p>
        <p className="text-lg font-bold text-green-600">฿{book.price}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-sm btn-outline btn-primary"
            onClick={() => onEdit(book.id)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-outline btn-error"
            onClick={() => onDelete(book.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
