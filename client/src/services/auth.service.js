import api from "./api";
import TokenService from "./token.service";

const API_URL = import.meta.env.VITE_AUTH_API;

// สมัครสมาชิก
const register = async (username, name, email, password) => {
  return await api.post(`${API_URL}/register`, {
    username,
    name,
    email,
    password,
  });
};

// ล็อกอิน
const login = async (username, password) => {
  const response = await api.post(`${API_URL}/login`, { username, password });
  
  if (response.data?.token) {
    TokenService.setUser(response.data);
  }

  return response;
};

// ออกจากระบบ
const logout = () => {
  TokenService.removeUser();
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;
