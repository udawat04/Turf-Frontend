import React, { useEffect, useState } from "react";
import axios from "axios";

const AddTurf = () => {
  const [form, setForm] = useState({
    turfName: "",
    location: "",
    city: "",
    price: "",
  });

  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const backendUrl = "https://turf-backend-avi5.onrender.com"; // change to your backend URL

  // 🔄 Fetch cities from API
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get(`${backendUrl}/admin/getcity`);
        setCities(res.data.response || []);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  // 🔧 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 🚀 Submit form data to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      alert("Turf successfully added!");
      const res = await axios.post(`${backendUrl}/admin/addturf`, form);
      setForm({ turfName: "", location: "", city: "", price: "" }); // Reset
    } catch (error) {
      alert("Failed to add turf.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-white to-green-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl px-8 py-10 w-full max-w-xl flex flex-col gap-6 border border-orange-100"
      >
        <h2 className="text-2xl font-bold text-center text-orange-500 mb-2">Add Turf</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="turfName"
            value={form.turfName}
            onChange={handleChange}
            placeholder="Turf Name"
            required
            className="px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 text-lg"
          />
          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            required
            className="px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 text-lg"
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city._id} value={city.city}>
                {city.city}
              </option>
            ))}
          </select>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Turf Location"
            required
            className="px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 text-lg"
          />
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            placeholder="Price per Slot"
            required
            className="px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 text-lg"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white font-semibold py-3 rounded-lg shadow-md transition text-lg mt-2"
        >
          {loading ? "Submitting..." : "Add Turf"}
        </button>
      </form>
    </div>
  );
};

export default AddTurf;
