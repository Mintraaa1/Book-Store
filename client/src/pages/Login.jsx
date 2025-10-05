import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { login: loginFn, user } = useAuthContext();

  // ถ้า login แล้ว → กลับไปหน้า Home
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const currentUser = await AuthService.login(
        credentials.username,
        credentials.password
      );
      if (currentUser.status === 200) {
        Swal.fire({
          title: "User Login",
          text: "Login successfully!",
          icon: "success",
        }).then(() => {
          loginFn(currentUser.data);
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "User Login",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-700 to-green-300 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-center text-black-700 mb-2">
          Welcome
        </h2>
        <p className="text-center text-gray-500 mb-4">Login to your account</p>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow w-full"
              value={credentials.username}
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              className="grow w-full"
              name="password"
              value={credentials.password}
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </label>

          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-all mt-2"
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
