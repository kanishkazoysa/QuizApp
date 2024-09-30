import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useAdminStore } from "../../../../store/adminStore.js";
import { toast } from "react-hot-toast";

import Input from "./Input.jsx";

const UserData = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const navigate = useNavigate();

  const {
    getStudentDataById,
    studentData,
    updateStudentData,
    isLoading,
    error,
  } = useAdminStore();

  // GET student data by ID
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        await getStudentDataById(id); // Fetch data based on the ID
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    console.log("Fetching student data for ID:", id);
    fetchStudentData();
  }, [getStudentDataById, id]);

  // Populate form fields with studentData
  useEffect(() => {
    if (!isLoading && studentData) {
      console.log("Fetched student data:", studentData);
      setName(studentData.name || "");
      setEmail(studentData.email || "");
      setAge(studentData.age || "");
      setPhone(studentData.phone || "");
      setAddress(studentData.address || "");
      setDob(
        studentData.dob
          ? new Date(studentData.dob).toISOString().split("T")[0]
          : ""
      );
      setNic(studentData.nic || "");
    }
  }, [isLoading, studentData]);

  // Update student data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStudentData(id, email, name, age, phone, address, dob, nic);
      toast.success("Student data updated successfully");
      setTimeout(() => {
        navigate("/admin/users");
      }, 2000);
    } catch (error) {
      toast.error("Error updating student data");
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl w-1/2 ">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-500 text-transparent bg-clip-text">
          Edit Student Data
        </h2>
        <form onSubmit={handleSubmit} className="w-full">
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Telephone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <Input
            type="text"
            placeholder="NIC Number"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
          />
          {error && <p className="text-red-500 mb-1 font-semibold">{error}</p>}

          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin mx-auto" size={24} />
            ) : (
              "Update Data"
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default UserData;
