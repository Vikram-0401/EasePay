import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Appbar = () => {
    const [userName, setUserName] = useState("User");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Get user info from localStorage
        const storedFirstName = localStorage.getItem("firstName");
        const storedLastName = localStorage.getItem("lastName");
        
        if (storedFirstName) {
            setFirstName(storedFirstName);
            setUserName(storedFirstName);
        }
        
        if (storedLastName) {
            setLastName(storedLastName);
        }
    }, []);

    const handleLogout = () => {
        // Clear localStorage and redirect to landing page
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        navigate("/");
    };

    // Get initials for avatar
    const getInitials = () => {
        if (firstName && lastName) {
            return `${firstName[0]}${lastName[0]}`.toUpperCase();
        } else if (firstName) {
            return firstName[0].toUpperCase();
        }
        return "U";
    };

    return (
        <div className="shadow-lg bg-blue-600 text-white h-16 flex justify-between items-center relative">
            <div className="flex items-center h-full ml-4 md:ml-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-bold text-xl">PayEase</span>
            </div>
            
            <div className="flex items-center">
                <div className="hidden md:flex items-center h-full mr-3">
                    Hello, {userName}
                </div>
                <div 
                    className="relative cursor-pointer"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <div className="rounded-full h-10 w-10 bg-blue-700 flex justify-center items-center mr-4 border-2 border-white shadow-md hover:bg-blue-800 transition-colors duration-200">
                        <div className="text-lg font-medium">
                            {getInitials()}
                        </div>
                    </div>
                    
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                                <div className="font-medium text-gray-900">{firstName} {lastName}</div>
                                <div className="text-xs text-gray-500 truncate">{localStorage.getItem("username")}</div>
                            </div>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Profile Settings
                            </a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Transaction History
                            </a>
                            <button 
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};