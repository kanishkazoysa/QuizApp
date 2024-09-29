import { create } from "zustand";
import axios from "axios";
import { message } from "antd";

const ADMIN_API_URL = "http://localhost:5000/api/admin";
// const AUTH_API_URL = "http://localhost:5000/api/auth";

axios.defaults.withCredentials = true;

export const useAdminStore = create((set) => ({
  StudentData: [],
  error: null,
  isLoading: false,
  message: null,
  isCheckingAuth: true,

  addStudentData: async (name, email, phone, address, dob, nic) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${ADMIN_API_URL}/add-student`, {
        name,
        email,
        phone,
        address,
        dob,
        nic,
      });
      set({
        StudentData: response.data.StudentData,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error adding student",
        isLoading: false,
      });
      throw error;
    }
  },

  getStudentData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${ADMIN_API_URL}/student-data`);
      set({
        studentData: response.data.data,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error getting student data",
        isLoading: false,
      });
      throw error;
    }
  },

  getStudentDataById: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(
        `${ADMIN_API_URL}/get-student-data/${id}`
      );
      set({
        StudentData: response.data.StudentData,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error getting student data",
        isLoading: false,
      });
      throw error;
    }
  },
  updateStudentData: async (id, name, email, phone, address, dob, nic) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.put(
        `${ADMIN_API_URL}/update-student-data/${id}`,
        { name, email, phone, address, dob, nic }
      );
      set({
        StudentData: response.data.StudentData,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error updating student data",
        isLoading: false,
      });
      throw error;
    }
  },
  deleteStudentData: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.delete(
        `${ADMIN_API_URL}/delete-student-data/${id}`
      );
      set({
        StudentData: response.data.StudentData,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error deleting student data",
        isLoading: false,
      });
      throw error;
    }
  },
}));
