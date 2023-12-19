import {
  type UserWithOutPasswordStructure,
  type UserWithOutIdStructure,
} from "../types";

export interface UserRepositoryStructure {
  userCreate?: (
    userBase: UserWithOutIdStructure,
  ) => Promise<UserWithOutPasswordStructure>;
}
