import { useState, useEffect } from "react";
import { getUserResources } from "../services/ResourceService";

const ResourceList = ({ selectedCategory, selectedSubcategory }) => {
  const [resources, setResources] = useState([]);
  const [view, setView] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await getUserResources(selectedCategory, selectedSubcategory);
        setResources(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [selectedCategory, selectedSubcategory]);

  if (loading) return <p className="text-gray-600">Cargando recursos...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="bg-[#D9B2FF] rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Buscar recurso..."
          className="p-2 border border-[#ECECEC] rounded-lg w-2/3 bg-white focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={() => setView(view === "list" ? "grid" : "list")}
          className="bg-[#FF6600] text-white px-4 py-2 rounded-lg hover:bg-[#e65c00] transition"
        >
          {view === "list" ? "📷 Vista en Cuadrícula" : "📄 Vista en Lista"}
        </button>
      </div>

      {view === "list" ? (
        <ul className="space-y-4">
          {resources.map((res) => (
            <li key={res.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold">{res.title}</h3>
              <p className="text-gray-600">{res.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {resources.map((res) => (
            <div key={res.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-center">{res.title}</h3>
              <p className="text-gray-600 text-center">{res.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourceList;
