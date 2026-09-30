import { render, screen } from "@testing-library/react";
import BookingForm from "./BookingForm";

test("Renders the BookingForm heading", () => {
  const availableTimes = ["17:00", "18:00"];
  render(<BookingForm availableTimes={availableTimes} dispatch={() => {}} submitForm={() => {}} />);
  const headingElement = screen.getByText("Book Table");
  toBeInTheDocument: expect(headingElement).toBeInTheDocument();
});

test("HTML5 validation attributes are applied to inputs", () => {
  const availableTimes = ["17:00"];
  render(<BookingForm availableTimes={availableTimes} dispatch={() => {}} submitForm={() => {}} />);

  const dateInput = screen.getByLabelText(/Choose date/i);
  expect(dateInput).toHaveAttribute("required");

  const guestsInput = screen.getByLabelText(/Number of guests/i);
  expect(guestsInput).toHaveAttribute("min", "1");
  expect(guestsInput).toHaveAttribute("max", "10");
});
