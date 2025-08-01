import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/Card";
import Navbar from "../Components/Navbar";
import { ChevronDown, ChevronUp, X } from "lucide-react";

const sectionStyle =
  "flex items-center justify-between cursor-pointer py-2 px-2 hover:bg-gray-100 rounded transition";

const chipStyle =
  "inline-flex items-center gap-2 bg-red-400 text-white px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2 shadow hover:bg-red-500 transition cursor-pointer";

const FindGround = () => {
  const [turfs, setTurfs] = useState([]);
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [collapse, setCollapse] = useState({
    city: true,
    price: true,
    rating: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch turfs
        const turfsResponse = await axios.get("https://turf-backend-avi5.onrender.com/admin/turf");
        console.log("FindGround Turfs response:", turfsResponse.data);
        setTurfs(turfsResponse.data.result || []);
        
        // Fetch cities
        const citiesResponse = await axios.get("https://turf-backend-avi5.onrender.com/admin/city");
        console.log("FindGround Cities response:", citiesResponse.data);
        setCities(citiesResponse.data.result || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filtering and sorting logic
  let filteredTurfs = turfs.filter((turf) => {
    const matchesCity = selectedCity ? turf.city === selectedCity : true;
    const matchesSearch = searchTerm
      ? turf.turfName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        turf.city?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesRating = selectedRating
      ? (turf.rating || 4.5) >= selectedRating
      : true;
    return matchesCity && matchesSearch && matchesRating;
  });

  if (sortOrder === "asc") {
    filteredTurfs = filteredTurfs.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    filteredTurfs = filteredTurfs.sort((a, b) => b.price - a.price);
  }

  // Active filters for chips
  const activeFilters = [];
  if (selectedCity) activeFilters.push({ label: selectedCity, type: "city" });
  if (sortOrder)
    activeFilters.push({
      label: sortOrder === "asc" ? "Price: Low to High" : "Price: High to Low",
      type: "price",
    });
  if (selectedRating)
    activeFilters.push({
      label: `Rating: ${selectedRating}★+`,
      type: "rating",
    });

  const removeFilter = (type) => {
    if (type === "city") setSelectedCity("");
    if (type === "price") setSortOrder("");
    if (type === "rating") setSelectedRating(0);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gradient-to-br from-white to-green-50">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden md:block"
          } fixed top-16 left-0 h-[calc(100%-4rem)] w-80 bg-white text-black border-r shadow-xl p-0 z-20`}
        >
          <div className="p-6 overflow-y-auto h-full">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-bold text-lg tracking-wide">FILTER</span>
            </div>

            {/* Active Filters */}
            <div className="mb-4">
              <div className="text-gray-700 font-semibold mb-1 flex items-center gap-2">
                Active filters
                <span className="text-xs font-normal">
                  {filteredTurfs.length} result
                  {filteredTurfs.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {activeFilters.length === 0 && (
                  <span className="text-xs text-gray-500">
                    No filters applied
                  </span>
                )}
                {activeFilters.map((f, i) => (
                  <span
                    key={i}
                    className={chipStyle}
                    onClick={() => removeFilter(f.type)}
                  >
                    {f.label} <X size={14} />
                  </span>
                ))}
              </div>
            </div>

            <hr className="border-gray-200 my-4" />

            {/* City Filter */}
            <div className="mb-2">
              <div
                className={sectionStyle}
                onClick={() => setCollapse((c) => ({ ...c, city: !c.city }))}
              >
                <span className="font-semibold tracking-wide">CITY</span>
                {collapse.city ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </div>
              {collapse.city && (
                <ul className="pl-2 mt-2 space-y-1 max-h-40 overflow-y-auto pr-2">
                  <li>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-lg transition font-medium ${
                        selectedCity === ""
                          ? "bg-blue-500 text-white font-bold"
                          : "hover:bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => setSelectedCity("")}
                    >
                      All Cities
                    </button>
                  </li>
                  {cities.map((city) => (
                    <li key={city._id}>
                      <button
                        className={`w-full text-left px-3 py-2 rounded-lg transition font-medium ${
                          selectedCity === city.city
                            ? "bg-blue-500 text-white font-bold"
                            : "hover:bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setSelectedCity(city.city)}
                      >
                        {city.city}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <hr className="border-gray-200 my-4" />

            {/* Price Sort */}
            <div className="mb-2">
              <div
                className={sectionStyle}
                onClick={() => setCollapse((c) => ({ ...c, price: !c.price }))}
              >
                <span className="font-semibold tracking-wide">PRICE</span>
                {collapse.price ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </div>
              {collapse.price && (
                <div className="flex gap-2 mt-2">
                  <button
                    className={`flex-1 px-3 py-2 rounded-full font-medium border-2 transition text-xs ${
                      sortOrder === "asc"
                        ? "bg-blue-500 text-white border-blue-500 font-bold"
                        : "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setSortOrder("asc")}
                  >
                    Low to High
                  </button>
                  <button
                    className={`flex-1 px-3 py-2 rounded-full font-medium border-2 transition text-xs ${
                      sortOrder === "desc"
                        ? "bg-blue-500 text-white border-blue-500 font-bold"
                        : "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setSortOrder("desc")}
                  >
                    High to Low
                  </button>
                </div>
              )}
            </div>

            <hr className="border-gray-200 my-4" />

            {/* Rating Filter */}
            <div className="mb-2">
              <div
                className={sectionStyle}
                onClick={() =>
                  setCollapse((c) => ({ ...c, rating: !c.rating }))
                }
              >
                <span className="font-semibold tracking-wide">RATING</span>
                {collapse.rating ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </div>
              {collapse.rating && (
                <div className="flex gap-2 flex-wrap mt-2">
                  {[0, 3, 4, 4.5, 5].map((r) => (
                    <button
                      key={r}
                      className={`px-3 py-2 rounded-full font-medium border-2 transition flex items-center gap-1 text-xs ${
                        selectedRating === r
                          ? "bg-blue-500 text-white border-blue-500 font-bold"
                          : "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => setSelectedRating(r)}
                    >
                      {r === 0 ? "All" : `${r}★`}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 mt-20 md:mt-16 md:ml-80">
          {/* Search Bar & Sidebar Toggle */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h2 className="text-3xl font-bold text-gray-800">
              Available Grounds
            </h2>
            <div className="flex gap-2 items-center w-full md:w-auto">
              <button
                className="md:hidden px-3 py-2 rounded-lg bg-blue-100 text-blue-700 font-semibold shadow hover:bg-blue-200"
                onClick={() => setSidebarOpen(true)}
              >
                ☰ Filters
              </button>
              <input
                type="text"
                placeholder="Search by turf or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-80 px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-white shadow"
              />
            </div>
          </div>

          {/* Turf Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredTurfs.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 text-lg py-10">
                No turfs found.
              </div>
            ) : (
              filteredTurfs.map((turf, index) => (
                <Card
                  key={turf._id || index}
                  turfId={turf._id}
                  turfName={turf.turfName}
                  location={turf.location}
                  city={turf.city}
                  price={turf.price}
                  image={turf.image}
                  rating={turf.rating || 4.5}
                  reviews={turf.reviews || 15}
                />
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default FindGround;
