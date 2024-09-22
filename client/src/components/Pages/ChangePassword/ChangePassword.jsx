

const ChangePassword = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center sm:bg-white md:bg-gradient-to-br lg:bg-gradient-to-br from-purple-100 to-blue-100 ">
      <div className="max-w-sm mx-auto overflow-hidden bg-white rounded-lg md:shadow-lg lg:shadow-lg  dark:bg-gray-800 flex items-center">
        <div className="px-6 flex flex-col gap-1 h-auto mt-10 mb-10">
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
            Create New Password
          </h3>

          <p className="mt-2 mb-5 text-center text-gray-500 dark:text-gray-400">
            Your new password must be different from previous used passwords
          </p>

          <form>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="New Password"
                aria-label="New Password"
              />
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="Confirm Password"
                aria-label="Confirm Password"
              />
            </div>

            <div className="mt-5">
              <button className="w-full px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword