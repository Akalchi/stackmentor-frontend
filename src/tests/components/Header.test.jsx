
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../components/Header";



describe("Header component", () => {

    test("should render the Header correctly", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ user: null, handleLogout: jest.fn() }}>
                    <Header setSelectedCategory={jest.fn()} />

                </AuthContext.Provider>
            </BrowserRouter>
        );

        expect(
            screen.getByText((content, element) => {
                return element?.textContent === "StackMentor";
            })

        ).toBeInTheDocument();

        expect(screen.getByText(/Recursos/i)).toBeInTheDocument();
    });

    test("should toggle the dropdow menu when clicking 'Recursos'", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ user: null, handleLogout: jest.fn() }}>
                    <Header setSelectedCategory={jest.fn()} />
                </AuthContext.Provider>
            </BrowserRouter>
        );

        const dropdownButton = screen.getByText(/Recursos/i);

        expect(screen.queryByText(/Frontend/i)).not.toBeInTheDocument();//El menu incicialmente no debe estar visisble

        fireEvent.click(dropdownButton); //simulamos el click para abrir el menu
        expect(screen.queryByText(/Frontend/i)).toBeInTheDocument();

        fireEvent.click(dropdownButton);//simulamos el click para cerrar el menu
        expect(screen.queryByText(/Frontend/i)).not.toBeInTheDocument();
    });


})