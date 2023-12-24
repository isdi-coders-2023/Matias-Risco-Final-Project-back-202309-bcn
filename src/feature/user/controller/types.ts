import { type Response, type Request } from "express";
import {
  type UserWithOutPasswordStructure,
  type UserWithOutIdStructure,
} from "../types";

export type UserBodyRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  { user: UserWithOutIdStructure }
>;

export type UserCreateResponse = Response<{
  user: UserWithOutPasswordStructure;
}>;

export type UserTokenResponse = Response<{
  token: string;
}>;
