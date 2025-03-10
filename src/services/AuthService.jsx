import axios from "axios";
const API_URL = "http://localhost:8080/api/auth/";
export const register = async (name, email, password) => {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    throw new Error("El usuario ya está registrado.");
  }
  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  return newUser;
};
export const login = async (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((user) => user.email === email && user.password === password);
  if (!user) {
    throw new Error("Email o contraseña incorrectos.");
  }
  localStorage.setItem("user", JSON.stringify(user));
  return user;
};
export const logout = () => {
  localStorage.removeItem("user");
};
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};