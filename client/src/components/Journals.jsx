import React from "react";

const Journals = ({ journals, onEdit, onDelete }) => {
  if (!Array.isArray(journals)) return <p>No journals found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {journals.map((j) => (
        <div key={j.itemId} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold">{j.title}</h2>
          <p>Author: {j.author}</p>
          <p>ISSN: {j.issn}</p>
          <p>Volume: {j.volume}</p>
          <p>Issue: {j.issue}</p>
          <div className="flex gap-2 mt-2">
            <button onClick={() => onEdit(j.itemId)} className="btn btn-info btn-sm">Edit</button>
            <button onClick={() => onDelete(j.itemId)} className="btn btn-error btn-sm">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Journals;
