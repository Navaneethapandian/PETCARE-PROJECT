import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar } from './Navbar';

export const Unadopted = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:8081/petsfree')
      .then((response) => {
        setPets(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching pets:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <>
    <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-5">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          All Available Pets
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
             
              <img
                src={pet.image ? `http://localhost:8081/uploads/${pet.image}` : '/default-image.jpg'} // Ensure image path is correct
                alt={pet.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">{pet.name}</h2>
                <p className="text-gray-600">{pet.breed} | {pet.age} years old</p>
                <p className="text-gray-600 mt-2">{pet.description}</p>
                <p className="mt-4 font-bold text-blue-500">{pet.status}</p>
                <p className="text-gray-700">{pet.pet_type}</p>
                <p className="mt-2 text-gray-500">Gender: {pet.gender}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
