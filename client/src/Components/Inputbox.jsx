export default function InputBox({ 
  type, 
  placeholder, 
  value, 
  onChange 
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}