import { Link, useNavigate } from "react-router-dom";
import { MdPets } from "react-icons/md";
import { useState } from "react";
import { Validity } from "./LoginValidity";
import axios from "axios";

export const LoginForm = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false);
  const Navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = Validity(user);
    setError(validationErrors);

    if (!validationErrors.email && !validationErrors.password) {
      axios
        .post("http://localhost:8081/loginform", user)
        .then((res) => {
          if (res.data.status === "ok") {
            setLoginSuccess(true);
            localStorage.setItem("email", user.email);
            localStorage.setItem("loggedin", true);
            localStorage.setItem("userid", user.id);


            setTimeout(() => {
              setLoginSuccess(false);
              Navigate("/home");
            }, 5000);
          } else if (res.data === "failure") {
            setError({ form: "Invalid email or password. Please try again." });
          }
        })
        .catch((err) => {
          console.error("Error occurred while logging in: ", err);
          setError({ form: "An error occurred. Please try again later." });
        });
    }
  };

  return (


      <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row w-full h-full max-w-none bg-white rounded-none shadow-none">
        {/* Success Message */}
        {loginSuccess && (
          <div className="absolute top-0 left-0 w-full bg-green-200 text-green-800 p-4 text-center rounded-t-md">
            Login successful! Redirecting to the home page...
          </div>
        )}

        {/* Left Section */}

        <div className="flex-1 flex justify-center items-center bg-white">
          <img
            className="w-full h-full object-cover"
            src="images/Login.png"
            alt="Dog"
          />
        </div>

        {/* Right Section */}
        <div className="flex-1 flex justify-center items-center bg-yellow-200 p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
            <div className="mb-6 flex justify-center">
              <img
                src="images/Logo.png"
                alt="Logo"
                className="w-24 h-24 rounded-full border-4 border-gray-300"
              />
              
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="mb-5">
                <input
                 className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  type="email"
                  placeholder="Email"
                  onChange={handleInput}
                  name="email"
                  value={user.email}
                  required
                />
                {error.email && (
                  <span className="text-sm text-red-500">{error.email}</span>
                )}
              </div>
              <div className="mb-5">
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  type="password"
                  placeholder="Password"
                  onChange={handleInput}
                  name="password"
                  value={user.password}
                  required
                />
                {error.password && (
                  <span className="text-sm text-red-500">{error.password}</span>
                )}
              </div>
              {error.form && (
                <div className="text-sm text-red-500 mb-4">{error.form}</div>
              )}
              <button
                 className="w-full bg-yellow-200
             text-white py-3 rounded hover:bg-yellow-500 transition duration-300"
            
                type="submit"
              >
                Login
              </button>
            </form>
            <p className="mt-5 text-center text-gray-700">
              Don't have an account?{" "}
              <Link
                className="text-yellow-500 hover:text-yellow-600 underline"
                to="/register"
              >
                Register
            </Link>
         </p>
       </div>
      </div>
    </div>
  </div>

  );
};
