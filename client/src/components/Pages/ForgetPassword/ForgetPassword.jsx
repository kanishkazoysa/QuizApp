import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();
  
  const handleResetPassword = (e) => {
    navigate("/otp");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center sm:bg-white md:bg-gradient-to-br lg:bg-gradient-to-br from-purple-100 to-blue-100 ">
      <div className="max-w-sm mx-auto overflow-hidden bg-white rounded-lg md:shadow-lg lg:shadow-lg  dark:bg-gray-800 ">
        <div className="px-6 py-4 mt-10 mb-10 h-auto">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-20" src="/logo.jpg" alt="logo" />
          </div>

          <h3
            className="mt-3 
            text-center 
            text-gray-600 
            dark:text-gray-200 
            font-medium 
            text-xl"
          >
            Forgot your password?
          </h3>

          <p className="mt-3 text-center text-gray-500 dark:text-gray-400">
            Enter your username and we’ll help you reset your password.
          </p>

          <form>
            <div className="w-full mt-10 mb-10">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={handleResetPassword}
                className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Send Otp
              </button>
              <a
                href="/"
                className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
              >
                Sign in?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword