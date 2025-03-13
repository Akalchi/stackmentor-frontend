import axios from "axios";

const API_URL = "http://localhost:8080/api/comments";

export const getComments = async (resourceId) => {
  try {
    const response = await axios.get(`${API_URL}/resource/${resourceId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener los comentarios");
  }
};

export const addComment = async (resourceId, userId, content) => {
  if (!userId || !resourceId || !content.trim()) {
    throw new Error("Datos incompletos. No se puede agregar el comentario.");
  }

  try {
    const response = await axios.post(
      "http://localhost:8080/api/comments",
      { resourceId: String(resourceId), userId: String(userId), content },
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data;
  } catch (error) {
     throw new Error("Error al agregar el comentario");
  }
};
export const updateComment = async (commentId, text) => {
  try {
    await axios.put(`${API_URL}/${commentId}`, { text });
  } catch (error) {
    throw new Error("Error al actualizar el comentario");
  }
};

export const deleteComment = async (commentId) => {
  try {
    await axios.delete(`${API_URL}/${commentId}`);
  } catch (error) {
    throw new Error("Error al eliminar el comentario");
  }
};
