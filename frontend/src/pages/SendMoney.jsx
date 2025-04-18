import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';

export const SendMoney = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleTransfer = async () => {
        if (!amount || amount <= 0) {
            setError("Please enter a valid amount");
            return;
        }

        setIsLoading(true);
        setError("");
        
        try {
            const response = await axios.post("http://localhost:3000/api/v1/account/transfer", {
                to: id,
                amount: parseFloat(amount)
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            
            // Show success message
            setSuccess(true);
            
            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } catch (error) {
            setError(error.response?.data?.message || "Transaction failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div
                    className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
                >
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        {success ? (
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold text-center">Transaction Successful!</h3>
                                <p className="text-sm text-gray-600 text-center">
                                    You have successfully sent ₹{amount} to {name}.
                                </p>
                                <p className="text-xs text-gray-500 text-center">
                                    Redirecting to dashboard...
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                        <span className="text-2xl text-white">{name && name[0]?.toUpperCase()}</span>
                                    </div>
                                    <h3 className="text-2xl font-semibold">{name}</h3>
                                </div>
                                <div className="space-y-4 mt-4">
                                    <div className="space-y-2">
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="amount"
                                        >
                                            Amount (in ₹)
                                        </label>
                                        <input
                                            onChange={(e) => {
                                                setAmount(e.target.value);
                                                setError("");
                                            }}
                                            type="number"
                                            className={`flex h-10 w-full rounded-md border ${error ? 'border-red-500' : 'border-input'} bg-background px-3 py-2 text-sm`}
                                            id="amount"
                                            placeholder="Enter amount"
                                            min="1"
                                        />
                                        {error && (
                                            <p className="text-sm text-red-500 mt-1">{error}</p>
                                        )}
                                    </div>
                                    <button 
                                        onClick={handleTransfer} 
                                        disabled={isLoading}
                                        className={`justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full ${isLoading ? 'bg-green-300' : 'bg-green-500 hover:bg-green-600'} text-white`}
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing
                                            </span>
                                        ) : "Initiate Transfer"}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};