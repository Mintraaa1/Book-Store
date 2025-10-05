// ดึง user object จาก localStorage
const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// เก็บ user object ลง localStorage
const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// ดึง access token
const getLocalAccessToken = () => {
  const user = getUser();
  return user?.token || user?.accessToken || null; // ✅ รองรับหลายรูปแบบ
};

// ลบ user
const removeUser = () => {
  localStorage.removeItem("user");
};

const TokenService = {
  getLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;
