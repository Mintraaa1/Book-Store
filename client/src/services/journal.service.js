// src/services/journal.service.js
import api from "./api";
export default {
  getAllJournals: () => api.get("/journals"),
  getJournalById: (id) => api.get(`/journals/${id}`),
  createJournal: (data) => api.post("/journals", data),
  updateJournalById: (id, data) => api.put(`/journals/${id}`, data),
  deleteJournal: (id) => api.delete(`/journals/${id}`),
};
