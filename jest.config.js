export default {
    testEnvironment: "jsdom", // Necesario para probar React
    transform: {
      "^.+\\.jsx?$": "babel-jest" // Transforma archivos .js y .jsx con Babel
    },
    moduleFileExtensions: ["js", "jsx"],
    setupFilesAfterEnv: ["./setupTests.js"], // Archivo de configuración de Testing Library
  };
  
  
  
  
  
  
  