import React, { useState, useContext, createContext, useEffect } from "react";
import AuthService from "../services/auth.service";
import TokenService from "../services/token.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // ฟังก์ชันดึง user จาก TokenService
  const getUser = () => {
    return TokenService.getUser();
  };

  // กำหนดค่าเริ่มต้นจาก TokenService
  const [user, setUser] = useState(() => getUser());

  // ฟังก์ชัน login
  const login = (userData) => {
    setUser(userData);
    TokenService.setUser(userData); // เก็บ user ลง storage
  };

  // ฟังก์ชัน logout
  const logout = () => {
    AuthService.logout();
    TokenService.removeUser?.(); // ถ้า TokenService มี removeUser
    setUser(null);
  };

  // Sync user state กับ TokenService
  useEffect(() => {
    if (user) {
      TokenService.setUser(user);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
