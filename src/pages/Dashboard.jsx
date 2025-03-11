import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";


const Dashboard = () => {
  const { user, isAuthenticated, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Frontend");
  const [selectedSubcategory, setSelectedSubcategory] = useState("HTML");

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-gray-700">
        <p className="text-xl">⚠️ Debes iniciar sesión para acceder al Dashboard.</p>
        <Link to="/login" className="mt-4 px-6 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-[#e65c00] transition">
          Ir a Iniciar Sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F0FF]">
    
      <Header setSelectedCategory={setSelectedCategory} setSelectedSubcategory={setSelectedSubcategory} />

      <div className="flex p-6">

      <SideBar selectedCategory={selectedCategory} setSelectedSubcategory={setSelectedSubcategory} />
       
        <div className="flex-grow bg-white shadow-lg rounded-lg p-6">
    
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
              alt="User Avatar"
              className="w-16 h-16 rounded-full border-4 border-[#6A0DAD]"
            />
            <div>
              <h2 className="text-2xl font-bold text-[#6A0DAD]">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          <button
            onClick={() => {
              handleLogout();
              navigate("/");
            }}
            className="mb-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Cerrar Sesión
          </button>

          <h2 className="text-2xl font-bold text-[#6A0DAD] mb-4">
            📚 Tus Recursos - {selectedCategory} / {selectedSubcategory}
          </h2>
          
          <ResourceList selectedCategory={selectedCategory} selectedSubcategory={selectedSubcategory} />

        </div>
      </div>
    </div>
  );
};

export default Dashboard;