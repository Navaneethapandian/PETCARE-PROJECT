import axios from "axios";
import { useState, useEffect } from "react";

export const MyAdoptions = () => {
  const [Email] = useState(localStorage.getItem("email")); // Get email from local storage
  const [adoptions, setAdoptions] = useState(null); // State to store fetched data
  const [error, setError] = useState(null); // State to store errors

  useEffect(() => {
    if (Email) {
      axios
        .post("http://localhost:8081/myadoptions", { Email }) // Send Email as an object
        .then((res) => {
          console.log(res.data);
          if (res.data.length > 0) {
            setAdoptions(res.data); // Store response data
          } else {
            setAdoptions([]); // Set to empty array if no adoptions are found
          }
        })
        .catch((err) => {
          console.error(err);
          setError(err.response?.data?.error || "An error occurred while fetching adoptions.");
        });
    } else {
      setError("Email is not available in local storage.");
    }
  }, [Email]);

  return (
    <>
      <div className="container mx-auto mt-6">
        <h1 className="text-2xl font-bold text-gray-800">My Adoptions</h1>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 mt-4 p-4 bg-red-100 rounded-md">
            <p>{error}</p>
          </div>
        )}

        {/* Adoptions Cards */}
        {adoptions && adoptions.length > 0 && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adoptions.map((adoption, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-md shadow-md">
                {/* Display Pet Image */}
                {adoption.pet_image && (
                  <img
                    src={`data:image/jpeg;base64,${adoption.pet_image}`}
                    alt={`${adoption.name}`}
                    className="w-full  h-48 object-contain rounded-md mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold text-gray-800">{adoption.name}</h3>
                <p><strong>Breed:</strong> {adoption.breed}</p>
                <p><strong>Age:</strong> {adoption.age}</p>
                <p><strong>Gender:</strong> {adoption.gender}</p>
                <p><strong>Adopter Name:</strong> {adoption.first_name}</p>
                <p><strong>Adopter Email:</strong> {adoption.adopter_email}</p>
                <p><strong>Adopter Address:</strong> {adoption.adopter_address}</p>
                <p><strong>Adoption Time:</strong> {new Date(adoption.adoption_time).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}

        {/* No Adoptions Found */}
        {adoptions && adoptions.length === 0 && (
          <div className="mt-4 p-4 bg-blue-100 rounded-md text-blue-600 text-center">
            <p>No adoptions found. Please consider adopting a pet!</p>
          </div>
        )}
      </div>
    </>
  );
};
