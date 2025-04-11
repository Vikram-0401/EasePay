export const Appbar = () => {
    return (
        <div className="shadow-md bg-blue-600 text-white h-16 flex justify-between items-center">
            <div className="flex items-center h-full ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-bold text-xl">PayEase</span>
            </div>
            <div className="flex items-center">
                <div className="flex items-center h-full mr-3">
                    Hello, User
                </div>
                <div className="rounded-full h-10 w-10 bg-blue-700 flex justify-center items-center mr-4 border-2 border-white">
                    <div className="text-lg font-medium">
                        U
                    </div>
                </div>
            </div>
        </div>
    );
};