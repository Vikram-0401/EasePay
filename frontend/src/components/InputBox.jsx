export function InputBox({ label, placeholder, onChange, type = "text", value }) {
  return (
      <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
          </label>
          <input 
              onChange={onChange} 
              placeholder={placeholder}
              value={value}
              type={type}
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
          />
      </div>
  );
}