import axios from "axios";
import { IUser, IUserResponse } from "../models/User";
import { PUBLIC_IP } from "../utils/Constants";

const BASE_URL = `${PUBLIC_IP}/api/users`;

export async function register(userData: IUser) {
  const response = await axios.post(`${BASE_URL}/auth/register`, userData);
  return response.data;
}

export async function login(email: string, password: string): Promise<unknown> {
  const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
  return response.data;
}

export async function getAllUsers(token: string): Promise<IUserResponse[]> {
  const response = await axios.get(`${BASE_URL}/admin/get-all-users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function getYourProfile(token: string): Promise<IUserResponse> {
  const response = await axios.get(`${BASE_URL}/adminuser/get-profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function getUserById(userId: string, token: string): Promise<IUserResponse> {
  const response = await axios.get(`${BASE_URL}/admin/get-users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function deleteUser(userId: string, token: string): Promise<unknown> {
  const response = await axios.delete(`${BASE_URL}/admin/delete/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function updateUser(userId: string, userData: Partial<IUserResponse>, token: string): Promise<IUserResponse> {
  const response = await axios.put(`${BASE_URL}/adminuser/update/${userId}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function changePasswordUser(email: string, newPassword: string, token: string): Promise<unknown> {
  const response = await axios.post(
    `${BASE_URL}/adminuser/change-password`,
    { email, password: newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

export async function changePassword(email: string, newPassword: string): Promise<unknown> {
  const response = await axios.post(`${BASE_URL}/adminuser/change-password`, { email, password: newPassword });
  return response.data;
}

export async function forgotPassword(email: string, newPassword: string): Promise<unknown> {
  try {
    const response = await axios.post(`${BASE_URL}/auth/forgot-password`, {
      email,
      password: newPassword,
    });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw new Error("Error al restablecer la contraseña: " + (error as Error).message);
  }
}

export async function verifyEmailUser(email: string, password: string): Promise<unknown> {
  const response = await axios.post(`${BASE_URL}/verify-email`, { email, password });
  return response.data;
}

/** AUTHENTICATION CHECKER */
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
}

export function isAuthenticated() {
  const token = localStorage.getItem("token");
  return !!token;
}

export function isAdmin() {
  const role = localStorage.getItem("role");
  return role === "ADMIN";
}

export function isUser() {
  const role = localStorage.getItem("role");
  return role === "USER";
}

export function adminOnly() {
  return isAuthenticated() && isAdmin();
}
