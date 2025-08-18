import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Teacher() {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseDetail, setCourseDetail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseName || !courseCode || !courseDetail) {
      toast.error('All fields are required!');
      return;
    }

    try {
      const response = await axios.post('https://course-taking-9iv6.onrender.com/api/add-course', {
        courseName,
        courseCode,
        courseDetail,
      });

      if (response.data.success) {
        toast.success('Course added successfully!');
        setCourseName('');
        setCourseCode('');
        setCourseDetail('');
      } else {
        toast.error('Failed to add course');
      }
    } catch (error) {
      console.error('Error adding course:', error);
      toast.error('Error adding course');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 py-6">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Add Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Course Name</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Enter course name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Course Code</label>
            <input
              type="text"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Enter course code"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Course Detail</label>
            <textarea
              value={courseDetail}
              onChange={(e) => setCourseDetail(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Enter course details"
              rows="4"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 transition duration-200"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Teacher;
