import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Account = () => {
  const [User, setUser] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    Adopt_count:'',
  });

  const Navigate=useNavigate()
  
  const [loading, setLoading] = useState(true); 

  
  useEffect(() => {
    const email = localStorage.getItem('email');
    console.log("Stored email:", email);

    axios
      .get("http://localhost:8081/account", {
        headers: {
          "Authorization": `Bearer ${email}`, 
        },
      })
      .then((response) => {
        console.log(response.data[0].id);
        if (response.data) {
          setUser({
            id: response.data[0].id,
            name: response.data[0].name,
            email: response.data[0].email,
            phone: response.data[0].phone,
            Adopt_count:response.data[0].pets,
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
      console.log(User)
  }, []); 

  if (loading) {
    return <div>Loading...</div>; 
  }
  const handleRegister = (e) => {
    e.preventDefault();
     localStorage.removeItem('email');
     localStorage.removeItem('loggedin');
     Navigate('/loginform')

  };

  const handleData = () =>{
    Navigate('/view-adaptions')
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
        <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-6">

          <div className="text-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">User Profile</h1>
            <p className="text-gray-600 mt-2">Welcome back, {User.name}!</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Username:</span>
              <span className="font-semibold text-gray-800">{User.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-semibold text-gray-800">{User.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-semibold text-gray-800">{User.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-semibold text-gray-800">{User.phone}</span>
            </div>
          </div>

{/* //button */}

          <div className="mt-6 text-center">
            <button
            onClick={handleRegister} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
              Logout
            </button>
          </div>

          <div className="mt-6 text-center">
            <button onClick={handleData}
            className="px-8 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
              View Adoptions
            </button>
          </div>

        </div>
      </div>
    </>
  );
};
