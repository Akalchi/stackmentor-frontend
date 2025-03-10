import "./App.css";
import AppRoutes from "./routes/AppRoutes";
const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
    <div className="flex-grow">
      <AppRoutes />
    </div>
  </div>
  );
};

export default Home;

