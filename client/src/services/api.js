// src/services/api.js
import axios from "axios";
export default axios.create({
  baseURL: "https://bookshop-api-er7t.onrender.com/api",
});
