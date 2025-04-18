import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!firstName || !lastName || !username || !password) {
      alert("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        username,
        firstName,
        lastName,
        password
      });
      
      // Store token and basic info
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", username);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      
      // Extract userId from token and store it
      try {
        // The token structure should be like: header.payload.signature
        const tokenParts = response.data.token.split('.');
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          if (payload.userId) {
            localStorage.setItem("userId", payload.userId);
          }
        }
      } catch (err) {
        console.error("Error extracting userId from token", err);
      }
      
      navigate("/dashboard");
    } catch (error) {
      alert("Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-50 min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-xl bg-white shadow-lg p-6 border border-gray-100">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 text-white p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <Heading label={"Create Account"} />
          <SubHeading label={"Enter your information to get started"} />
          
          <div className="grid grid-cols-2 gap-3 mt-6">
            <InputBox 
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John" 
              label={"First Name"} 
              value={firstName}
            />
            <InputBox 
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe" 
              label={"Last Name"} 
              value={lastName}
            />
          </div>
          
          <div className="space-y-4 mt-3">
            <InputBox 
              onChange={(e) => setUsername(e.target.value)}
              placeholder="name@example.com" 
              label={"Email Address"} 
              type="email"
              value={username}
            />
            <InputBox 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              label={"Password"} 
              type="password"
              value={password}
            />
            
            <div className="flex items-center">
              <input type="checkbox" id="terms" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the <span className="text-blue-600 font-medium">Terms of Service</span> and <span className="text-blue-600 font-medium">Privacy Policy</span>
              </label>
            </div>
            
            <div className="pt-2">
              <Button
                onClick={handleSignUp}
                label={isLoading ? "Creating account..." : "Create Account"}
                variant="primary"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
          </div>
        </div>
      </div>
    </div>
  );
};