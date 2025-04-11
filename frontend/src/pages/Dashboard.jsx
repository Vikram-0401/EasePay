import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
        }
    }, [navigate]);
    
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Appbar />
            <div className="container mx-auto px-4 py-6 md:px-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">My Dashboard</h1>
                <Balance value={"10,000"} />
                <Users />
            </div>
        </div>
    );
};