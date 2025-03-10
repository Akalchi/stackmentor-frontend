import React from 'react';
const Footer = () => {
    return (
      <footer className="bg-[#FF6600] text-white text-center p-4 mt-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} StackMentor. Todos los derechos reservados.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:underline text-[#F3F0FF] hover:text-[#6A0DAD] transition">
              Términos y Condiciones
            </a>
            <a href="#" className="hover:underline text-[#F3F0FF] hover:text-[#6A0DAD] transition">
              Política de Privacidad
            </a>
          </div>
        </div>
      </footer>
    );
  };
  export default Footer;