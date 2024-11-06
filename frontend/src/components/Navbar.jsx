import { Link, useNavigate } from 'react-router-dom'


function Navbar() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const handleClick = () => {
        localStorage.removeItem('token')
        navigate('/signin')
        window.location.reload()
    }
    return (
        <div className=''>
            <div className="navbar bg-zinc-300 shadow-md shadow-zinc-400 ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">

                            <li> <Link to='/courses'>Courses</Link></li>
                            <li><Link to='/advising'>Advising</Link></li>
                        </ul>
                    </div>
                    <Link to={'/'} className="btn btn-ghost text-xl">Course Management</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    {token && (
                        <ul className="menu menu-horizontal px-1">
                            <li> <Link to='/courses'>Courses</Link></li>
                            <li><Link to='/advising'>Advising</Link></li>
                        </ul>
                    )}

                </div>
                <div className="navbar-end">
                    {token && (
                        <a className="btn hover:bg-zinc-400" onClick={handleClick}>SignOut</a>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Navbar
