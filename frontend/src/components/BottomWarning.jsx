import { Link } from "react-router-dom";

export function BottomWarning({ label, buttonText, to }) {
    return (
        <div className="py-4 text-sm flex justify-center items-center border-t mt-6">
            <div className="text-gray-600">
                {label}
            </div>
            <Link 
                className="ml-1 text-blue-600 font-medium hover:text-blue-800 transition-colors" 
                to={to}
            >
                {buttonText}
            </Link>
        </div>
    );
}