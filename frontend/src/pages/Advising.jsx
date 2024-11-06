import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
function Advising() {

    const [courses, setCourses] = useState([])
    const [selectedCourse, setSelectedCourse] = useState('')
    const [courseToDelete, setCourseToDelete] = useState('')
    const [currentCourse, setCurrentCourse] = useState([])


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
            toast.error('Error Fetching Current Course')
        }
    }


    useEffect(() => {
        const token = localStorage.getItem('token');
        (async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/courses', {
                    headers: {
                        Authorization: token
                    }
                })
                console.log(response.data);
                setCourses(response.data)
            } catch (error) {
                toast.error('Error Getting Courses')
            }
        })()
    }, [])




    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token');

        if (!selectedCourse) {
            toast.error('Please select a course');
            return;
        }

        try {

            const response = await axios.post('http://localhost:3000/api/submit-course', { selectedCourse }, {
                headers: {
                    Authorization: token
                }
            });

            if (response.data.success) {
                toast.success('Course submitted successfully');
                fetchCurrentCourse()
            } else {
                toast.error('Failed to submit course');
            }
        } catch (error) {
            console.error('Error submitting course:', error);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            }
        }
    }


    const handleDelete = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token');

        if (!courseToDelete) {
            toast.error('Please select a course');
            return;
        }

        try {
            const response = await axios.delete('http://localhost:3000/api/drop-course', {
                headers: {
                    Authorization: token
                },
                data: { selectedCourse: courseToDelete }
            })
            if (response.data.success) {
                toast.success('Dropped Course Successfully')
                fetchCurrentCourse()
            }

        } catch (error) {
            console.log(error);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message)
            }
        }
    }

    useEffect(() => {
        fetchCurrentCourse()
    }, [])

    return (
        <div className='py-32'>
            <div className='flex justify-evenly items-start'>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-3xl font-semibold text-zinc-600'>Select Your Course</h1>
                    <form onSubmit={handleSubmit}>
                        <select className="select select-info w-full max-w-xs mt-4" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                            <option value='' disabled>Pick a Course</option>
                            {courses.map((course) => (
                                <option key={course.ccode} value={course.ccode}>{course.ccode} - {course.cname}</option>
                            ))}
                        </select>
                        <div className='flex justify-center'>
                            <button type="submit" className="btn btn-primary mt-4">
                                Submit
                            </button>
                        </div>
                    </form>

                    
                    <div className='mt-4'>
                        <h1 className='text-3xl font-semibold text-zinc-600'>Drop Your Course</h1>
                        <form onSubmit={handleDelete}>
                            <select
                                className="select select-error w-full max-w-xs mt-4"
                                value={courseToDelete}
                                onChange={(e) => setCourseToDelete(e.target.value)}
                            >
                                <option value='' disabled>Pick a Course to Drop</option>
                                {courses.map((course) => (
                                    <option key={course.ccode} value={course.ccode}>
                                        {course.ccode} - {course.cname}
                                    </option>
                                ))}
                            </select>
                            <div className='flex justify-center'>
                                <button type="submit" className="btn btn-error mt-4">
                                    Drop
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className='flex flex-col items-center'>
                    <div className='px-4 py-4 border-2 w-full max-w-xl'>
                        <h1 className='text-2xl font-semibold text-zinc-600'>Current Course</h1>
                        {currentCourse.length === 0 && (
                            <div className='text-center'>
                                <h1 className='text-zinc-400'>You have no course</h1>
                            </div>
                        )}
                        <div className='text-center'>
                            {currentCourse.map((course) => (
                                <h1 key={course.ccode}>{course.ccode}</h1>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Advising
