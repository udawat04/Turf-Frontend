import React from "react";

const SportsDetail = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-white p-8 font-sans">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <img
          src="https://groundbox.in/assets/images/cate-img/cricket-man.png"
          alt="Cricket Player"
          className="w-full md:w-1/2 h-auto"
        />
        <div className="md:ml-8 mt-8 md:mt-0">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Cricket</h1>
          <p className="text-gray-700 text-lg mb-4 max-w-xl">
            Cricket is a bat-and-ball sport played between two teams of 11 players. 
            It involves batting, bowling, and fielding, with the goal of scoring more 
            runs than the opponent. Formats include Test, One-Day, and T20 cricket. 
            The game is popular worldwide, especially in countries like India, 
            Australia, and England.
          </p>
          <ul className="text-gray-700 text-lg list-none space-y-2">
            <li>🏏 Cricket originated in England and dates back to the 16th century.</li>
            <li>🏏 The three main formats are Test (5 days), One-Day (50 overs), and T20 (20 overs).</li>
            <li>🏏 The Cricket World Cup and T20 World Cup are the biggest international tournaments.</li>
            <li>🏏 Legends include Sachin Tendulkar, Virat Kohli, MS Dhoni, Don Bradman, and Jacques Kallis.</li>
          </ul>
        </div>
      </div>
      <div className="mt-16 border-t pt-8 flex justify-center text-xl text-gray-800 space-x-8">
        <span className="tracking-wide">★ BADMINTON</span>
        <span className="tracking-wide">★ VOLLEYBALL</span>
        <span className="tracking-wide">★ TENNIS</span>
        <span className="tracking-wide">★ HOCKEY</span>
      </div>
    </div>
  );
};

export default SportsDetail;