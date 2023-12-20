import mongoose from "mongoose";
import { type UserDatabaseStructure } from "../types";

const UserShema = new mongoose.Schema<UserDatabaseStructure>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

const Users = mongoose.model("Users", UserShema, "Users");

export default Users;
