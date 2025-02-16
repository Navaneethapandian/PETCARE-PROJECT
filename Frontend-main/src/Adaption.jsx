import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router-dom for navigation

export const Adaption = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    pet_id: localStorage.getItem('selectedPetId'),
  });

  const [isSubmitted, setIsSubmitted] = useState(false); // State to toggle success message
  const [isError, setIsError] = useState(false); // State to toggle error message
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    console.log(localStorage.getItem('user_id'))
    console.log(localStorage.getItem('pet_id'))

    axios
      .post('http://localhost:8081/adaption_verify', formData)
      .then((res) => {
        setIsSubmitted(true);
        setTimeout(() => {
          navigate('/adopt');
        }, 5000); // Redirect after 5 seconds
      })
      .catch((err) => {
        setIsError(true);
        setTimeout(() => {
          setIsError(false); // Hide error after animation
          navigate('/register');
        }, 5000); // Redirect after 5 seconds
        console.error(err);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto mt-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Adoption Form for Pets</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="firstName" className="text-sm font-medium text-gray-600 mb-2 block">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="middleName" className="text-sm font-medium text-gray-600 mb-2 block">
                Middle Name
              </label>
              <input
                type="text"
                id="middleName"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="text-sm font-medium text-gray-600 mb-2 block">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-600 mb-2 block">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-600 mb-2 block">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="text-sm font-medium text-gray-600 mb-2 block">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Submit
          </button>
        </form>

        {/* Success Message */}
        <div
          className={`mt-6 p-4 rounded-lg text-white bg-green-500 text-center ${
            isSubmitted ? 'block' : 'hidden'
          }`}
        >
          Your submission has been successful!
        </div>

        {/* Error Message */}
        <div
          className={`mt-6 p-4 rounded-lg text-white bg-red-500 text-center animate-pulse ${
            isError ? 'block' : 'hidden'
          }`}
        >
          No User Found. Redirecting to Registration...
        </div>
      </div>
    </>
  );
};
