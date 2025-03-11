import { Link } from "react-router-dom";
import img from "../assets/HomeImage.jpg";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-900 text-center ">
     
      <div className="max-w-3xl">
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#FF6600]">
          Bienvenido a StackMentor 🚀
        </h1>
       
        <p className="text-lg md:text-xl mb-6 text-[#6A0DAD]">
          Encuentra los mejores recursos para tu bootcamp y acelera tu aprendizaje con contenido de calidad.
        </p>
       
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="bg-[#FF6600] px-6 py-3 rounded-lg text-white font-semibold text-lg hover:bg-[#e65c00] transition"
          >
            Regístrate Gratis
          </Link>
          <Link
            to="/resources"
            className="border-2 border-[#FF6600] px-6 py-3 rounded-lg font-semibold text-lg text-[#FF6600] hover:bg-[#FF6600] hover:text-white transition"
          >
            Explorar Recursos
          </Link>
        </div>
      </div>
     
      <div className="mt-10">
        <img
          src={img}
          alt="Learning"
          className="rounded-lg shadow-lg w-full max-w-lg border-4 border-[#6A0DAD]"
        />
      </div>
    </div>
  );
};
export default Home;
