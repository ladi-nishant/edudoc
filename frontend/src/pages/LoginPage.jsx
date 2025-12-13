import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
export default function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [focusedUser, setFocusedUser] = useState(false);
  const [focusedPass, setFocusedPass] = useState(false);
  const adminMail = "nishant6038@gmail.com";
  const notify = () => alert(`Please contact admin: ${adminMail}`);
  useEffect(() => {
    localStorage.removeItem("auth");
    setStep(1);
    setUsername("");
    setPassword("");
    setFocusedUser(false);
    setFocusedPass(false);
  }, []);
  const checkUsername = async () => {
    if (!username.trim()) return alert("Enter a valid username.");
    try {
      const res = await API.post("/auth/check-username", { username });
      if (!res.data.success) return alert("User not found.");
      setStep(2);
    } catch {
      alert("Server error.");
    }
  };
  const verifyPassword = async () => {
    if (!password.trim()) return alert("Enter password.");
    try {
      const res = await API.post("/auth/verify-password", {
        username,
        password,
      });
      if (!res.data.success) return alert("Invalid password.");
      localStorage.setItem("auth", "true");
      navigate("/search");
    } catch {
      alert("Server error.");
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-md shadow-lg p-8 mb-6">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-900">Sign in to EduDoc</h2>
        {step === 1 && (
          <>
            <div className="relative mb-8">
              <input type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setFocusedUser(true)}
                onBlur={() => setFocusedUser(username !== "")}
                className="w-full border-b border-gray-400 bg-transparent pt-6 pb-2 outline-none text-gray-900 focus:border-blue-900 transition-all"
              />
              <label
                className={`absolute left-0 text-gray-500 pointer-events-none transition-all duration-200 ${
                  focusedUser || username !== ""
                    ? "-top-1 text-sm text-blue-900"
                    : "top-5 text-base"
                }`}
              >
                Username
              </label>
            </div>

            <button
              onClick={checkUsername}
              className="w-full bg-[#2E2E2E] text-white py-3 rounded-md hover:bg-[#1F1F1F] transition-colors"
            >
              Next
            </button>

            <p
              onClick={notify}
              className="text-blue-900 mt-3 cursor-pointer text-center"
            >
              Forgot username?
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <div className="relative mb-8">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedPass(true)}
                onBlur={() => setFocusedPass(password !== "")}
                className="w-full border-b border-gray-400 bg-transparent pt-6 pb-2 outline-none text-gray-900 focus:border-blue-900 transition-all"
              />
              <label
                className={`absolute left-0 text-gray-500 pointer-events-none transition-all duration-200 ${
                  focusedPass || password !== ""
                    ? "-top-1 text-sm text-blue-900"
                    : "top-5 text-base"
                }`}
              >
                Password
              </label>
            </div>

            <button
              onClick={verifyPassword}
              className="w-full bg-[#2E2E2E] text-white py-3 rounded-md hover:bg-[#1F1F1F] transition-colors"
            >
              Login
            </button>

            <p
              onClick={notify}
              className="text-blue-900 mt-3 cursor-pointer text-center"
            >
              Forgot password?
            </p>
          </>
        )}
      </div>

      <div className="w-full max-w-md bg-white rounded-md shadow-lg p-6 text-center">
        <h3 className="text-lg font-semibold mb-4">
          Don’t have an EduDoc Account?
        </h3>
        <button
          onClick={notify}
          className="w-full border border-gray-800 py-3 rounded-md hover:bg-gray-100 transition"
        >
          Create Account
        </button>
        <p className="text-gray-600 mt-4 text-sm">© EduDoc</p>
      </div>
    </div>
  );
}
