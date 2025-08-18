import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const EditProfile = ({ student, closeModal }) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: student.name,
        id: student.id,
        phone: student.phone,
        oldid: student.id
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            formData.id = Number(formData.id)
            await axios.post(
                'https://course-taking-9iv6.onrender.com/api/profile/update',
                formData,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            console.log('Profile updated successfully');
            navigate('/signin')
            localStorage.removeItem('token')


        } catch (err) {
            console.error('Error updating profile:', err);
            setError('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg w-96 p-8">
                <h2 className="text-xl font-bold mb-6 text-center">Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-600">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-600">Student ID</label>
                        <input
                            type="text"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-600">Contact Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={closeModal} 
                            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;

