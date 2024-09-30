const Input = ({ ...props }) => {
  return (
    <div className="relative mb-6">
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 focus:outline-none bg-white bg-opacity-50 rounded-lg border  focus:border-blue-500 focus:ring-1 focus:ring-blue-400 text-gray-400 placeholder-gray-400 transition duration-200"
      />
    </div>
  );
};

export default Input;
