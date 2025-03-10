import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const register = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Error en el registro.");
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Error en el inicio de sesión.");
  }
};

export const logout = () => {};

export const getCurrentUser = async () => {
  try {
    const response = await fetch(`${API_URL}/current-user`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch {
    return null;
  }
};
