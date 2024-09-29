import mongoose from "mongoose";

const studentDataSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    age:{
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    nic: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentDataSchema);
