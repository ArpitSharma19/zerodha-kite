import React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function Login() {
  const nav = useNavigate();
  const { auth, login } = React.useContext(AppContext);
  const [userId, setUserId] = React.useState(auth?.userId || "XJY837");
  const [pass, setPass] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const initials = React.useMemo(() => {
    if (auth?.name) {
      const parts = auth.name.split(" ").filter(Boolean);
      return parts.map(p => p[0]).slice(0,2).join("").toUpperCase();
    }
    // fallback from userId (first and last char)
    return (userId?.[0] || "A") + (userId?.slice(-1) || "S");
  }, [auth?.name, userId]);

  React.useEffect(() => {
    // if already logged in
    if (localStorage.getItem("kite_demo_user")) nav("/dashboard");
  }, []);

  function submit(e) {
    e.preventDefault();
    const res = login(userId, pass);
    if (res.ok) {
      nav("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        {/* Kite logo */}
        <div className="flex justify-center mb-4">
          <svg
            viewBox="0 0 48 48"
            className="h-10 w-10 text-orange-500"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M24 6L12 18l12 12 12-12-12-12z"></path>
            <path d="M18 24l-6 6 6 6 6-6-6-6z" opacity="0.85"></path>
          </svg>
        </div>
        {/* h2 with userId as requested */}
        <h2 className="text-xl font-medium text-center mb-2">{userId}</h2>
        {/* person logo div (circle with initials) */}
        <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
          <span className="text-purple-600 font-medium">{initials}</span>
        </div>
        {/* Subtitle */}
        <h1 className="text-2xl font-medium text-gray-700 text-center mb-6">Login to Kite</h1>

        <form onSubmit={submit}>
          {/* User ID / Phone */}
          <div className="mb-4">
            <label className="sr-only">Phone number or User ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Phone number or User ID"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            {/* span with userId */}
            <span className="block text-xs text-gray-500 mt-1">{userId}</span>
          </div>

          {/* Password field */}
          <div className="mb-6 relative">
            <label className="sr-only">Password</label>
            <input
              type={showPass ? "text" : "password"}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPass(v => !v)}
              aria-label={showPass ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPass ? (
                // Open eye icon when password is visible
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                // Closed eye (eye with slash) when password is hidden
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18" />
                </svg>
              )}
            </button>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded"
          >
            Login
          </button>
        </form>

        {/* Forgot link */}
        <div className="text-center mt-4">
          <button type="button" className="text-sm text-gray-500 hover:text-gray-700">
            Forgot user ID or password?
          </button>
        </div>
      </div>
    </div>
  );
}
