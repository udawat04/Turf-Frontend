import React from "react";
import Navbar from "../Components/Navbar";
import { Users, Trophy, Heart, Target } from "lucide-react";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-white to-green-50 min-h-screen pt-24 pb-16 px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-green-700">
              About <span className="text-orange-500">GroundBox</span>
            </h1>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
              Your trusted partner for finding and booking the best sports turfs
              near you. We make it easier than ever to play, practice, and enjoy
              your favorite sport!
            </p>
          </div>

          {/* Image */}
          <div className="rounded-3xl overflow-hidden shadow-lg mb-16">
            <img
              src="https://gamebullz.com/blog/wp-content/uploads/2023/11/The-Turf-Arena-Box-cricket-and-Football-1.jpeg"
              alt="Turf"
              className="w-full h-64 md:h-[28rem] object-fill"
            />
          </div>

          {/* Mission / Vision */}
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-green-100">
              <h2 className="text-2xl font-bold text-green-700 mb-3 flex items-center gap-2">
                <Target className="text-orange-500" /> Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To connect players with the best turfs, making sports accessible
                and enjoyable for everyone. We aim to foster an active lifestyle
                and a strong community through simplified booking and quality
                facilities.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-green-100">
              <h2 className="text-2xl font-bold text-green-700 mb-3 flex items-center gap-2">
                <Heart className="text-orange-500" /> Our Vision
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To be India’s most loved sports booking platform by delivering
                convenience, transparency, and a delightful experience for
                players, organizers, and turf owners.
              </p>
            </div>
          </div>

          {/* Stats / Achievements */}
          <div className="bg-gradient-to-r from-green-500 to-orange-400 text-white p-10 rounded-3xl shadow-xl mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <Users className="mx-auto mb-2" size={40} />
                <h3 className="text-3xl font-bold">10K+</h3>
                <p className="text-sm">Happy Players</p>
              </div>
              <div>
                <Trophy className="mx-auto mb-2" size={40} />
                <h3 className="text-3xl font-bold">500+</h3>
                <p className="text-sm">Turfs Listed</p>
              </div>
              <div>
                <Heart className="mx-auto mb-2" size={40} />
                <h3 className="text-3xl font-bold">99%</h3>
                <p className="text-sm">Positive Feedback</p>
              </div>
              <div>
                <Target className="mx-auto mb-2" size={40} />
                <h3 className="text-3xl font-bold">50+</h3>
                <p className="text-sm">Cities Covered</p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-green-700 mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              We are a passionate team of sports enthusiasts, developers, and
              designers working together to bring the best booking experience to
              you.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { name: "Rahul Mehta", role: "Founder & CEO" },
              { name: "Sneha Sharma", role: "Product Designer" },
              { name: "Amit Verma", role: "Tech Lead" },
            ].map((member) => (
              <div
                key={member.name}
                className="bg-white p-6 rounded-2xl shadow-lg border hover:shadow-xl transition"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${member.name}&background=random`}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
