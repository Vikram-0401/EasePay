export const Balance = ({ value }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex justify-between items-center">
                <div className="font-medium text-gray-600">
                    Your Balance
                </div>
                <div className="font-bold text-2xl text-blue-600">
                    ₹{value.toLocaleString('en-IN')}
                </div>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-100">
                <div className="text-xs text-gray-500">Updated just now</div>
            </div>
        </div>
    );
};