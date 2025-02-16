import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaDog, FaCat, FaGenderless, FaPaw } from "react-icons/fa";

export const Adopt = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [filters, setFilters] = useState({
    petType: "all",
    breed: "all",
    gender: "all",
    age: "all",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const value = "0";
    axios
      .get(`http://localhost:8081/adopt?status=${value}`)
      .then((res) => {
        setPets(res.data);
        setFilteredPets(res.data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters({ ...filters, [id]: value });
  };

  const applyFilters = () => {
    const { petType, breed, gender, age } = filters;
    const filtered = pets.filter((pet) => {
      return (
        (petType === "all" || pet.pet_type.toLowerCase() === petType.toLowerCase()) &&
        (breed === "all" || pet.breed.toLowerCase().includes(breed.toLowerCase())) &&
        (gender === "all" || pet.gender.toLowerCase() === gender.toLowerCase()) &&
        (age === "all" || pet.age.toLowerCase() === age.toLowerCase())
      );
    });
    setFilteredPets(filtered);
  };

  const handleInfoClick = (petId) => {
    localStorage.setItem("selectedPetId", petId);
    navigate("/petinfo");
  };

  return (
    <div className="max-w-screen-lg mx-auto p-5 font-sans">
      <h1 className="text-3xl font-bold text-center mb-6">Find Your New Best Friend</h1>

      <div className="flex flex-wrap justify-between gap-4 mb-6">
        <div className="w-full sm:w-1/2 md:w-1/4">
          <label htmlFor="petType" className="block mb-2 text-sm font-medium flex items-center">
            <FaDog className="mr-2 text-blue-600" /> Pet Type:
          </label>
          <select
            id="petType"
            className="w-full p-2 border rounded"
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/4">
          <label htmlFor="breed" className="block mb-2 text-sm font-medium flex items-center">
            <FaPaw className="mr-2 text-blue-600" /> Breed:
          </label>
          <select
            id="breed"
            className="w-full p-2 border rounded"
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="golden-retriever">Golden Retriever</option>
            <option value="labrador">Labrador</option>
            <option value="dachshund">Dachshund</option>
            <option value="siamese">Siamese</option>
            <option value="persian">Persian</option>
          </select>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/4">
          <label htmlFor="gender" className="block mb-2 text-sm font-medium flex items-center">
            <FaGenderless className="mr-2 text-blue-600" /> Gender:
          </label>
          <select
            id="gender"
            className="w-full p-2 border rounded"
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/4">
          <label htmlFor="age" className="block mb-2 text-sm font-medium flex items-center">
            <FaPaw className="mr-2 text-blue-600" /> Age:
          </label>
          <select
            id="age"
            className="w-full p-2 border rounded"
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="puppy">Puppy</option>
            <option value="adult">Adult</option>
            <option value="senior">Senior</option>
          </select>
        </div>

        <button
          onClick={applyFilters}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPets.map((pet) => (
          <div
            key={pet.id}
            className="text-center bg-white border rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={`data:image/jpeg;base64,${pet.image}`}
              alt={pet.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{pet.name}</h2>
              <p className="text-sm text-gray-500 capitalize">{pet.breed}</p>
              <button
                onClick={() => handleInfoClick(pet.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 mx-auto"
              >
                Info
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
