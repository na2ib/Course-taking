import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

function Courses() {
    const [currentCourse, setCurrentCourse] = useState([])
    const [courseDetail, setCourseDetail] = useState(null)
    const courseCode = currentCourse.map((course) => (course.ccode))[0]
    console.log(courseCode);

    const fetchCurrentCourse = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:3000/api/current-course', {
                headers: {
                    Authorization: token
                }
            })
            setCurrentCourse(response.data)
        } catch (error) {
            console.log(error);
            toast.error('Error Fetching Current Course')
        }
    }

    const getCourseDetails = async () => {
        try {
            if (courseCode) {
                const response = await axios.post('http://localhost:3000/api/current-course-details', { courseCode })
                setCourseDetail(response.data);
                console.log('details', response.data);

            }


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCurrentCourse()
    }, [])

    useEffect(() => {
        if (courseCode) {
            getCourseDetails();
        }
    }, [courseCode]);



    console.log('current', currentCourse);
    console.log('Details', courseDetail);

    if (currentCourse.length === 0) {
        return (
            <div className="py-32">
                <div className="text-center text-3xl font-semibold text-zinc-400">
                    <h1>Your Course Is Empty</h1>
                </div>
            </div>
        )
    }


    return (
        <div className="py-32">
            <div className="overflow-x-auto bg-zinc-200">


                <table className="table w-full">

                    <thead>
                        <tr>
                            <th className="text-center w-1/4">Name</th>
                            <th className="text-center w-1/4">Code</th>
                            <th className="text-center w-1/2">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {courseDetail && (
                            <tr>
                                <td className="text-center">{courseDetail.cname}</td>
                                <td className="text-center">{courseDetail.ccode}</td>
                                <td className="text-center truncate">{courseDetail.cdetails}</td>
                            </tr>
                        )}


                    </tbody>
                </table>
            </div>
        </div>


    )
}

export default Courses
