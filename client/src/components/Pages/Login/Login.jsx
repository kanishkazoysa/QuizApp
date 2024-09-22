const Login = () => {
  return (
    <div className="flex flex-col items-center w-screen h-screen justify-center sm:bg-white md:bg-gradient-to-br lg:bg-gradient-to-br from-purple-100 to-blue-100 ">
      <div className="w-1/2 max-w-sm mx-auto overflow-hidden bg-white rounded-lg md:shadow-lg lg:shadow-lg  dark:bg-gray-800 ">
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
            Welcome
          </h3>

          <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
            Login
          </p>

          <form>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                placeholder="User Name"
                aria-label="User Name"
              />
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="Password"
                aria-label="Password"
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <a
                href="/forget-password"
                className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
              >
                Forget Password?
              </a>
              <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
