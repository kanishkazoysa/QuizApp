import { useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "username":
        if (!value.trim()) error = "Username is required";
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Invalid email address";
        }
        break;
      case "password":
        if (!value) error = "Password is required";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const touchedFields = Object.fromEntries(
      Object.keys(formData).map((key) => [key, true])
    );
    setTouched(touchedFields);

    const formErrors = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key,
        validateField(key, value),
      ])
    );
    setErrors(formErrors);

    if (Object.values(formErrors).every((error) => !error)) {
      // Proceed with form submission
      console.log("Form submitted:", formData);
    }
  };

  const renderError = (field) => {
    if (touched[field] && errors[field]) {
      return (
        <p className="font-normal text-red-500 text-sm p-1">{errors[field]}</p>
      );
    }
    return null;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center w-screen h-screen justify-center sm:bg-white md:bg-gradient-to-br lg:bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="w-1/2 max-w-sm mx-auto overflow-hidden bg-white rounded-lg md:shadow-lg lg:shadow-lg dark:bg-gray-800">
        <div className="px-6 py-4 mt-10 mb-10 h-auto">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-20" src="/logo.jpg" alt="logo" />
          </div>

          <h3 className="mt-3 text-center text-gray-600 dark:text-gray-200 font-medium text-xl">
            Register
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                name="username"
                placeholder="User Name"
                aria-label="User Name"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {renderError("username")}
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                name="email"
                placeholder="Email Address"
                aria-label="Email Address"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {renderError("email")}
            </div>

            <div className="w-full mt-4 relative">
              <div className="relative">
                <input
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300 pr-10"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  aria-label="Password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 mt-0"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {renderError("password")}
              <PasswordStrengthBar
                password={formData.password}
                className="p-1"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Sign Up
            </button>
            <div className="flex items-center justify-center mt-4">
              Already have an account?{" "}
              <a
                href="/"
                className="ml-2 text-normal text-blue-500 dark:text-gray-200 hover:text-gray-500"
              >
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
