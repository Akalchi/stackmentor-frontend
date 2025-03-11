import { useState, useEffect } from "react";

const ResourceList = ({ selectedCategory, selectedSubcategory }) => {
  const [view, setView] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");

  const resources = {
    Frontend: {
      HTML: [{ title: "HTML Basics", description: "Curso de HTML", id: 1 }],
      CSS: [{ title: "CSS Flexbox", description: "Guía de Flexbox", id: 2 }],
      JavaScript: [{ title: "ES6 Features", description: "Conceptos de ES6", id: 3 }],
      React: [{ title: "React Hooks", description: "Uso de hooks en React", id: 4 }],
    },
    Backend: {
      "Java con Spring Boot": [{ title: "Spring Boot API", description: "Creando APIs REST", id: 5 }],
    },
    Testing: {
      JUnit: [{ title: "JUnit para Java", description: "Pruebas en Spring Boot", id: 6 }],
      Hamcrest: [{ title: "Hamcrest Matchers", description: "Uso de matchers en JUnit", id: 7 }],
    },
  };

  const selectedResources = resources[selectedCategory]?.[selectedSubcategory] || [];

  const [ratings, setRatings] = useState(() => {
    return JSON.parse(localStorage.getItem("ratings")) || {};
  });

  useEffect(() => {
    localStorage.setItem("ratings", JSON.stringify(ratings));
  }, [ratings]);

  

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
    </div>
  );
};

export default ResourceList;