import api from "./api";

const BOOK_API = import.meta.env.VITE_BOOK_API;

// ดึงทั้งหมด
const getAllBooks = async () => {
  return await api.get(BOOK_API);
};

// ดึงตาม id
const getBookById = async (id) => {
  return await api.get(`${BOOK_API}/${id}`);
};

// เพิ่มหนังสือใหม่
const createBook = async (book) => {
  return await api.post(BOOK_API, book);
};

// อัปเดตหนังสือ
const updateBook = async (id, book) => {
  return await api.put(`${BOOK_API}/${id}`, book);
};

// ลบหนังสือ
const deleteBook = async (id) => {
  return await api.delete(`${BOOK_API}/${id}`);
};

const BookService = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};

export default BookService;
