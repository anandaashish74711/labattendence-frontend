import { useState } from "react";
import { useLoginMutation } from "../redux/features/apiSlice";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/features/authslice";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [loginid, setLoginid] = useState("");
  const [loginpassword, setLoginpassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const handleLogin = async (e:any) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login({ loginid, loginpassword }).unwrap();
      dispatch(loginSuccess(response));
      navigate("/home"); // Redirect to home after login
    } catch (err) {
      if (err && typeof err === 'object' && 'data' in err) {
        setError((err as any).data?.error || "Login failed");
      } else {
        setError("Login failed");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Login ID</label>
            <input
              type="text"
              value={loginid}
              onChange={(e) => setLoginid(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={loginpassword}
              onChange={(e) => setLoginpassword(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
