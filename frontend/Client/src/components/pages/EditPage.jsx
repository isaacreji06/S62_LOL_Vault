/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Editpage() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    username: storedUser.username,
    email: storedUser.email,
    password: storedUser.password,
    bio: storedUser.bio,
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("bio", formData.bio);
    form.append("profilePicture", profilePicture);

    try {
      const response = await fetch(
        `https://s62-lol-vault.onrender.com/user/update-user/${storedUser._id}`,
        {
          method: "PUT",
          body: form,
        }
      );
      const result = await response.json();
      if (response.ok) {
        alert("Update successful!");
        localStorage.setItem("user", JSON.stringify(result.updatedItem));
        navigate("/profile");
      } else {
        alert("Update failed: " + result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://s62-lol-vault.onrender.com/user/delete-user/${storedUser._id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("Account deleted successfully!");
        localStorage.removeItem("user");
        navigate("/signupPage");
      } else {
        alert("Delete failed: " + result.error);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center h-fit bg-gray-100 py-10 p-6 rounded-lg">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Edit</h2>

        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your Username"
          required
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:ring focus:ring-blue-300"
        />

        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your Email"
          required
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:ring focus:ring-blue-300"
        />

        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your Password"
          required
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:ring focus:ring-blue-300"
        />

        <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
          Profile Picture
        </label>
        <input
          type="file"
          id="profilePicture"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        />

        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
          Bio
        </label>
        <textarea
          id="bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:ring focus:ring-blue-300"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition mb-4"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </button>
      </form>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4 text-center">Confirm Delete</h2>
            <p className="text-gray-600 text-center mb-4">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Editpage;
