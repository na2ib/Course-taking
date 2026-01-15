import { useEffect, useState } from "react";
import axios from "axios";
import dummy from "../assets/dummy.png";
import EditProfile from "./EditProfile";

function Home() {
    const [student, setStudent] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    const token = localStorage.getItem("token");
    const fetchStudents = async () => {
        try {
            const response = await axios.get(
                `https://course-taking-9iv6.onrender.com/api/profile`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            console.log(response.data);
            setStudent(response.data.user);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className="px-10 py-32">
            <div className="text-center mb-10">
                <h1 className="text-2xl text-zinc-600 font-bold">
                    Welcome To Your Profile
                </h1>
            </div>

            <div className="flex justify-center items-center">
                <div className="card bg-zinc-100 w-2/3 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img
                            src={dummy}
                            alt="Profile"
                            className="rounded-xl h-24 w-24"
                        />
                    </figure>
                    <div className="flex flex-col items-center text-center py-4">
                        <h2 className="card-title">{student.name}</h2>
                        <h1 className="text-lg font-light text-zinc-500">
                            {student.email}
                        </h1>

                        <div className="mt-14">
                            <div className="flex gap-10">
                                <h1>Student ID: {student.id}</h1>
                                <h1>Department: {student.department}</h1>
                                <h1>Contact: {student.phone}</h1>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end m-4">
                        <button
                            className="btn btn-primary"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {isEditing && (
                <EditProfile
                    student={student}
                    closeModal={() => setIsEditing(false)}
                />
            )}
        </div>
    );
}

export default Home;
