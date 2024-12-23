import { Student } from "../models/student.model.js";

// Neeed to check the admin role by admin token and then update the student data

export const addStudentData = async (req, res) => {
  const { name, email, age, phone, address, dob, nic } = req.body;

  try {
    if (!name || !email || !age || !phone || !address || !dob || !nic) {
      throw new Error("All fields are required");
    }

    // Check if user exists in the database
    const userAlreadyExists = await Student.findOne({ nic });

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const student = new Student({
      name,
      email,
      age,
      phone,
      address,
      dob,
      nic,
    });

    const saveStudent = await student.save();

    if (!saveStudent) {
      throw new Error("The student data cannot be saved");
    }

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getStudentData = async (req, res) => {
  try {
    const studentData = await Student.find();
    if (!studentData || studentData.length === 0) {
      return res.status(404).json({ success: false, message: "No data found" });
    }
    res.status(200).json({ success: true, data: studentData });
  } catch (error) {
    res.status(400).json({ success: false, message: "Server Error " + error });
  }
};

export const getStudentDataById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const studentData = await Student.findById(studentId);
    if (!studentData || studentData.length === 0) {
      return res.status(404).json({ success: false, message: "No data found" });
    }
    res.status(200).json({ success: true, data: studentData });
  } catch (error) {
    res.status(400).json({ success: false, message: "Server Error " + error });
  }
};

export const updateStudentData = async (req, res) => {
  try {
    const studentId = req.params.id;
    const isStudentExist = await Student.findById(studentId);

    if (!isStudentExist) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    const updateStudent = await Student.findByIdAndUpdate(studentId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateStudent) {
      return res.status(400).json({ success: false, message: "Update failed" });
    }

    res
      .status(200)
      .json({ success: true, message: "Student data updated successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteStudentData = async (req, res) => {
  try {
    const studentId = req.params.id;
    const isStudentExist = await Student.findById(studentId);

    if (!isStudentExist) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }
    const isStudentDeleted = await Student.findByIdAndDelete(studentId);
    if (!isStudentDeleted) {
      return res
        .status(400)
        .json({ success: false, message: "Student data deletion failed" });
    }
    res
      .status(200)
      .json({ success: true, message: "Student data deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Server error!," + error.message });
  }
};
