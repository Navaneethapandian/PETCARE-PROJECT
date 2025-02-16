import { Link, useNavigate } from "react-router-dom";
import { MdPets } from "react-icons/md";
import { Validity } from './LoginValidity';
import { useState } from "react";
import axios from "axios";

export const Register = () => {
  const [User, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone:"",
  });

  const [Login,setLogin]=useState(
    {
      email:"",
      Phone:"",
    }
  )
  const [Error, setError] = useState({
    email: "",
    password: "",
    name: "",
    phone:"",
  });
  const Navigate = useNavigate();

  const handleInput = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous errors
    setError({
      email: "",
      password: "",
      name: "",
      phone:""
    });

    const validationErrors = Validity(User); // Validating the inputs
    setError(validationErrors);

    if (!validationErrors.email && !validationErrors.password && !validationErrors.name && !validationErrors.phone) {
      console.log("HII");
      axios.post("http://localhost:8081/register", User)
        .then((res) => {
          if(!res.data.sqlMessage)
          {
            Navigate('/loginform');
            console.log(res)
            setLogin({
              email:"",
              phone:""
            })
          }
          else
          {
            console.log(res)
            alert("Email and Phone should be unique")
            setLogin({
              email:"*Email Should be Unique",
              phone:"*Phone Should be Unique"
            })
          }

        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
<div className="flex w-full h-screen bg-gray-100">
  {/* Left Section */}
  <div className="flex-1 flex justify-center items-center bg-yellow-200">
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md text-center">
      <div className="mb-6">
        <img
          src="images/Logo.png"
          alt="Logo"
          className="w-24 h-24 rounded-full border-4 border-gray-300 mx-auto"
        />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Please fill this to Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-start">
          <label
            htmlFor="fullname"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            type="text"
            placeholder="Username"
            name="name"
            value={User.name}
            onChange={handleInput}
            required
          />
          {Error.name && <span className="text-1xl text-sm text-red-500">{Error.name}</span>}
        </div>
        <div className="flex flex-col items-start">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
            type="email"
            placeholder="UserEmail"
            name="email"
            value={User.email}
            onChange={handleInput}
            required
          />
          {<span className="text-1xl text-sm text-red-500">{Login.email}</span>}
        </div>
        <div className="flex flex-col items-start">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
            type="text"
            placeholder="Mobile Number"
            name="phone"
            value={User.phone}
            onChange={handleInput}
            required
          />
          {<span className="text-1xl text-sm text-red-500">{Login.phone}</span>}
        </div>
        <div className="flex flex-col items-start">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
            type="password"
            placeholder="Password"
            name="password"
            value={User.password}
            onChange={handleInput}
            required
          />
          {Error.password && <span className="text-red-500 text-sm block mt-1">{Error.password}</span>}
        </div>
        <button
          className="bg-orange-300 text-white px-5 py-3 mt-5 rounded hover:bg-orange-400 transition-colors cursor-pointer w-full"
          type="submit"
        >
          Register
        </button>
        <p className="mt-5 text-center">
          Already have an account?{" "}
          <Link className="text-orange-400 hover:text-orange-400 underline" to="/loginform">
            Login
          </Link>
        </p>
      </form>
    </div>
  </div>

  {/* Right Section */}
  <div className="flex-1 flex justify-center items-center bg-gray-200">
    <img className="max-w-full h-auto" src="images/Register.jpg" alt="Dog" />
  </div>
</div>




  );
};
