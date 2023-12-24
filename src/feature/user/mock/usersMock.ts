import { type UserStructure, type UserWithOutIdStructure } from "../types";

export const newUser: UserWithOutIdStructure = {
  name: "Pepito",
  password: "whassap",
};

export const mockUsers: UserStructure[] = [
  {
    name: "alfredo",
    password: "whassap",
    id: "1214caaf5af4ad5",
  },
  {
    name: "sopapilla",
    password: "copenco",
    id: "1214caafabce235",
  },
];
