import { useState, useEffect } from "react";
import { getComments, addComment, updateComment, deleteComment } from "../services/CommentService";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa"; 

const CommentModal = ({ resourceId, userId, userEmail, closeModal }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    fetchComments();
  }, [resourceId]);

  const fetchComments = async () => {
    try {
      const data = await getComments(resourceId);
      if (!Array.isArray(data)) {
        console.error("⚠ La API devolvió un formato inesperado:", data);
        setComments([]);
      } else {
        console.log("Comentarios cargados:", data); 
        setComments(data);
      }
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
      setComments([]);
    }
  };
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {     
      const addedComment = await addComment(resourceId, userId, newComment);
      setComments([...comments, addedComment]);
      setNewComment("");
    } catch (error) {
      console.error("Error al agregar comentario:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!userEmail) {
      console.error("❌ Error: userEmail no está definido.");
      return;
    }

    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este comentario?");
    if (!confirmDelete) return;

    try {
      await deleteComment(commentId, userEmail);
      fetchComments();
    } catch (error) {
      console.error("Error al eliminar comentario:", error);
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#D9B2FF] bg-opacity-50 z-50">

      <div className="bg-white border-2 border-[#6A0DAD] p-6 rounded-lg shadow-lg w-200">
      
        <h2 className="text-lg font-bold text-[#4A90E2] flex items-center gap-2">
          💬 Comentarios
        </h2>
        <div className="bg-[#D9B2FF]">
        <ul className="space-y-2 text-gray-700 mt-4 max-h-60 overflow-y-auto">
          {comments.map((c) => (
            <li 
              key={c.id ?? Math.random()} 
              className="bg-white p-2 rounded-md shadow flex justify-between items-center text-sm"
            >
              <div className="flex items-center gap-2 w-full">
                {editingComment === c.id ? (
                  <input
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="p-1 border rounded w-full text-sm"
                  />
                ) : (
                  <span className="flex-1 truncate">{c.content}</span>
                )}

                
                {console.log(`Comentario ID: ${c.id}, Usuario: ${c.user?.id}, userId actual: ${userId}`)}

                {c.user && c.user.id && c.user.id === userId && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setEditingComment(c.id); setEditContent(c.content); }} 
                      className="text-blue-600 hover:text-blue-800">
                      <FaEdit size={16} /> 
                    </button>
                    <button 
                      onClick={() => handleDeleteComment(c.id)} 
                      className="text-red-600 hover:text-red-800">
                      <FaTrash size={16} /> 
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
        </div>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Escribe un comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="p-2 border rounded-lg w-full text-sm"
          />
          <div className="flex justify-between mt-2">
            <button
              onClick={handleAddComment}
              className="bg-[#FF6600] text-white px-4 py-2 rounded-lg hover:bg-[#e65c00] flex items-center gap-2"
            >
              <FaPlus /> Agregar
            </button>

            <button
              onClick={closeModal}
              className="bg-[#6A0DAD] text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
            >
              <FaTimes /> Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;



