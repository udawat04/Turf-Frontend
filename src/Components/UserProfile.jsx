import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const UserProfile = () => {
    const [userData,setUser] = useState(null)
    const fetchUser = async()=>{
        try {
            const response = await fetch(
              "https://turf-backend-avi5.onrender.com/userget"
            );
            const data = await response.json()
            setUser(data.data)
            console.log(data);
        }
        catch(error){
            console.log(error)
        }
    }
    console.log(userData,"::::");
    useEffect(()=>{
        fetchUser()
    },[])
//   const user = {
//     name: "Shailendra Kumawat",
//     email: "shailendra@example.com",
//     bio: "Full Stack Developer | Passionate about building scalable web apps.",
//     location: "Udaipur, India",
//     phone: "+91-9876543210",
//     age: 24,
//     profilePic: "https://randomuser.me/api/portraits/men/75.jpg",
//   };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10">
        {userData &&
          userData.map((user) => (
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Profile Picture */}
              <img
                src={`http://localhost:5000${user.profilePic}`}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
              />

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {user.firstName}
                  </h2>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-sm">
                    Edit Profile
                  </button>
                </div>

                <p className="text-gray-600 mt-2">{user.bio}</p>

                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <div>
                    <strong>Email:</strong> {user.email}
                  </div>
                  <div>
                    <strong>Phone:</strong> {user.phone}
                  </div>
                  <div>
                    <strong>Location:</strong> {user.city}
                  </div>
                  <div>
                    <strong>Age:</strong> {user.age}
                  </div>
                </div>
              </div>
            </div>
          ))}
        {/* Additional Info or Tabs */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Activity</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-indigo-100 rounded-lg">
              <p className="text-sm text-indigo-700">Last Login:</p>
              <p className="font-medium text-indigo-900">June 2, 2025</p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg">
              <p className="text-sm text-green-700">Status:</p>
              <p className="font-medium text-green-900">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
