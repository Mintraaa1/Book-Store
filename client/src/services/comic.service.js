// src/services/comic.service.js
import api from "./api";
export default {
  getAllComics: () => api.get("/comics"),
  getComicById: (id) => api.get(`/comics/${id}`),
  createComic: (data) => api.post("/comics", data),
  updateComicById: (id, data) => api.put(`/comics/${id}`, data),
  deleteComic: (id) => api.delete(`/comics/${id}`),
};
