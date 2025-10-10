// src/services/book.service.js
import api from "./api";
export default {
  getAllBooks: () => api.get("/books"),
  getBookById: (id) => api.get(`/books/${id}`),
  createBook: (data) => api.post("/books", data),
  updateBookById: (id, data) => api.put(`/books/${id}`, data),
  deleteBook: (id) => api.delete(`/books/${id}`),
};
