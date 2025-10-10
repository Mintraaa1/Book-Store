import React from "react";

const Comics = ({ comics, onEdit, onDelete }) => {
  if (!Array.isArray(comics)) return <p>No comics found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {comics.map((c) => (
        <div key={c.itemId} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold">{c.title}</h2>
          <p>Author: {c.author}</p>
          <p>Series: {c.series}</p>
          <p>Volume: {c.volumeNumber}</p>
          <div className="flex gap-2 mt-2">
            <button onClick={() => onEdit(c.itemId)} className="btn btn-info btn-sm">Edit</button>
            <button onClick={() => onDelete(c.itemId)} className="btn btn-error btn-sm">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comics;
