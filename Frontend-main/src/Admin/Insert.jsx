import React, { useState } from "react";
import axios from "axios";

export const Insert = () => {
    const [formData, setFormData] = useState({
        name: "", 
        breed: "",
        gender: "male", 
        description: "",
        petType: "dog", 
        image: null,
      });
    
      const [error, setError] = useState("");
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevFormData) => ({ ...prevFormData, image: file }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (
          !formData.name ||
          !formData.age ||
          !formData.breed ||
          !formData.gender ||
          !formData.petType ||
          !formData.image
        ) {
          setError("All fields are required.");
          return;
        }
    
        setError("");
    
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("age", formData.age); 
        formDataToSend.append("breed", formData.breed);
        formDataToSend.append("gender", formData.gender); 
        formDataToSend.append("description", formData.description);
        formDataToSend.append("petType", formData.petType); 
        formDataToSend.append("image", formData.image);
    
        try {
          const response = await axios.post("http://localhost:8081/add-pet", formDataToSend, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          alert("Pet added successfully!");
          console.log(response.data);
        } catch (err) {
          console.error("Error adding pet:", err);
        }
      };
  return (
         <>
         <div className="max-w-screen-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Add a Pet</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="age">
            Age:
          </label>
          <select
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="puppy">Puppy</option>
            <option value="adult">Adult</option>
            <option value="senior">Senior</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="breed">
            Breed:
          </label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={formData.breed}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="gender">
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="description">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="petType">
            Pet Type:
          </label>
          <select
            id="petType"
            name="petType"
            value={formData.petType}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="image">
            Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Add Pet
        </button>
      </form>
    </div>
         
         
         
         </>
  )
}
