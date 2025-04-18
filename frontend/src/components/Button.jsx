export function Button({ label, onClick, variant = "primary" }) {
    const baseClasses = "w-full font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const variants = {
        primary: "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
        success: "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500",
        secondary: "text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-gray-400"
    };

    return (
        <button 
            onClick={onClick} 
            type="button" 
            className={`${baseClasses} ${variants[variant] || variants.primary}`}
        >
            {label}
        </button>
    );
}