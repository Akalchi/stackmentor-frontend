
import { render, screen } from "@testing-library/react"
import Footer from "../../components/Footer"
import { expect, test } from "vitest"


describe("Footer component", () => {

    test("should render the footer correctly", () => {
        render(<Footer />);
        const currentYear = new Date().getFullYear();

        expect(screen.getByText(/StackMentor. Todos los derechos reservados./i)).toBeInTheDocument();

        expect(screen.getByText(new RegExp(currentYear.toString(), "i"))).toBeInTheDocument();

    });
});