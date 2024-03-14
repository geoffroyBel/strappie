import axios from "axios";
import { Credentials } from "../../types";
import { API_URL } from "../../config";
import { User } from "../../types";
import api from "../../api";
const API_KEY = "AIzaSyDTsF8_CZHX5io1xBmrPy8n4Od4YBvT4AE";
export const TOKEN = "fbtoken";

export async function signin({ code, password }: Credentials) {
  try {
    const { data } = await axios.post(`${API_URL}/login`, {
      code,
      password,
    });
    return data.access_token;
  } catch (error: unknown) {
    throw new Error("Fail login User");
  }
}

export async function getUser(): Promise<User> {
  try {
    const { data } = await api.get(`/me`, {
      withCredentials: true,
    });
    return data;
  } catch (error: unknown) {
    throw new Error("Fail retrieve User");
  }
}

export async function updateMyself(user: User, changes: Partial<User>) {
  try {
    // Route is to post /api/users/:id
    return await api.post(`/users/${user.id}`, changes);
  } catch (error: unknown) {
    console.log(error);
    throw new Error("Fail update User");
  }
}
