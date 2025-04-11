import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const fetchUsers = setTimeout(() => {
            axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
                .then(response => {
                    setUsers(response.data.user);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching users:", error);
                    setIsLoading(false);
                });
        }, 300); // Debounce

        return () => clearTimeout(fetchUsers);
    }, [filter]);

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
            <div className="font-bold text-xl text-gray-800 mb-4">
                Send Money to Users
            </div>
            <div className="mb-4 relative">
                <input 
                    onChange={(e) => setFilter(e.target.value)}
                    type="text" 
                    placeholder="Search users by name..." 
                    className="w-full px-4 py-2 pr-10 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            
            {isLoading ? (
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <div className="space-y-3">
                    {users.length > 0 ? (
                        users.map(user => <User key={user._id} user={user} />)
                    ) : (
                        <div className="text-center py-8 text-gray-500">No users found</div>
                    )}
                </div>
            )}
        </div>
    );
};

function User({ user }) {
    const navigate = useNavigate();
    const initials = user.firstName[0] + (user.lastName ? user.lastName[0] : "");
    
    // Generate consistent pastel color based on user name
    const getColorClass = (name) => {
        const colors = [
            "bg-blue-100 text-blue-800",
            "bg-green-100 text-green-800",
            "bg-purple-100 text-purple-800",
            "bg-yellow-100 text-yellow-800",
            "bg-pink-100 text-pink-800",
            "bg-indigo-100 text-indigo-800"
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    const handleSendMoney = () => {
        navigate(`/send?id=${user._id}&name=${user.firstName}`);
    };

    return (
        <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center">
                <div className={`rounded-full h-12 w-12 flex justify-center items-center mr-3 ${getColorClass(user.firstName)}`}>
                    <div className="font-medium text-lg">
                        {initials}
                    </div>
                </div>
                <div>
                    <div className="font-medium">{user.firstName} {user.lastName}</div>
                    {user.email && <div className="text-sm text-gray-500">{user.email}</div>}
                </div>
            </div>

            <div className="w-28">
                <Button 
                    onClick={handleSendMoney} 
                    label="Send" 
                    variant="success" 
                />
            </div>
        </div>
    );
}