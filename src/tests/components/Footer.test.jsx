
import { render, screen } from "@testing-library/react"
import Footer from "../../components/Footer"
import React from "react";




describe("Footer component", () => {

    test("should render the footer correctly", () => {
        render(<Footer />);
        const currentYear = new Date().getFullYear();

        expect(screen.getByText(/StackMentor. Todos los derechos reservados./i)).toBeInTheDocument();

        expect(screen.getByText(new RegExp(currentYear.toString(), "i"))).toBeInTheDocument();

    });

    test("should render only one footer element", () =>{
        render(<Footer />);
        const footer = screen.getAllByRole("contentinfo");
        expect(footer.length).toBe(1);
    });

    test("Should not be empty", () =>{
        render(<Footer/>);
        const footerElement = screen.getByRole("contentinfo");
        expect(footerElement).not.toBeEmptyDOMElement();
    });

    test("should display the correct year when moked", () =>{
        const mockYear = 2030;
        jest.spyOn(global.Date.prototype, "getFullYear").mockReturnValue(mockYear);

        render(<Footer />);
        expect(screen.getByText(new RegExp(mockYear.toString(), "i"))).toBeInTheDocument();
        jest.restoreAllMocks();
    })


});

