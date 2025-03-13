import { useState, useEffect } from "react";
import { getComments, addComment } from "../services/CommentService";

const CommentModal = ({ resourceId, closeModal }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, [resourceId]);

  const fetchComments = async () => {
    try {
      const data = await getComments(resourceId);
      setComments(data);
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {     
      const addedComment = await addComment(resourceId, 75, newComment);
      setComments([...comments, addedComment]);
      setNewComment("");

    } catch (error) {
      console.error("Error al agregar comentario:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold text-[#4A90E2]">💬 Comentarios</h2>
        <ul className="space-y-2 text-gray-700 mt-4">
          {comments.map((c) => (
            <li key={c.id} className="bg-[#D9B2FF] p-2 rounded-md shadow">{c.content}</li>
          ))}
        </ul>

        <input
          type="text"
          placeholder="Escribe un comentario..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="p-2 border rounded-lg w-full mt-2"
        />
        <button
          onClick={handleAddComment}
          className="bg-[#FF6600] text-white px-4 py-2 rounded-lg hover:bg-[#e65c00] transition mt-2"
        >
          ➕ Agregar
        </button>

        <button
          onClick={closeModal}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition mt-2 ml-2"
        >
          ❌ Cerrar
        </button>
      </div>
    </div>
  );
};

export default CommentModal;

