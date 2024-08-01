import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { BiBookAdd } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { FormEvent, useEffect, useState } from "react";
import { FaBookReader } from "react-icons/fa";
import classNames from "classnames";
import {jwtDecode} from "jwt-decode"; 
import { useScrollTop } from "../hooks/use-scroll-top";
import { HiUserGroup } from "react-icons/hi";
import { MdPersonAddAlt1 } from "react-icons/md";
import logo2 from '../assets/logo2.png'

const Navbar = () => {
    const scrolled = useScrollTop();
    const [isAdmin, setIsAdmin] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            const checkAdminStatus = async () => {
                const adminStatus = await isAdminUser(token);
                setIsAdmin(adminStatus);
            };
            checkAdminStatus();
        }
    }, [token]);

    const handleLogout = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await axios.get(`${BACKEND_URL}/api/v1/auth/logout`);
            localStorage.removeItem("token");
            navigate("/");
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return (
        <nav className={classNames(
            "fixed top-0 mx-auto flex w-full max-w-8xl justify-between px-4 py-4 text-sm bg-sky-200 bg-opacity-90 mb-20",
            scrolled && "shadow-sm shadow-slate-400"
        )}>
                <img src={logo2} alt="logo" width="75" className="absolute ml-2 top-0"/>
            <div className="flex items-center">
                <Link to="/dashboard" className="ml-80 text-3xl text-center  font-extrabold">Library Management System</Link>
            </div>
            <div className="flex items-center font-bold space-x-1">
                <Button size="lg" variant="ghost" onClick={() => navigate("/books")}>Books</Button>
                <Button size="lg" variant="ghost" onClick={() => navigate("/dashboard")}>Dashboard</Button>

                {isAdmin && (
                    <div className="flex items-center gap-10">
                        <div className="relative group">
                            <p className="flex items-center  cursor-pointer hover:bg-opacity-35 group-hover:text-black text-gray-500 p-2 hover:bg-white group-hover:bg-opacity-65 rounded-lg">
                                <span>Books</span>
                                <IoIosArrowDown className="rotate-180 transition-all group-hover:rotate-0" />
                            </p>
                            <div className="absolute right-0 top-9 hidden w-auto flex-col gap-1 rounded-lg bg-white py-4 shadow-md transition-all group-hover:flex">
                                <Link to="/addbook" className="flex items-center py-1 pl-6 pr-8 text-neutral-400 hover:text-black">
                                    <BiBookAdd className="transition-all" />
                                    <span className="whitespace-nowrap pl-3">Add Book</span>
                                </Link>
                                <Link to="/displayissue" className="flex items-center py-1 pl-6 pr-8 text-neutral-400 hover:text-black">
                                    <FaBookReader className="transition-all" />
                                    <span className="whitespace-nowrap pl-3">Issued Books</span>
                                </Link>
                                <Link to="/returned" className="flex items-center py-1 pl-6 pr-8 text-neutral-400 hover:text-black">
                                    <FaBookReader className="transition-all" />
                                    <span className="whitespace-nowrap pl-3">Returned Books</span>
                                </Link>
                            </div>
                        </div>
                        <div className="relative group">
                            <p className="flex p-2 items-center gap- cursor-pointer hover:bg-opacity-35   group-hover:text-black text-gray-500 hover:bg-white group-hover:bg-opacity-65 rounded-lg">
                                <span>Students</span>
                                <IoIosArrowDown className="rotate-180 transition-all group-hover:rotate-0" />
                            </p>
                            <div className="absolute right-0 top-8 hidden w-auto flex-col gap-1 rounded-lg bg-white py-4 shadow-md transition-all group-hover:flex">
                                <Link to="/addstudent   " className="flex items-center py-1 pl-6 pr-8 text-neutral-400 hover:text-black">
                                    <MdPersonAddAlt1 className="transition-all" />
                                    <span className="whitespace-nowrap pl-3">Add Students</span>
                                </Link>
                                <Link to="/students" className="flex items-center py-1 pl-6 pr-8 text-neutral-400 hover:text-black">
                                    <HiUserGroup className="transition-all" />
                                    <span className="whitespace-nowrap pl-3">Students List</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
                <Button size="lg" variant="ghost" onClick={handleLogout}>Logout</Button>
            </div>
        </nav>
    );
};

const isAdminUser = async (token: string): Promise<boolean> => {
    try {
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.userId;
        const response = await axios.get(`${BACKEND_URL}/api/v1/user/${userId}`);
        return response.data.is_admin;
    } catch (err) {
        console.error("Error checking admin status:", err);
        return false;
    }
};

export default Navbar;
