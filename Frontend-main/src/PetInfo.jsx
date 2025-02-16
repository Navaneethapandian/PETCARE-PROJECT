import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const PetInfo = () => {
  const [petData, setPetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const petId = localStorage.getItem("selectedPetId");
  const navigate = useNavigate();

  useEffect(() => {
    if (petId) {
      axios
        .post("http://localhost:8081/petinfo", { Id: petId })
        .then((res) => {
          setPetData(res.data.pet);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching pet data:", err);
          setLoading(false);
        });
    }
  }, [petId]);

  const handleRegister = () => {
    const decision = localStorage.getItem("loggedin");
    if (decision) {
      navigate("/adaption_verify");
    } else {
      navigate("/register");
    }
  };

  const getImageUrl = (image) => {
    return image
      ? `data:image/jpeg;base64,${image}`
      : "https://media.giphy.com/media/26gsgZqvF2RYsEjmw/giphy.gif";
  };

  return (
    <div className="container mx-auto p-6">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin border-t-4 border-blue-500 rounded-full h-16 w-16"></div>
        </div>
      ) : (
        petData && (
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left Section: Pet Image */}
            <div className="flex-shrink-0">
              <img
                src={getImageUrl(petData.image)}
                alt={petData.name}
                className="w-full md:w-96 h-auto object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Right Section: Pet Details */}
            <div className="flex-grow">
              {/* Adoption Button */}
              <div className="mb-6">
                <button
                  onClick={handleRegister}
                  className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-lg shadow-md text-lg"
                >
                  Register Adoption
                </button>
              </div>

              {/* Pet Name */}
              <h1 className="text-4xl font-extrabold text-gray-800">{petData.name}</h1>

              {/* Pet Description */}
              <p className="text-lg text-gray-600 mt-4">{petData.description}</p>

              {/* Facts Section */}
              <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Facts</h2>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                  <li><strong>Breed:</strong> {petData.breed}</li>
                  <li><strong>Gender:</strong> {petData.gender}</li>
                  <li><strong>Age:</strong> {petData.age}</li>
                  <li><strong>Vaccinated:</strong> Yes</li>
                  <li><strong>Pet ID:</strong> {petData.id}</li>
                </ul>
              </div>

              {/* Additional Info */}
              <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Additional Info</h2>
                <p className="text-gray-700 text-lg">None</p>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
