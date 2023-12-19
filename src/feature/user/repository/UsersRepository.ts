import Users from "../model/Users";
import {
  type UserWithOutIdStructure,
  type UserWithOutPasswordStructure,
} from "../types";
import { type UsersRepositoryStructure } from "./types";

class UsersRepository implements UsersRepositoryStructure {
  userCreate = async (
    userBase: UserWithOutIdStructure,
  ): Promise<UserWithOutPasswordStructure> => {
    const { password, _id, name } = (await Users.create(userBase)).toJSON();

    return { name, id: _id };
  };
}

export default UsersRepository;
