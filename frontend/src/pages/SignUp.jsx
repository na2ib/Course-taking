import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";

const signUpSchema = z.object({
    name: z.string().min(1, "Name is required"),
    student_id: z
        .string()
        .min(8, "Student ID is required and must be 8 digits"),
    department: z.string().min(2, "Department is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    phoneNumber: z
        .string()
        .regex(/^[0-9]{11}$/, "Phone number must be 11 digits"),
});

function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data) => {
        try {
            data.student_id = Number(data.student_id);
            console.log("FORM DATA: ", data);
            const response = await axios.post(
                `https://course-taking-9iv6.onrender.com/api/signup`,
                data
            );

            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(
                    error.response.data.message || "Unexpected error occurred."
                );
            } else {
                toast.error("Unexpected error occurred.");
            }
        }
    };

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Signup now!</h1>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form
                            className="card-body"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="input input-bordered"
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        Student ID
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Student ID"
                                    className="input input-bordered"
                                    {...register("student_id")}
                                />
                                {errors.student_id && (
                                    <p className="text-red-500 text-sm">
                                        {errors.student_id.message}
                                    </p>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        Department
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Department"
                                    className="input input-bordered"
                                    {...register("department")}
                                />
                                {errors.department && (
                                    <p className="text-red-500 text-sm">
                                        {errors.department.message}
                                    </p>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="input input-bordered"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="input input-bordered"
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        Phone Number
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Phone Number"
                                    className="input input-bordered"
                                    {...register("phoneNumber")}
                                />
                                {errors.phoneNumber && (
                                    <p className="text-red-500 text-sm">
                                        {errors.phoneNumber.message}
                                    </p>
                                )}
                            </div>

                            <div className="form-control mt-6">
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                >
                                    SignUp
                                </button>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <Link
                                        to={`/signin`}
                                        className="label-text-alt link link-hover"
                                    >
                                        Already have an account?
                                    </Link>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
