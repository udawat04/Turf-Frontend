import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const backendurl = "https://turf-backend-avi5.onrender.com";

const AdminManagement = () => {
  const [cities, setCities] = useState([]);
  const [turfs, setTurfs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("cities");
  const [editingItem, setEditingItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [citiesResponse, turfsResponse] = await Promise.all([
        axios.get(`${backendurl}/admin/city`),
        axios.get(`${backendurl}/admin/turf`)
      ]);
      
      console.log("Cities response:", citiesResponse.data.cities);
      console.log("Turfs response:", turfsResponse.data.turfs);
      
      setCities(citiesResponse.data.cities || []);
      setTurfs(turfsResponse.data.turfs || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (item, type) => {
    setEditingItem({ ...item, type });
    setImagePreview(item.image || null);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      
      if (editingItem.type === "city") {
        formData.append("city", editingItem.city);
      } else {
        formData.append("turfName", editingItem.turfName);
        formData.append("city", editingItem.city);
        formData.append("location", editingItem.location);
        formData.append("price", editingItem.price);
      }
      
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await axios.put(
        `${backendurl}/admin/${editingItem.type}/${editingItem._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(`${editingItem.type === "city" ? "City" : "Turf"} updated successfully!`);
      fetchData();
      handleCancelEdit();
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to update");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${backendurl}/admin/${type}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success(`${type === "city" ? "City" : "Turf"} deleted successfully!`);
        fetchData();
      } catch (error) {
        toast.error(error.response?.data?.msg || "Failed to delete");
      }
    }
  };

  const handleInputChange = (e) => {
    setEditingItem({
      ...editingItem,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-green-300 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold text-center">Admin Management</h1>
          </div>

          <div className="p-6">
            {/* Tabs */}
            <div className="flex mb-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("cities")}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === "cities"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Cities ({cities.length})
              </button>
              <button
                onClick={() => setActiveTab("turfs")}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === "turfs"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Turfs ({turfs.length})
              </button>
            </div>

            {/* Cities Tab */}
            {activeTab === "cities" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cities.length === 0 ? (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    No cities found
                  </div>
                ) : (
                  cities.map((city) => (
                    <div key={city._id} className="bg-white border rounded-lg shadow-md overflow-hidden">
                      <img
                        src={city.image || "https://via.placeholder.com/300x200?text=City"}
                        alt={city.city}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{city.city}</h3>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(city, "city")}
                            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(city._id, "city")}
                            className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Turfs Tab */}
            {activeTab === "turfs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {turfs.length === 0 ? (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    No turfs found
                  </div>
                ) : (
                  turfs.map((turf) => (
                    <div key={turf._id} className="bg-white border rounded-lg shadow-md overflow-hidden">
                      <img
                        src={turf.image || "https://via.placeholder.com/300x200?text=Turf"}
                        alt={turf.turfName}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{turf.turfName}</h3>
                        <p className="text-gray-600 mb-1">City: {turf.city}</p>
                        <p className="text-gray-600 mb-1">Location: {turf.location}</p>
                        <p className="text-gray-600 mb-3">Price: ₹{turf.price}/hour</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(turf, "turf")}
                            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(turf._id, "turf")}
                            className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Edit Modal */}
        {editingItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Edit {editingItem.type === "city" ? "City" : "Turf"}
                </h2>

                <form onSubmit={handleUpdate} className="space-y-4">
                  {editingItem.type === "city" ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City Name
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={editingItem.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Turf Name
                        </label>
                        <input
                          type="text"
                          name="turfName"
                          value={editingItem.turfName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={editingItem.city}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={editingItem.location}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price
                        </label>
                        <input
                          type="number"
                          name="price"
                          value={editingItem.price}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image (Optional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {imagePreview && (
                      <div className="mt-2">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-md border"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors disabled:bg-gray-400"
                    >
                      {isLoading ? "Updating..." : "Update"}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManagement; 