
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";
import { register, login, logout, getCurrentUser } from "../../services/AuthService.jsx";

vi.mock("axios"); // Ahora usamos `vi.mock()` en lugar de `jest.mock()`

describe("authService", () => {
  afterEach(() => {
    vi.clearAllMocks(); // Limpia los mocks después de cada test
  });

  describe("register", () => {
  test("should register a user successfully", async () => {
    // Definir respuesta simulada
    const mockResponse = { message: "Usuario Registrado Satisfactoriamente" };
    axios.post.mockResolvedValueOnce({ data: mockResponse });
  
    //Ejecutar función
    const result = await register("Lanny", "lanny@example.com", "password123");
  
    //Verificar resultado
    expect(result).toEqual(mockResponse);
  
    //Verificar que la API se llamó correctamente
    expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:8080/api/auth/register",
        { username: "Lanny", email: "lanny@example.com", password: "password123" },
        { withCredentials: true }
      );
  });
  
  test("should throw error on failed registration", async () => {
    axios.post.mockRejectedValueOnce({ response: { data: "El Email ya existe" } });
    await expect(register("Lanny", "lanny@example.com", "password123")).rejects.toThrow("El Email ya existe");
  });
});
 
describe("login", () => {
    test("should log in successfully and store user in localStorage", async () => {
      const mockUser = { id: 1, username: "Lanny", email: "lanny@example.com", token: "abcd1234" };
      axios.post.mockResolvedValueOnce({ data: mockUser });

      const result = await login("lanny@example.com", "password123");

      expect(result).toEqual(mockUser);
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:8080/api/auth/login",
        { email: "lanny@example.com", password: "password123" },
        { withCredentials: true }
      );
      expect(localStorage.getItem("user")).toEqual(JSON.stringify(mockUser));
    });

    test("should throw error on failed login", async () => {
      axios.post.mockRejectedValueOnce({ response: { data: "Invalid credentials" } });

      await expect(login("lanny@example.com", "wrongpassword")).rejects.toThrow("Invalid credentials");
    });
  });

  describe("logout", () => {
    test("should remove user from localStorage", () => {
      localStorage.setItem("user", JSON.stringify({ username: "Lanny" }));
      logout();
      expect(localStorage.getItem("user")).toBeNull();
    });
  });

  describe("getCurrentUser", () => {
    test("should get current user successfully", async () => {
      const mockUser = { id: 1, username: "Lanny", email: "lanny@example.com" };
      axios.get.mockResolvedValueOnce({ data: mockUser });

      const result = await getCurrentUser("lanny@example.com");

      expect(result).toEqual(mockUser);
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:8080/api/auth/current-user?email=lanny%40example.com",
        { withCredentials: true }
      );
    });

    test("should throw error if unable to get current user", async () => {
      axios.get.mockRejectedValueOnce({ response: { data: "Usuario no encontrado" } });

      await expect(getCurrentUser("notfound@example.com")).rejects.toThrow("Usuario no encontrado");
    });
  });
})
