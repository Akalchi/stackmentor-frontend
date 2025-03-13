import { useState, useEffect, useMemo } from "react";
import { getUserResources } from "../services/ResourceService";
import axios from "axios";

const ResourceList = ({ selectedCategory, selectedSubcategory }) => {
  const [resources, setResources] = useState([]);
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

  // Filtrado en tiempo real
  const filteredResources = useMemo(() => {
    return resources.filter((res) =>
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [resources, searchQuery]);

  //Descargar  archivos usando JSON con Base64
  const downloadFile = async (id, fileName, fileType) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/resources/file/json/id/${id}`);

      if (!response.data || !response.data.fileData) {
        alert("El archivo no está disponible.");
        return;
      }

      const base64File = response.data.fileData;
      const mimeType = response.data.fileType || "application/octet-stream";

      // Convertir Base64 a Blob
      const byteCharacters = atob(base64File);
      const byteNumbers = new Array(byteCharacters.length)
        .fill()
        .map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      const fileBlob = new Blob([byteArray], { type: mimeType });

      // Crear un enlace de descarga
      const link = document.createElement("a");
      link.href = URL.createObjectURL(fileBlob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al descargar el archivo", error);
      alert("Hubo un error al descargar el archivo.");
    }
  };

  return (
    <div className="bg-[#D9B2FF] rounded-lg shadow-lg p-6">
      <ul className="space-y-4">
        {filteredResources.map((res) => (
          <li key={res.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">{res.title}</h3>
            <p className="text-gray-600">{res.description}</p>

            {/*Mostrar solo si es una URL y NO tiene archivo */}
            {res.url && !res.fileName && (
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition inline-block mt-2"
              >
                🌍 Abrir Enlace
              </a>
            )}

            {/* Mostrar solo si tiene un archivo */}
            {res.fileName && (
              <div className="mt-3 flex gap-4">
                {/*Ver archivo en el navegador */}
                <a
                  href={`http://localhost:8080/api/resources/file/name/${encodeURIComponent(res.fileName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#6A0DAD] text-white px-4 py-2 rounded-lg hover:bg-[#4E097C] transition"
                >
                  📂 Ver Archivo
                </a>

                {/*Descargar archivo usando Base64 */}
                <button
                  onClick={() => downloadFile(res.id, res.fileName, res.fileType)}
                  className="bg-[#FF6600] text-white px-4 py-2 rounded-lg hover:bg-[#e65c00] transition"
                >
                  ⬇️ Descargar
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceList;
