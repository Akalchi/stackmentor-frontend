import "./App.css";
import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";
const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
    <div className="flex-grow">
      <Header />
      <AppRoutes />
    </div>
  </div>
  );
};

export default Home;

