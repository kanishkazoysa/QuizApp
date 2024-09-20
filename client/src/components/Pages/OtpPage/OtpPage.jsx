import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const OtpPage = () => {
  const Navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef(Array(4).fill(null));

  const handleChange = (index, value) => {
    if (value.length > 1 && value !== "") {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "") {
      if (index < 3) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleVerifyAccount = () => {
    Navigate("/change-password");
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center sm:bg-white md:bg-gradient-to-br lg:bg-gradient-to-br from-purple-100 to-blue-100 ">
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
            Email Verification
          </h3>

          <p className="mt-3 text-center text-gray-500 dark:text-gray-400">
            We have sent a code to your email
          </p>

          <form>
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
              {otp.map((digit, index) => (
                <div key={index} className="w-14 h-14 mt-8 mb-8">
                  <input
                    ref={(el) => (inputRefs.current[index] = el)}
                    id={`otp-input-${index + 1}`}
                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="text"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    maxLength="1"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-4">
              <button onClick={handleVerifyAccount} className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Verify Account
              </button>
              <a
                onClick={() => Navigate("/")}
                className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500 cursor-pointer"
              >
                Resend Code?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
