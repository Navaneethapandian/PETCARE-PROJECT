import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "./Navbar";

export const Adopters = () => {
  const [adopters, setAdopters] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/adopters")
      .then((response) => {
        setAdopters(response.data);
      })
      .catch((error) => {
        console.error("Error fetching adopters data:", error);
      });
  }, []);

  return (
   <>
    <Navbar />
    <div className="w-full max-w-screen-lg mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-6">Adopters List</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
            </tr>
          </thead>
          <tbody>
            {adopters.length > 0 ? (
              adopters.map((adopter) => (
                <tr key={adopter.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{adopter.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{adopter.firstname}</td>
                  <td className="border border-gray-300 px-4 py-2">{adopter.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{adopter.phone}</td>
                  <td className="border border-gray-300 px-4 py-2">{adopter.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No adopters found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
   </>
  );
};
