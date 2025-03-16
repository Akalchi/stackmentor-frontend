
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../../components/Sidebar";



describe("SideBar Componet", () => {

    test("should render the sidebar correctly with Frontend categories", () => {
        render(
            <Sidebar selectedCategory="Frontend" setSelectedSubcategory={jest.fn()} />
        );
        expect(screen.getByText(/Categorías/i)).toBeInTheDocument();

        expect(screen.getByText(/HTML/i)).toBeInTheDocument();
        expect(screen.getByText(/CSS/i)).toBeInTheDocument();
        expect(screen.getByText(/JAVASCRIPT/i)).toBeInTheDocument();
        expect(screen.getByText(/REACT/i)).toBeInTheDocument();

    });


    test("should render the sidebar correctly with Backend categories", () => {
        render(
            <Sidebar selectedCategory="Backend" setSelectedSubcategory={jest.fn()} />
        );
        expect(screen.getByText(/SPRING BOOT/i)).toBeInTheDocument();
        expect(screen.getByText(/NODE.JS/i)).toBeInTheDocument();
        expect(screen.getByText(/API REST/i)).toBeInTheDocument();        

    });

    test("should render Testing categories when selectedCategory is Testing", () => {
        render(<Sidebar selectedCategory="Testing" setSelectedSubcategory={jest.fn()} />);
    
        expect(screen.getByText(/JUNIT/i)).toBeInTheDocument();
        expect(screen.getByText(/HAMCREST/i)).toBeInTheDocument();
        expect(screen.getByText(/JEST/i)).toBeInTheDocument();
      });

     test("should call setSelectedSubcategory when clicking a subcategory", () =>{
        const setSelectSubcategoryMock = jest.fn();
        render(
            <Sidebar selectedCategory= "Frontend" setSelectedSubcategory={setSelectSubcategoryMock}/>
        );
        const htmlButton = screen.getByText(/HTML/i);
        fireEvent.click(htmlButton);

        expect(setSelectSubcategoryMock).toHaveBeenCalledWith("HTML");
     }); 
});