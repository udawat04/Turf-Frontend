import React from "react";

const PopularPage = () => {
  const pages = [
    "Box Cricket Grounds In Jaipur",
    "Cricket Grounds In Jaipur",
    "Cricket Grounds For Rent In Jaipur",
    "Online Cricket Grounds Booking In Jaipur",
  ];

  return (
    <section className="bg-white py-12 px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
        Popular Pages
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        {pages.map((page, index) => (
          <button
            key={index}
            className="border border-orange-400 text-orange-600 px-4 py-2 rounded-md hover:bg-orange-100 transition duration-200"
          >
            {page}
          </button>
        ))}
      </div>
    </section>
  );
};

export default PopularPage;
